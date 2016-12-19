import * as React from "react";
import { RankingProps } from "./RankingInterface";
import {RiderModel} from "../../model/RiderModel";

export default class Ranking extends React.Component<RankingProps, any> {
    constructor(props: any) {
        super(props);
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
        let ranks: any;
        if (this.props.riders) {
            ranks = this.props.riders.map((rider: RiderModel) => {
                return (
                    <tr key={ rider.Name }>
                        <td>{ rider.Position }</td>
                        <td>{ rider.Name }</td>
                        <td>{ rider.Time }</td>
                        <td>{ rider.Team }</td>
                    </tr>
                )
            });
        }

        return <tbody>{ ranks }</tbody>;
    }

    public render() {
        return (
            <div className="box">
                <p className="title is-4">{this.props.name}</p>
                <table className="table">
                    {this.generateHeading()}
                    {this.generateRankings()}
                </table>
            </div>
        );
    }
}

