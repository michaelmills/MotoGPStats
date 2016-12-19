import {RiderModel, RiderModelBuilder} from "../model/RiderModel";
import JSONUtil from "./utility/JSONUtil";

export default class RaceLocationService {

    public getLocations(onSuccess: Function) {
        JSONUtil.get('api/races.json', (xhr: XMLHttpRequest) => {
            let jsonResponse = JSON.parse(xhr.responseText);

            onSuccess(jsonResponse.race_track);
        });
    }
}