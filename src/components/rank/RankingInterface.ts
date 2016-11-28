// Defines the interface of the properties of the App component
export interface RankingProps {
    name: string,
    rider?: Array<string>,
    generateRankings?: () => any;
}

// Defines the interface of the state of the App component
export interface RankingState {
}