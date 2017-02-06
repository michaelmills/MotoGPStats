import * as React from "react";
import Filter from "../filter/Filter";
import RaceResult from "../RaceResult";
import RaceLocationService from "../../service/RaceLocationService";
import RaceResultService from "../../service/RaceResultService";
import {RiderModel} from "../../model/RiderModel";
import { connect } from "react-redux";
import { getLocations } from "../../actions/index";
import { MainState } from "../../interfaces";

const yearOptions: Array<string> = ["2016", "2015", "2014"];

class Main extends React.Component<any, MainState> {
    private raceTracks: any;

    constructor(props: any) {
        super(props);

        this.state = {
            selectedYear: yearOptions[0],
            selectedLocation: null,
            locationOptions: null,
        };
    }

    componentDidMount() {
        this.props.getLocations();
    }

    private getFilename(locationName: string): string {
        let filename = "";
        if (this.raceTracks !== undefined) {
            filename = this.raceTracks.find((element: any) => {
                return element.name == locationName;
            }).filename;
        }
        return filename;
    }

    private generateRaceResult(): any {
        let resultProps = {
            year: this.state.selectedYear,
            location: this.state.selectedLocation,
            locationFilename: this.getFilename(this.state.selectedLocation)
        };
        return (
            <RaceResult {...resultProps}/>
        );
    }

    public render() {

        return (
            <section className="container home-content">
                <div className="columns">
                    <div className="column is-one-quarter">
                        <Filter/>
                    </div>
                    <div className="column">
                        {this.generateRaceResult()}
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state :any) => {
    return {
        locationOptions: state.locationOptions
    }
};

export default connect(mapStateToProps, { getLocations })(Main);