import * as React from "react";
import Filter from "../filter/Filter";
import Divisions from "../Divisions";

export default class Main extends React.Component<{}, {}> {
    public render() {

        return (
            <section className="container home-content">
                <div className="columns">
                    <div className="column is-one-quarter">
                        <Filter/>
                    </div>
                    <div className="column">
                        <Divisions/>
                    </div>
                </div>
            </section>
        );
    }
}

