import * as consts from "../constants/Consts";
import ClosingBracketsValidator from "./ClosingBracketsValidator";
import OpeningBracketValidator from "./OpeningBracketValidator";
import DigitValidator from "./DigitValidator";
import SignValidator from "./SignValidator";
import DotValidator from "./DotValidator";

export default class ValidatorFactory {

  static getValidator(symbol) {
    if (consts.CLOSING_BRACKET === symbol){
      return new ClosingBracketsValidator()
    }
    if (consts.OPENING_BRACKET === symbol){
      return new OpeningBracketValidator()
    }
    if (consts.DIGITS.includes(symbol)){
      return new DigitValidator()
    }
    if (consts.SIGNS.includes(symbol)){
      return new SignValidator()
    }
    if (consts.DOT === symbol){
      return new DotValidator()
    }
    if (consts.POW === symbol){
      return new DotValidator()
    }
  }
}
