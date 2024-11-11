import { Console } from "@woowacourse/mission-utils";
import { ERROR_MESSAGES, WELCOME_MESSAGE } from "../utils/constants.js";

const OutputView = {
  printError(message) {
    throw new Error(`${ERROR_MESSAGES.ERROR_PREFIX} ${message}`);
  },

  printWelcome() {
    Console.print(WELCOME_MESSAGE.GREETING_WSTORE);
    Console.print(WELCOME_MESSAGE.PRODUCT_INFO);
  },

  printProduct(products) {
    products.forEach((product) => {
      const stockInfo =
        product.quantity > 0 ? `${product.quantity}개` : "재고 없음";
      Console.print(
        `- ${product.name} ${product.price}원 ${stockInfo} ${product.promotion}`.trim()
      );
    });
  },
};

export default OutputView;
