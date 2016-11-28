import * as React from "react";
import {FilterDropdownProps} from "./FilterDropdownInterface";

export default class FilterDropdown extends React.Component<FilterDropdownProps, {}> {
    generateOptions(): any {
        return this.props.options.map(function(option) {
            return <option key={option}>{ option }</option>
        })
    }

    public render() {
        return (
            <div className="filter-component">
                <label className="label">{ this.props.label }</label>
                <p className="control">
                    <span className="select is-fullwidth">
                        <select>
                            { this.generateOptions() }
                        </select>
                    </span>
                </p>
            </div>
        );
    }
}

