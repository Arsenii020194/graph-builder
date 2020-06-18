import * as React from "react";
import {DIGITS} from "../constants/Consts";

export default class DotValidator {
  allowBefore = DIGITS

  isValid(prevSymbol, prevDigit) {
    return !prevSymbol || this.allowBefore.includes(prevSymbol) && !prevDigit.includes('.')
  }
}

