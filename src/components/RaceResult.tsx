import * as React from "react";
import Ranking from "./rank/Ranking";
import ResultHeading from "./ResultHeading";
import {RiderModel} from "../model/RiderModel";
import RaceResultService from "../service/RaceResultService";

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

    componentWillReceiveProps(nextProps: any) {
        this.getRaceResults(nextProps.locationFilename);
    }

    private getRaceResults(filename: string) {
        if (filename) {
            let service = new RaceResultService();
            service.getResults(filename, (raceResult: RiderModel[]) => {
                this.setState({
                    riders: raceResult
                });
            });
        }
        else {
            this.setState({
                riders: []
            })
        }
    }

    private generateResultHeading() {
        return (
            <ResultHeading title={[this.props.year, this.props.location]}/>
        )
    }

    private generateRanking() {
        return (
            <Ranking/>
        )
    }

    public render() {
        return (
            <div>
                {this.generateResultHeading()}
                {this.generateRanking()}
            </div>
        );
    }
}