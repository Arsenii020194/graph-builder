import * as React from "react";
import * as css from "../css/settings.module.css";

export default class SettingsBar extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
        <div className={css.settings_bar}>
          <label>range from:</label>
          <input type={"number"}/>
          <label>range to:</label>
          <input type="number"/>
          <label>variable name:</label>
          <input type="text" maxLength={1}/>
          <button onClick={this.props.onClickSend}>BUILD</button>
        </div>)
  }

}
