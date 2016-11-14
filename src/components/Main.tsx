import * as React from "react";
import Filter from "./Filter";
import Classes from "./Classes";

export default class Main extends React.Component<{}, {}> {
    public render() {
        return (
            <section className="container home-content">
                <div className="columns">
                    <Filter/>
                    <Classes/>
                </div>
            </section>
        );
    }
}

