import * as React from "react";
import Filter from "../filter/Filter";
import RaceResult from "../RaceResult";
import RaceLocationService from "../../service/RaceLocationService";

const yearOptions: Array<string> = ["2016", "2015", "2014"];

interface MainState {
    year?: string;
    location?: string;
    locationOptions?: string[];
    locationFilename?: string;
}

export default class Main extends React.Component<{}, MainState> {
    private raceTracks: any;

    constructor(props: any) {
        super(props);

        this.onYearChange = this.onYearChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);

        this.getLocations();

        this.state = {
            year: yearOptions[0],
            locationOptions: []
        };
    }

    componentDidMount() {
        this.getLocations();
    }

    getLocations() {
        let service = new RaceLocationService();
        service.getLocations((raceTrack: any) => {
            this.raceTracks = raceTrack;

            let locationNames = this.raceTracks.map((details: any) => {
                return details.name;
            });

            this.setState({
                location: locationNames[0],
                locationOptions: locationNames,
                locationFilename: this.getFilename(locationNames[0])
            });
        });
    }

    getFilename(locationName: string): string {
        let filename = "";
        if (this.raceTracks !== undefined) {
            filename = this.raceTracks.find((element: any) => {
                return element.name == locationName;
            }).filename;
        }
        return filename;
    }

    onYearChange(filterOption: string) {
        this.setState({
            year: filterOption
        })
    }

    onLocationChange(name: string) {
        let filename = this.getFilename(name);
        this.setState({
            location: name,
            locationFilename: filename
        })
    }

    generateFilter(): any {
        let filterProps = {
            dropDowns: [
                {
                    label: "Year",
                    options: yearOptions,
                    onChange: this.onYearChange
                },
                {
                    label: "Location",
                    options: this.state.locationOptions,
                    onChange: this.onLocationChange
                }
            ]
        };

        return (
            <Filter {...filterProps}/>
        );
    }

    generateRaceResult(): any {
        let resultProps = {
            year: this.state.year,
            location: this.state.location,
            locationFilename: this.state.locationFilename
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

