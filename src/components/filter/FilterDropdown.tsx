import * as React from "react";
import {FilterDropdownProps} from "./FilterDropdownInterface";

export default class FilterDropdown extends React.Component<FilterDropdownProps, {}> {
    constructor(props: any) {
        super(props);
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    generateOptions(): any {
        return this.props.options.map(function(option) {
            return <option key={option}>{ option }</option>
        })
    }

    onSelectionChange(event: any): void {
        let optionName: string = event.target.value;
        this.props.onChange(optionName);
    }

    public render() {
        return (
            <div className="filter-component">
                <label className="label">{ this.props.label }</label>
                <p className="control">
                    <span className="select is-fullwidth">
                        <select onChange={ this.onSelectionChange }>
                            { this.generateOptions() }
                        </select>
                    </span>
                </p>
            </div>
        );
    }
}

