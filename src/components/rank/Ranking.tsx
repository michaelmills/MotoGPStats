import * as React from "react";
import { RankingProps } from "./RankingInterface.ts";

export default class Ranking extends React.Component<RankingProps, any> {
    generateRankings(): any {
        let ranks = this.props.rider.map(function(rider, index) {
            let position = index + 1;

            return (
                <tr key={ rider }>
                    <td>{ position }</td>
                    <td>{ rider }</td>
                    <td></td>
                    <td></td>
                </tr>
            )
        });

        return <tbody>{ ranks }</tbody>;
    }

    public render() {
        return (
            <div className="box">
                <p className="title is-4">{ this.props.name }</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Team</th>
                        </tr>
                    </thead>
                    { this.generateRankings() }
                </table>
            </div>
        );
    }
}

