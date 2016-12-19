import * as React from "react";
import FilterDropdown from "./FilterDropdown";

interface FilterProps {
    locations?: string[];
    dropDowns?: any;
}

export default class Filter extends React.Component<FilterProps, {}> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        let filterComponents = this.props.dropDowns.map((element:any): any => {
            return <FilterDropdown key={element.label} {...element}/>
        });

        return (
            <nav className="box">
                <p className="title is-4">Race Filter</p>
                { filterComponents }
            </nav>
        );
    }
}

