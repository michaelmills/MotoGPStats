import * as React from "react";
import Ranking from "./rank/Ranking";

interface ResultHeadingProps {
    title: string[];
}

export default class ResultHeading extends React.Component<ResultHeadingProps, any> {
    constructor(props: any) {
        super(props);
    }

    shouldComponentUpdate(nextProps: any,) {
        if (nextProps.title.toString() !== this.props.title.toString()) {
            return true;
        }
        return false;
    }

    private generateTitle(word: string[]): string {
        return word.join(" ");
    }

    public render() {
        return (
            <div className="box">
                <h1 className="title is-3">{this.generateTitle(this.props.title)}</h1>
            </div>
        );
    }
}