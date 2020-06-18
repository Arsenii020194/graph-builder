import * as React from "react";
import {CLOSING_BRACKET, DIGITS} from "../constants/Consts";

export default class SignValidator {
  allowBefore = [CLOSING_BRACKET, ...DIGITS]

  isValid(prevSymbol) {
    return !prevSymbol || this.allowBefore.includes(prevSymbol)
  }
}

