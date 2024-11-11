import { ERROR_MESSAGES } from "../utils/constants.js";

class Validator {
  static validateItemInput(input) {
    const regex = /^\[([a-zA-Z가-힣]+)-(\d+)\](,\[([a-zA-Z가-힣]+)-(\d+)\])*$/;
    if (!regex.test(input)) {
      throw new Error(ERROR_MESSAGES.INVALID_FORMAT);
    }
  }

  static validateStock(products, userInput) {
    userInput.forEach(({ name, quantity }) => {
      const product = products.find((item) => item.name === name);
      if (!product || product.quantity < quantity) {
        throw new Error(ERROR_MESSAGES.EXCEED_STOCK);
      }
    });
  }
}

export default Validator;
