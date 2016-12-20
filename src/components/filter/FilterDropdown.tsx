import * as React from "react";
import {FilterDropdownProps} from "./FilterDropdownInterface";

export default class FilterDropdown extends React.Component<FilterDropdownProps, {}> {
    constructor(props: any) {
        super(props);
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        this.generateOptions(nextProps.options);
    }

    componentDidMount() {
        this.generateOptions(this.props.options);
    }

    onSelectionChange(event: any): void {
        let optionName: string = event.target.value;
        this.props.onChange(optionName);
    }

    private generateOptions(options: string[]): any {
        if (options) {
            return options.map(function (option) {
                return <option key={option}>{option}</option>
            });
        }
    }

    public render() {
        return (
            <div className="filter-component">
                <label className="label">{this.props.label}</label>
                <p className="control">
                    <span className="select is-fullwidth">
                        <select onChange={this.onSelectionChange}>
                            {this.generateOptions(this.props.options)}
                        </select>
                    </span>
                </p>
            </div>
        );
    }
}

