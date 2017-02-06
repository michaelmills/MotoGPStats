import * as React from "react";
import Ranking from "./rank/Ranking";
import { connect } from "react-redux";

interface ResultHeadingProps {
    title: string[];
    selectedLocation: any,
    selectedYear: any
}

class ResultHeading extends React.Component<ResultHeadingProps, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <div className="box">
                <h1 className="title is-3">
                    {this.props.selectedYear} {this.props.selectedLocation}
                </h1>
            </div>
        );
    }
}

const mapStateToProps = (state :any) => {
    return {
        selectedLocation: state.selectedLocation,
        selectedYear: state.selectedYear
    }
};


export default connect(mapStateToProps, null)(ResultHeading);