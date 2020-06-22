import * as React from "react";
import Graph from "../src/components/Graph";
import ExpressionBar from "./components/ExpressionBar";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  onClickSend = (state) => {
    let params = {
      from: state.from,
      to: state.to,
      expression: state.strToApi,
      scale: 1,
      varName: state.var
    }
    let paramsStr = ''
    for (let key in params){
      paramsStr += key+'='+params[key] + '&'
    }
    fetch("http://localhost:8080/v1/graph-data?")
    .then(res => this.setState({...this.state, data: res}))
  }

  render = () => {
    return (
        <div className="app">
          <div>
            <ExpressionBar onClickSend={this.onClickSend.bind(this)}/>
          </div>
          <div>
            <Graph data={this.state.data}/>
          </div>
        </div>
    );
  }
}
