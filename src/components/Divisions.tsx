import * as React from "react";
import Ranking from "./rank/Ranking";

export default class Divisions extends React.Component<any, any> {
    public render() {
        let riders: Array<string> = ["michael", "justin", "rossi", "marquez"];

        return (
            <div>
                <Ranking name="MotoGP" rider={riders}/>
                <Ranking name="Moto2" rider={riders}/>
                <Ranking name="Moto3" rider={riders}/>
            </div>
        )
    }
}