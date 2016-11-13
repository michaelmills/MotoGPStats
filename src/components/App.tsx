import * as React from "react";
import Title from "./Title";

export class App extends React.Component<IAppProps, IAppState> {
    public render() {
        return (
            <section className="section">
                <div className="container">
                    <Title />
                </div>
            </section>
        );
    }
}

