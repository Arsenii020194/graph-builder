import * as React from "react";
import {DIGITS, DOT, OPENING_BRACKET, POW, SIGNS} from "../constants/Consts";

export default class DigitValidator {

  allowBefore = [DOT, POW, OPENING_BRACKET, ...DIGITS, ...SIGNS]

  isValid(prevSymbol) {
    return !prevSymbol || this.allowBefore.includes(prevSymbol)
  }
}

