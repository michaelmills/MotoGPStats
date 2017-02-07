import axios from "axios";
import {RiderModel, RiderModelBuilder} from "../model/RiderModel";

export const GET_LOCATIONS = "GET_LOCATIONS";
export const UPDATE_YEAR = "UPDATE_YEAR";
export const UPDATE_LOCATION = "UPDATE_LOCATION";
export const GET_RACE_RESULTS = "GET_RACE_RESULTS";

export function getLocations() {
    return (dispatch :any) => {
        axios.get("/api/races.json").then((resp) => {
            dispatch({ type: GET_LOCATIONS, payload: resp.data });
        });
    };
}

export function updateSelectedYear(year :number) {
    return {
        type: UPDATE_YEAR,
        payload: year
    }
}

export function updateSelectedLocation(location :string) {
    return {
        type: UPDATE_LOCATION,
        payload: location
    }
}

export function getRaceResults(path :string) {
    return (dispatch: any) => {
        axios.get(`/${path}`).then(resp => {
            const RaceRank = {
                position: "position",
                name: "driver_label",
                time: "time",
                team: "driver_carbike"
            };
            let standings = resp.data.standing;

            if (!standings) {
                dispatch({type: GET_RACE_RESULTS, payload: []});
                return;
            }

            let ranking = standings.map((details: any): RiderModel => {
                let detailPosition = Number(details[RaceRank.position]);
                let position = detailPosition === 0 ? "-" : detailPosition;

                let riderBuilder: RiderModelBuilder = new RiderModelBuilder();
                riderBuilder.Position = position;
                riderBuilder.Name = details[RaceRank.name];
                riderBuilder.Time = details[RaceRank.time];
                riderBuilder.Team = details[RaceRank.team];

                return riderBuilder.build();
            });
            dispatch({type: GET_RACE_RESULTS, payload: ranking});
        });
    }
}