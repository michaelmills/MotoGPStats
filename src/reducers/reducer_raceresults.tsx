import { GET_RACE_RESULTS } from "../actions/index";
import { Action } from "../interfaces";

export function RaceResultsReducer(state :Array<any> = [], action :Action) {
    switch (action.type) {
        case GET_RACE_RESULTS: {
            return action.payload;
        }
        default:
            return state;
    }
}