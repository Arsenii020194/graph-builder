import * as React from "react";
import Graph from "../src/components/Graph";
import ExpressionBar from "./components/ExpressionBar";
import { createStore } from "redux";
import reducer from "./reducers/App";
import Button from "./components/Button";

export default class App extends React.Component {
  constructor(props) {
    const store = createStore(reducer);
    super(props);
    this.state = {
      colors: []
    };
  }

  render = () => {
    return (
        <div className="app">
          <Button></Button>
          <div>
            <ExpressionBar/>
          </div>
          <div>
            <Graph/>
          </div>
        </div>
    );
  }
}
