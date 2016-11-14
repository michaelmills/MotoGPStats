import * as React from "react";
import "../styles/home.sass";
import Head from "./Head";
import Main from "./Main";
import Footer from "./Footer";


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

