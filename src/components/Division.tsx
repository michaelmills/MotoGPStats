import * as React from "react";

export default class Division extends React.Component<IDivisionProps, {}> {
    public render() {
        return (
            <div className="box">
                <h1>{this.props.name}</h1>
                <p>
                    <br />
                    <br />
                    <br />
                    <br />
                </p>
            </div>
        );
    }
}

