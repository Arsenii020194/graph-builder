import * as React from "react";
import * as css from "../css/settings.module.css";

export default class SettingsBar extends React.Component {

  onVarNameInput(event) {
    this.setState({...this.state, varName: event.data})
  }

  onFromRangeInput(event) {
    this.setState({...this.state, from: event.data})
  }

  onToRangeInput(event) {
    this.setState({...this.state, to: event.data})
  }

  constructor(props) {
    super(props);
    const {str, strToApi} = this.props
    this.state = {str: str, strToApi: strToApi}
  }

  returnState() {
    let combinedState = {...this.state}
    this.props.onClickSend(combinedState)
  }

  render() {
    return (
        <div className={css.settings_bar}>
          <label>range from:</label>
          <input onInput={this.onFromRangeInput.bind(this)} type={"number"}/>
          <label>range to:</label>
          <input onInput={this.onToRangeInput.bind(this)} type="number"/>
          <label>variable name:</label>
          <input onInput={this.onVarNameInput.bind(this)} type="text"
                 maxLength={1} value={this.props.var}/>
          <button onClick={this.returnState.bind(this)}>BUILD
          </button>
        </div>)
  }

}
