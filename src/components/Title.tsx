import * as React from "react";

export default class Title extends React.Component<ITitleProps, ITitleState> {
    public render() {
        return (
            <section className="hero is-light">
                <div className="hero-body">
                    <h1 className="title">
                        MotoGP Stats
                    </h1>
                </div>
            </section>
        )
    }
}