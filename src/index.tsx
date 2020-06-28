import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import './styles/index.scss'
// add font awsome 
import { fas } from "@fortawesome/free-solid-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
library.add(fas);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
