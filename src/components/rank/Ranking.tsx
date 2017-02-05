import * as React from "react";
import { RankingProps } from "./RankingInterface";
import {RiderModel} from "../../model/RiderModel";
import { getRaceResults } from "../../actions/index";
import { connect } from "react-redux";

class Ranking extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.getRaceResults("api/2016/45510/45510.json");
    }

    shouldComponentUpdate(nextProps: any) {
        if ((nextProps.name !== this.props.name)
            || nextProps.riders !== null) {
            return true;
        }
        return false;
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
        console.log('riders', this.props.riders);
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
        riders: state.riders
    }
};

export default connect(mapStateToProps, { getRaceResults })(Ranking);
