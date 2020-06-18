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
  str = ''
  strToApi = ''
  prevSymbol = ''
  prevDigit = ''
  isPov = false

  constructor(props) {
    super(props);
  }

  onBeforeInput(event) {
    let symbol = event.data
    let validator = ValidatorFactory.getValidator(symbol)
    if (!validator) {
      event.preventDefault()
      return
    }
    debugger
    let validationResult = validator.isValid(
        this.prevSymbol, this.prevDigit, this.str)
    if (!validationResult) {
      event.preventDefault()
    } else {
      this.prevSymbol = symbol

      if (DIGITS.includes(symbol) || symbol === DOT) {
        this.prevDigit += symbol
        this.strToApi += symbol
      } else if (symbol === POW) {
        this.strToApi = this.strToApi.slice(0, this.strToApi.length - this.prevDigit.length)
        this.strToApi += 'Math.pow(' + this.prevDigit + ','
        this.prevDigit = ''
        this.isPov = true
      } else if (SIGNS.includes(symbol) || symbol === CLOSING_BRACKET || symbol
          === OPENING_BRACKET) {
        if (this.isPov) {
          this.strToApi += ')'
          this.strToApi += symbol
          this.isPov = false
        } else {
          this.strToApi += symbol
        }
        this.prevDigit = ''
      } else {
        this.strToApi += symbol
      }
      this.str += symbol
    }
  }

  onKeyUp(event) {
    if (event && event.keyCode === 8) {
      if (this.prevSymbol) {
        this.prevSymbol = this.prevDigit.charAt(this.prevDigit.length - 2)
      }
      if (this.prevDigit) {
        this.prevDigit = this.prevDigit.slice(0, this.prevDigit.length - 2)
      }
    }
  }

  onKeyDown(event) {
    if (event && event.keyCode === 37 || event.keyCode === 39) {
      event.preventDefault()
    }
  }

  onClickSend() {
    if (DIGITS.includes(this.prevSymbol) && this.isPov) {
      this.strToApi += ')'
    }
    console.log(this.strToApi)
  }

  render() {
    return (
        <div>
          <input type="text"
                 className={css.calculator__display + ' ' + cssParent.fit_parent_div}
                 onKeyUp={this.onKeyUp.bind(this)}
                 onKeyDown={this.onKeyDown.bind(this)}
                 onBeforeInput={this.onBeforeInput.bind(this)}/>
          <SettingsBar onClickSend={this.onClickSend.bind(this)}/>
        </div>
    )
  }
}
