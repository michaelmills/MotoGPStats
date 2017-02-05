// Defines the interface of the properties of the App component
import {RiderModel} from "../../model/RiderModel";

export interface RankingProps {
    name: string,
    riders?: Array<RiderModel>,
    generateRankings?: () => any,
    getRaceResults?: (filename: string) => any
}

// Defines the interface of the state of the App component
export interface RankingState {
}