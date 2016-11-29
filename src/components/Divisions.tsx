import * as React from "react";
import Ranking from "./rank/Ranking";

export default class Divisions extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <Ranking name="MotoGP"/>
                <Ranking name="Moto2"/>
                <Ranking name="Moto3"/>
            </div>
        )
    }
}