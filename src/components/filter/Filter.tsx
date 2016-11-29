import * as React from "react";
import FilterDropdown from "./FilterDropdown";

const years: Array<string> = ["2016", "2015", "2014"];
const divisions: Array<string> = ["MotoGP"];
const locations: Array<string> = ["Aragon", "Phillip Island", "Austin"];

export default class Filter extends React.Component<{}, {}> {

    public render() {

        return (
            <nav className="box">
                <p className="title is-4">Race Filter</p>
                <FilterDropdown label="Class" options={ divisions }/>
                <FilterDropdown label="Year" options={ years }/>
                <FilterDropdown label="Location" options={ locations }/>
            </nav>
        );
    }
}

