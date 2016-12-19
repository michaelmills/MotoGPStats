import * as React from "react";
import Ranking from "./rank/Ranking";

interface DivisionsProps {
    year?: string
}

export default class Divisions extends React.Component<DivisionsProps, any> {
    constructor(props: any) {
        super(props);
    }

    generateDivisions(): any {
        let divisions: any;
        if (this.props.year) {
            divisions =
                <div>
                    <Ranking name="MotoGP"/>
                    <Ranking name="Moto2"/>
                    <Ranking name="Moto3"/>
                </div>
        }
        return divisions;
    }

    public render() {
        return (
            <div>
                {this.generateDivisions()}
            </div>
        );
    }
}