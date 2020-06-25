import * as React from "react";
import * as css from "../css/settings.module.css";
import ExpressionBar from "./ExpressionBar";

export default class SettingsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      expression: '',
      varName: 'x',
      step: 0
    }
  }

  onVarNameInput = (event) => {
    this.setState({...this.state, varName: event.target.value})
  }

  onFromRangeInput = (event) => {
    this.setState({...this.state, from: event.target.value})
  }

  onToRangeInput = (event) => {
    this.setState({...this.state, to: event.target.value})
  }

  onStepInput = (event) => {
    this.setState({...this.state, step: event.target.value})
  }

  returnState = () => {
    this.props.onClickSend({...this.state})
  }

  setExpression = (expression) => {
    this.setState({...this.state, expression: expression})
  }

  render() {
    return (
        <div className={css.settings_bar}>
          <ExpressionBar {...this.state} setExpression={this.setExpression}/>
          <label>from:</label>
          <input onChange={this.onFromRangeInput} type={"number"}/>
          <label>to:</label>
          <input onChange={this.onToRangeInput} type="number"/>
          <label>step:</label>
          <input onChange={this.onStepInput} value={this.state.step}
                 type="number"/>
          <label>variable name:</label>
          <input onChange={this.onVarNameInput}
                 type="text"
                 maxLength={1} value={this.state.varName}/>
          <button onClick={this.returnState}>BUILD
          </button>
        </div>)
  }

}
