import * as React from "react";
import {DIGITS} from "../constants/Consts";

export default class PowValidator {

  allowBefore = [DIGITS]

  isValid(prevSymbol) {
    return !prevSymbol || this.allowBefore.includes(prevSymbol)
  }
}
