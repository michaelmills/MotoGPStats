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
            riders: []
        }
    }

    componentWillReceiveProps(nextProps: any) {
        this.props = nextProps;
        this.getRaceResults();
    }

    getRaceResults() {
        if (this.props.locationFilename !== undefined && this.props.locationFilename.length > 0) {
            let service = new RaceResultService();
            service.getResults(this.props.locationFilename, (raceResult: RiderModel[]) => {
                this.setState({
                    riders: raceResult
                });
            });
        }
        else {console.log("empty location")
            this.setState({
                riders: []
            })
        }
    }

    generateRaceResults(): any {
        return (
            <div>
                <ResultHeading title={[this.props.year, this.props.location]}/>
                <Ranking name="MotoGP" riders={this.state.riders}/>
            </div>
        );
    }

    public render() {
        return (
            <div>
                {this.generateRaceResults()}
            </div>
        );
    }
}