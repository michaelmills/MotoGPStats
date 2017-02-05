export interface MainState {
    selectedYear?: string;
    selectedLocation?: string;
    locationOptions?: string[];
}

export interface Action {
    readonly type: string;
    readonly payload?: any;
}

