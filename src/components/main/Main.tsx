import * as React from "react";
import Filter from "../filter/Filter";
import Divisions from "../Divisions";

interface MainState {
    filterYear?: string;
    location?: string;
}
export default class Main extends React.Component<{}, MainState> {
    constructor(props: any) {
        super(props);
        this.onYearChange = this.onYearChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    onYearChange(filterOption: string) {
        this.setState({
            filterYear: filterOption
        })
    }

    onLocationChange(name: string) {
        this.setState({
            location: name
        })
    }

    public render() {
        return (
            <section className="container home-content">
                <div className="columns">
                    <div className="column is-one-quarter">
                        <Filter
                            onYearChange={this.onYearChange}
                            onLocationChange={this.onLocationChange}
                        />
                    </div>
                    <div className="column">
                        <Divisions/>
                    </div>
                </div>
            </section>
        );
    }
}

