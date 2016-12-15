import * as React from "react";
import FilterDropdown from "./FilterDropdown";

const years: Array<string> = ["2016", "2015", "2014"];
const divisions: Array<string> = ["MotoGP"];
const locations: Array<string> = ["Aragon", "Phillip Island", "Austin"];

interface FilterProps {
    onYearChange?(s: string): void;
    onLocationChange(s: string): void;
}

export default class Filter extends React.Component<FilterProps, {}> {
    constructor(props: any) {
        super(props);
        this.onYearChange = this.onYearChange.bind(this);
        this.onLocationChange = this.onLocationChange.bind(this);
    }

    onYearChange(optionName: string): void {
        this.props.onYearChange(optionName);
    }

    onLocationChange(name: string): void {
        this.props.onLocationChange(name);
    }

    public render() {
        return (
            <nav className="box">
                <p className="title is-4">Race Filter</p>
                <FilterDropdown label="Class" options={ divisions } onChange={this.onYearChange}/>
                <FilterDropdown label="Year" options={ years } onChange={this.onYearChange}/>
                <FilterDropdown label="Location" options={ locations } onChange={this.onLocationChange}/>
            </nav>
        );
    }
}

