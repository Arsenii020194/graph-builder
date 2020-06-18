import * as React from "react";
import {OPENING_BRACKET, SIGNS} from "../constants/Consts";

export default class OpeningBracketValidator {

  allowBefore = [OPENING_BRACKET, ...SIGNS]
  isValid(prevSymbol) {
    return !prevSymbol || this.allowBefore.includes(prevSymbol)
  }
}

