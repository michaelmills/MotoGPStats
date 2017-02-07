import * as React from "react";
import Ranking from "./rank/Ranking";
import ResultHeading from "./ResultHeading";
import {RiderModel} from "../model/RiderModel";

interface RaceResultProps {
    year?: string
    location?: string;
    locationFilename?: string;
}

interface RaceResultState {
    riders?: RiderModel[];
}

export default class RaceResult extends React.Component<RaceResultProps, RaceResultState> {
    constructor(props: any) {
        super(props);
        this.state = {
            riders: null
        }
    }

    public render() {
        return (
            <div>
                <ResultHeading/>
                <Ranking/>
            </div>
        );
    }
}