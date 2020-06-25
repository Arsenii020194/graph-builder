import * as React from "react";
import Graph from "../src/components/Graph";
import SettingsBar from "./components/SettingsBar";
import ReactNotifications from 'react-notifications-component';
import { store } from 'react-notifications-component';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  onClickSend = (state) => {
    this.setState({...this.state, data:[]})
    let params = {...state}
    for (let key in params) {
      if (params.hasOwnProperty(key) && !params[key]) {
        store.addNotification({
          title: 'Error',
          message: "all settings must be set!",
          type: 'default',                         // 'default', 'success', 'info', 'warning'
          container: 'bottom-left',                // where to position the notifications
          animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
          animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
          dismiss: {
            duration: 2000
          }
        })
        return
      }
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    };
    fetch("http://localhost:8080/v1/graph-data",requestOptions)
    .then(res => res.json())
    .then(
        (result) => {
          if (result.error){
            store.addNotification({
              title: 'Error',
              message: result.error,
              type: 'default',                         // 'default', 'success', 'info', 'warning'
              container: 'bottom-left',                // where to position the notifications
              animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
              dismiss: {
                duration: 2000
              }
            })
          } else {
            this.setState({...this.state, data: result})
          }
        }
    )
  }

  render = () => {
    return (
        <div className="app">
          <ReactNotifications />
          <div>
            <SettingsBar onClickSend={this.onClickSend}/>
          </div>
          <div>
            <Graph data={this.state.data}/>
          </div>
        </div>
    );
  }
}
