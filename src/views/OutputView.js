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
      Console.print(`- ${product.getInfo()}`); // Product의 getInfo 메서드를 호출하여 출력
    });
  },
};

export default OutputView;
