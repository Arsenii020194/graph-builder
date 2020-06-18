import * as React from "react";
import {CLOSING_BRACKET, DIGITS} from "../constants/Consts";

export default class ClosingBracketsValidator {
  allowBefore = [CLOSING_BRACKET, ...DIGITS]
  isValid(prevSymbol, prevDigit, prevString) {
    let countOpen = (prevString.match(/\(/g) || []).length
    let countClosed = (prevString.match(/\)/g) || []).length
    return !prevSymbol || this.allowBefore.includes(prevSymbol) && (countOpen - countClosed  >= 1)
  }
}

