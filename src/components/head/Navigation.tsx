import * as React from "react";

export default class Navigation extends React.Component<{}, {}> {
    public render() {
        return (
            <nav className="nav">
                <div className="nav-left">
                    <a className="nav-item is-brand" href="#">
                        MotoGP Stats
                    </a>
                </div>

                <span className="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>

                <div className="nav-right nav-menu">
                    <a className="nav-item" href="#">
                        Stream
                    </a>
                    <a className="nav-item" href="#">
                        Results
                    </a>
                </div>
            </nav>
        );
    }
}

