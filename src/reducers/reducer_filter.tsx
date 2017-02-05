import { Action } from "../interfaces";
import { UPDATE_YEAR } from "../actions/index";

export function SelectedYearReducer(state :number = 2016, action :Action) {
    switch (action.type) {
        case UPDATE_YEAR:
            return action.payload;
        default:
            return state;
    }
}