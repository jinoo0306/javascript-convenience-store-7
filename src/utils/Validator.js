import { ERROR_MESSAGES } from "../utils/constants.js";

class Validator {
  static validateItemInput(input) {
    const regex = /^\[([a-zA-Z가-힣]+)-(\d+)\](,\[([a-zA-Z가-힣]+)-(\d+)\])*$/;
    if (!regex.test(input)) {
      throw new Error(ERROR_MESSAGES.INVALID_FORMAT); // 에러 발생
    }
  }
}

export default Validator;
