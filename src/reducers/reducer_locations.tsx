import { GET_LOCATIONS } from "../actions/index";
import { Action } from "../interfaces";

export function LocationReducer(state :Array<any> = [], action :Action) {
    switch (action.type) {
        case GET_LOCATIONS: {
            let locationNames = action.payload.race_track.map((details: any) => {
                return details.name;
            });
            return locationNames;
        }
        default:
            return state;
    }
}

export function SelectedLocationReducer(state :Array<any> = [], action :Action) {
    switch (action.type) {
        case GET_LOCATIONS: {
            let locationNames = action.payload.race_track.map((details: any) => {
                return details.name;
            });
            return locationNames[0];
        }
        default:
            return state;
    }
}

export function RaceTracksReducer(state :Array<any> = [], action :Action) {
    switch (action.type) {
        case GET_LOCATIONS: {
            return action.payload.race_track;
        }
        default:
            return state;
    }
}