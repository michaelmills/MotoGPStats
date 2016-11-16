import * as React from "react";
import Filter from "./Filter";
import Division from "./Division";

export default class Main extends React.Component<{}, {}> {
    public render() {
        return (
            <section className="container home-content">
                <div className="columns">
                    <div className="column is-one-quarter">
                        <Filter/>
                    </div>
                    <div className="column">
                        <Division name="MotoGP"/>
                        <Division name="Moto2"/>
                        <Division name="Moto3"/>
                    </div>
                </div>
            </section>
        );
    }
}

