import * as React from "react";
import "../styles/home.sass";
import Head from "./head/Head";
import Main from "./main/Main";
import Footer from "./footer/Footer";


export default class App extends React.Component<IAppProps, IAppState> {
    public render() {
        return (
            <div>
                <Head/>
                <Main/>
                <Footer/>
            </div>
        );
    }
}

