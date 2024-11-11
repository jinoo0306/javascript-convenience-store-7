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
};

export default InputView;
