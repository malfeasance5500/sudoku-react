import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, composeWithDevTools(applyMiddleware()));

ReactDOM.render(
  <Provider store={store}>
  {console.log(store)}
    <App />
  </Provider>,
  document.getElementById("root")
);
