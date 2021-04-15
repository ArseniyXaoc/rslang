import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./redux/reducer";
import App from "./components/App/App";
import "./assets/stylesheets/index.scss";

const store = createStore(reducer);

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
    //  </React.StrictMode>,

    document.getElementById("root"),
);
