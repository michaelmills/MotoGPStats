import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import reducers from "./reducers";
import "bulma/bulma.sass";
import ReduxThunk from 'redux-thunk';

import App from "./components/App";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.getElementById("app")
);
