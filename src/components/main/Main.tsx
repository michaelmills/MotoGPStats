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

        this.onYearChange = this.onYearChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);

        this.state = {
            selectedYear: yearOptions[0],
            selectedLocation: null,
            locationOptions: null,
        };
    }

    componentDidMount() {
        this.props.getLocations();
    }

    onYearChange(filterOption: string) {
        this.setState({
            selectedYear: filterOption
        })
    }

    onLocationChange(name: string) {
        this.setState({
            selectedLocation: name
        });
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

    private generateFilter(): any {
        let filterProps = {
            dropDowns: [
                {
                    label: "Year",
                    options: yearOptions,
                    onChange: this.onYearChange
                },
                {
                    label: "Location",
                    options: this.props.locationOptions,
                    onChange: this.onLocationChange
                }
            ]
        };

        return (
            <Filter {...filterProps}/>
        );
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
                        {this.generateFilter()}
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