import * as React from "react";
import Navigation from "./Navigation";

export default class Head extends React.Component<{}, {}> {
    public render() {
        return (
            <section className="hero is-info">
                <div className="hero-body"></div>
                <Navigation/>
            </section>
        );
    }
}

