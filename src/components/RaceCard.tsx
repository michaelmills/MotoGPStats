import * as React from "react";

export interface RaceProps { raceName: string; location: string }

export class RaceCard extends React.Component<RaceProps, {}> {
    render() {
        return (
            <div className="container">
                <h1>HELLO</h1>
            </div>
        )
    }
}