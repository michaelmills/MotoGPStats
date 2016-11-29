import * as React from "react";
import { RankingProps } from "./RankingInterface.ts";
import {RiderModel, RiderModelBuilder} from "../../model/RiderModel";
import JSONUtil from "../../service/utility/JSONUtil";

const RaceRank = {
    position: "position",
    name: "driver_label",
    time: "time",
    team: "driver_carbike"
};

export default class Ranking extends React.Component<RankingProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {riders: [] };
    }

    componentDidMount() {
        this.setRankings();
    }

    private setRankings() {
        JSONUtil.get('api/2016/45510/45510.json', (xhr: XMLHttpRequest) => {
            let jsonResponse = JSON.parse(xhr.responseText);
            let standings = jsonResponse.standing;

            let ranking = standings.map((details: any): RiderModel => {
                let detailPosition = Number(details[RaceRank.position]);
                let position = detailPosition === 0 ? "-" : detailPosition;

                let riderBuilder: RiderModelBuilder = new RiderModelBuilder();
                riderBuilder.Position = position;
                riderBuilder.Name = details[RaceRank.name];
                riderBuilder.Time = details[RaceRank.time];
                riderBuilder.Team = details[RaceRank.team];

                return riderBuilder.build();
            });

            this.setState({ riders: ranking });
        });
    }

    private generateRankings(): any {
        let ranks = this.state.riders.map((rider: RiderModel) => {
            return (
                <tr key={ rider.Name }>
                    <td>{ rider.Position }</td>
                    <td>{ rider.Name }</td>
                    <td>{ rider.Time }</td>
                    <td>{ rider.Team }</td>
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

