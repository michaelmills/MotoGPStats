import * as React from "react";
import FilterDropdown from "./FilterDropdown";

export default class Filter extends React.Component<{}, {}> {
    public render() {
        let years: Array<string> = ["2016", "2015", "2014"];
        let divisions: Array<string> = ["MotoGP", "Moto2", "Moto3"];
        let locations: Array<string> = ["Aragon", "Phillip Island", "Austin"];

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

