import { combineReducers } from 'redux';
import { LocationReducer, SelectedLocationReducer, RaceTracksReducer} from './reducer_locations';
import { SelectedYearReducer } from "./reducer_filter";
import { RaceResultsReducer } from "./reducer_raceresults";

const rootReducer = combineReducers({
    raceTracks: RaceTracksReducer,
    locationOptions: LocationReducer,
    selectedLocation: SelectedLocationReducer,
    selectedYear: SelectedYearReducer,
    riders: RaceResultsReducer
});


export default rootReducer;