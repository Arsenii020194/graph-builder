import * as React from "react";
import * as css from "../css/expressionbar.module.css";
import * as cssParent from "../css/parent.module.css";
import {
  CLOSING_BRACKET,
  DIGITS,
  DOT,
  OPENING_BRACKET,
  SIGNS
} from "../constants/Consts";

export default class ExpressionBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      prevSymbol: '',
      prevDigit: '',
      focused: false
    }
  }

  onBeforeInput = (event) => {
    let {
      prevSymbol,
      prevDigit
    } = this.state

    let symbol = event.data
    let validationResult;
    if (DIGITS.includes(symbol)) {
      validationResult = this.validateDigit(prevSymbol)
      prevDigit += symbol
    }
    if (DOT === symbol) {
      validationResult = this.validateDot(prevSymbol)
      prevDigit += symbol
    }
    if (SIGNS.includes(symbol)) {
      validationResult = this.validateSign(prevSymbol)
      prevDigit = ''
    }
    if (this.props.varName === symbol) {
      validationResult = this.validateDigit(prevSymbol)
    }
    if (CLOSING_BRACKET === symbol) {
      validationResult = this.validateClosingBracket(prevSymbol)
      prevDigit = ''
    }
    if (OPENING_BRACKET === symbol) {
      validationResult = this.validateOpeningBracket(prevSymbol)
    }
    if (validationResult) {
      this.props.setExpression(this.props.expression + symbol)
      this.setState({
        prevSymbol: symbol,
        prevDigit: prevDigit
      })
    } else {
      event.preventDefault()
    }

  }

  onKeyUp = (event) => {
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
      this.props.setExpression(
          this.props.expression.slice(0, this.props.expression.length - 1))
      this.setState({
        prevSymbol: prevSymbol,
        prevDigit: prevDigit
      })
    }
  }

  onKeyDown = (event) => {
    if (event && event.keyCode === 37 || event.keyCode === 39) {
      event.preventDefault()
    }
  }

  validateDot = (prevSymbol) => {
    return !prevSymbol || DIGITS.includes(prevSymbol)
        && !this.state.prevDigit.includes('.')
  }

  validateDigit = (prevSymbol) => {
    return !prevSymbol || DIGITS.includes(prevSymbol) || SIGNS.includes(
        prevSymbol) || DOT === prevSymbol || prevSymbol
        === OPENING_BRACKET
  }

  validateSign = (prevSymbol) => {
    return !prevSymbol || DIGITS.includes(prevSymbol) || CLOSING_BRACKET
        === prevSymbol || prevSymbol
        === this.props.varName
  }

  validateClosingBracket = (prevSymbol) => {
    let openingCount = (this.props.expression.match(/\(/g) || []).length
    let closingCount = (this.props.expression.match(/\)/g) || []).length
    return (!prevSymbol || DIGITS.includes(prevSymbol) || prevSymbol
        === this.props.varName) && openingCount > closingCount
  }

  validateOpeningBracket = (prevSymbol) => {
    return !prevSymbol || SIGNS.includes(prevSymbol)
  }
  onFocus = () => {
    this.setState({...this.state, focused: true})
  }
  onfocusout = () => {
    this.setState({...this.state, focused: false})
  }
  onMouseDown = (event) => {
    if (this.state.focused) {
      event.preventDefault()
    }
  }

  render() {
    return (
        <div>
          <input type="text"
                 className={css.calculator__display + ' '
                 + cssParent.fit_parent_div}
                 onKeyUp={this.onKeyUp}
                 onKeyDown={this.onKeyDown}
                 onBeforeInput={this.onBeforeInput}
                 onFocus={this.onFocus}
                 onMouseDown={this.onMouseDown}
                 onBlur={this.onfocusout}
          />
        </div>
    )
  }
}
