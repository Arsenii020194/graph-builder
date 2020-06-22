import * as React from "react";
import * as css from "../css/settings.module.css";

export default class SettingsBar extends React.Component {

  onVarNameInput(event) {
    this.setState({...this.state, varName: event.data})
  }

  onFromRangeInput(event) {
    this.setState({...this.state, from: event.target.value})
  }

  onToRangeInput(event) {
    this.setState({...this.state, to: event.target.value})
  }

  constructor(props) {
    super(props);
    const {str, strToApi} = this.props
    this.state = {str: str, strToApi: strToApi}
  }

  returnState() {
    let combinedState = {
      from: this.state.from, to: this.state.to,
      str: this.props.str, strToApi: this.props.strToApi,
      var: 'x'
    }
    this.props.onClickSend(combinedState)
  }

  render() {
    return (
        <div className={css.settings_bar}>
          <label>range from:</label>
          <input onChange={this.onFromRangeInput.bind(this)} type={"number"}/>
          <label>range to:</label>
          <input onChange={this.onToRangeInput.bind(this)} type="number"/>
          <label>variable name:</label>
          <input disabled={true} onChange={this.onVarNameInput.bind(this)}
                 type="text"
                 maxLength={1} value={this.props.var}/>
          <button onClick={this.returnState.bind(this)}>BUILD
          </button>
        </div>)
  }

}
