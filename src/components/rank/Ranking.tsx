import * as React from "react";
import { RankingProps } from "./RankingInterface";
import {RiderModel} from "../../model/RiderModel";
import { getRaceResults } from "../../actions/index";
import { connect } from "react-redux";

class Ranking extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    getFilename() {
        return (this.props.raceTracks.find(({ name } :any) => {
            return name === this.props.selectedLocation;
        }).filename);
    }

    componentDidUpdate() {
        this.props.getRaceResults(this.getFilename());
    }

    shouldComponentUpdate(nextProps: any) {
        let nextName = nextProps.riders[0] && nextProps.riders[0].name;
        let currentName = this.props.riders[0] && this.props.riders[0].name;
        return (nextProps.selectedLocation !== this.props.selectedLocation) ||
            (nextName !== currentName);
    }

    private generateHeading(): any {
        return (
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Team</th>
                </tr>
            </thead>
        )
    }

    private generateRankings(): any {
        let ranks = this.props.riders.map((rider: RiderModel) => {
            return (
                <tr key={ rider.Name }>
                    <td>{ rider.Position }</td>
                    <td>{ rider.Name }</td>
                    <td>{ rider.Time }</td>
                    <td>{ rider.Team }</td>
                </tr>
            )
        });

        return <tbody>{ranks}</tbody>;
    }

    public render() {
        let component: any;
        if (this.props.riders !== null && this.props.riders.length > 0) {
            component = (
                <table className="table">
                    {this.generateHeading()}
                    {this.generateRankings()}
                </table>
            );
        }
        else {
            component = (
                <p>...No Results</p>
            );
        }

        return (
            <div className="box">
                <p className="title is-4">{this.props.name}</p>
                {component}
            </div>
        );
    }
}

const mapStateToProps = (state :any) => {
    return {
        riders: state.riders,
        raceTracks: state.raceTracks,
        selectedLocation: state.selectedLocation
    }
};

export default connect(mapStateToProps, { getRaceResults })(Ranking);
