import * as React from "react";
import * as css from "../css/expressionbar.module.css";
import * as cssParent from "../css/parent.module.css";
import ValidatorFactory from "../validators/ValidatorFactory";
import {
  CLOSING_BRACKET,
  DIGITS,
  DOT,
  OPENING_BRACKET,
  POW,
  SIGNS
} from "../constants/Consts";
import SettingsBar from "./SettingsBar";

export default class ExpressionBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      str: '',
      strToApi: '',
      prevSymbol: '',
      prevDigit: '',
      isPov: false,
      var: 'x'
    }
  }

  onVarChange(variable) {
    this.setState({
      ...this.state,
      var: variable
    })
  }

  onBeforeInput(event) {
    let {
      str,
      strToApi,
      prevSymbol,
      prevDigit,
      isPov
    } = this.state

    let symbol = event.data
    let validator = ValidatorFactory.getValidator(symbol)

    if (!validator) {
      event.preventDefault()
      return
    }

    let validationResult = validator.isValid(
        prevSymbol, prevDigit, str)
    if (!validationResult) {
      event.preventDefault()
    } else {
      prevSymbol = symbol
      if (DIGITS.includes(symbol) || symbol === DOT) {
        strToApi = strToApi + symbol
        prevDigit = prevDigit + symbol
      } else if (symbol === POW) {
        let strToApiSliced = strToApi.slice(0,
            strToApi.length - this.state.prevDigit.length)
        strToApi = strToApiSliced + 'Math.pow(' + prevDigit + ','
        prevDigit = ''
        isPov = true
      } else if (SIGNS.includes(symbol) || symbol === CLOSING_BRACKET || symbol
          === OPENING_BRACKET) {
        if (this.isPov) {
          strToApi = strToApi + ')' + symbol
          isPov = false
        } else {
          strToApi = strToApi + symbol
          prevDigit = ''
        }
      } else {
        strToApi = strToApi + symbol
      }
      str = str + symbol
    }

    this.setState({
      str: str,
      strToApi: strToApi,
      prevSymbol: prevSymbol,
      prevDigit: prevDigit,
      isPov: isPov
    })
  }

  onKeyUp(event) {
    if (event && event.keyCode === 8) {
      let {
        prevSymbol,
        prevDigit
      } = this.state
      if (prevSymbol) {
        prevSymbol = prevDigit.charAt(prevDigit.length - 2)
      }
      if (prevDigit) {
        prevDigit = prevDigit.charAt(prevDigit.length - 2)
      }
      this.setState({
        prevSymbol: prevSymbol,
        prevDigit: prevDigit
      })
    }
  }

  onKeyDown(event) {
    if (event && event.keyCode === 37 || event.keyCode === 39) {
      event.preventDefault()
    }
  }

  render() {
    return (
        <div>
          <input type="text"
                 className={css.calculator__display + ' '
                 + cssParent.fit_parent_div}
                 onKeyUp={this.onKeyUp.bind(this)}
                 onKeyDown={this.onKeyDown.bind(this)}
                 onBeforeInput={this.onBeforeInput.bind(this)}/>
          <SettingsBar {...this.state}
                       onVarChange={this.onVarChange.bind(this)}
                       onClickSend={this.props.onClickSend}/>
        </div>
    )
  }
}
