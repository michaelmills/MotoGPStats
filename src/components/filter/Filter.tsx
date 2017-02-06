import * as React from "react";
import FilterDropdown from "./FilterDropdown";
import { connect } from "react-redux";
import { updateSelectedYear, updateSelectedLocation } from "../../actions/index";

interface FilterProps {
    locationOptions? :any,
    updateSelectedYear? :any,
    updateSelectedLocation? :any
}

const yearOptions :Array<string> = ["2016", "2015", "2014"];

class Filter extends React.Component<any, {}> {

    constructor(props: any) {
        super(props);
    }

    onYearChange(filterOption: any) {
        this.props.updateSelectedYear(filterOption);
    }

    onLocationChange(name: any) {
        this.props.updateSelectedLocation(name);
    }

    public render() {
        const dropDowns = [
            {
                label: "Year",
                options: yearOptions,
                onChange: this.onYearChange.bind(this)
            },
            {
                label: "Location",
                options: this.props.locationOptions,
                onChange: this.onLocationChange.bind(this)
            }
        ];

        let filterComponents = dropDowns.map((element: any): any => {
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

function mapStateToProps(state :any) {
    return {
        locationOptions: state.locationOptions
    }
}

export default connect(mapStateToProps, { updateSelectedYear, updateSelectedLocation })(Filter);