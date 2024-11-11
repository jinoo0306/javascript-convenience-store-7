import { Console } from "@woowacourse/mission-utils";
import { INPUT_MESSAGES } from "../utils/constants.js";

const InputView = {
  async readItem() {
    const input = await Console.readLineAsync(
      INPUT_MESSAGES.ITEM_QUANTITY_INPUT
    );
    return input;
  },

  async askPromotionOffer(productName, additionalQuantity) {
    const input = await Console.readLineAsync(
      INPUT_MESSAGES.PROMOTION_OFFER(productName, additionalQuantity)
    );
    return input;
  },

  async askMembership() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.MEMBERSHIP_CHECK);
    return input;
  },

  async askContinueShopping() {
    const input = await Console.readLineAsync(INPUT_MESSAGES.CONTINUE_SHOPPING);
    return input;
  },
};

export default InputView;
