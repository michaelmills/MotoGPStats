import {RiderModel, RiderModelBuilder} from "../model/RiderModel";
import JSONUtil from "./utility/JSONUtil";

const RaceRank = {
    position: "position",
    name: "driver_label",
    time: "time",
    team: "driver_carbike"
};

export default class RaceResultService {

    public getResults(filename: string, onSuccess: Function) {
        if (filename )
        JSONUtil.get(filename, (xhr: XMLHttpRequest) => {
            let jsonResponse = JSON.parse(xhr.responseText);
            let standings = jsonResponse.standing;

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

            onSuccess(ranking);
        },
            () => { console.log("WTF")});
    }
}