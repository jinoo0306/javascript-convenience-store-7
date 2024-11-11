import { Console } from "@woowacourse/mission-utils";
import {
  WELCOME_MESSAGE,
  RECEIPT_FORMAT,
  MAX_NAME_LENGTH,
  MAX_QUANTITY_LENGTH,
  MAX_PRICE_LENGTH,
} from "../utils/constants.js";

const OutputView = {
  printWelcome() {
    Console.print(WELCOME_MESSAGE.GREETING_WSTORE);
    Console.print(WELCOME_MESSAGE.PRODUCT_INFO);
  },

  printProduct(products) {
    products.forEach((product) => {
      Console.print(`- ${product.getInfo()}`);
    });
  },

  printPromotionOffer(productName, additionalQuantity) {
    Console.print(
      `현재 ${productName}는 ${additionalQuantity}개를 무료로 더 받을 수 있습니다.`
    );
  },

  printTotalAmount(amount) {
    Console.print(`최종 결제 금액: ${(amount || 0).toLocaleString()}원`);
  },

  printReceipt(
    cart,
    giveawayItems,
    promotionDiscount,
    membershipDiscount,
    finalAmount,
    totalAmount
  ) {
    Console.print(RECEIPT_FORMAT.TITLE_STORE);

    Console.print(
      `${"상품명".padEnd(MAX_NAME_LENGTH)} ${"수량".padStart(
        MAX_QUANTITY_LENGTH
      )} ${"금액".padStart(MAX_PRICE_LENGTH)}`
    );

    cart.forEach((item) => {
      const name = item.name.padEnd(MAX_NAME_LENGTH);
      const quantity = String(item.quantity).padStart(MAX_QUANTITY_LENGTH); // 수량을 고정 너비로 채우기
      const price = (item.price * item.quantity)
        .toLocaleString()
        .padStart(MAX_PRICE_LENGTH);
      Console.print(`${name} ${quantity} ${price}`);
    });

    Console.print(RECEIPT_FORMAT.TITLE_GIVEAWAY);
    giveawayItems.forEach((item) => {
      const name = item.name.padEnd(MAX_NAME_LENGTH);
      const quantity = `${item.quantity}`.padStart(MAX_QUANTITY_LENGTH);
      Console.print(`${name} ${quantity}`);
    });

    Console.print(RECEIPT_FORMAT.TITLE_PAYMENT);
    Console.print(
      RECEIPT_FORMAT.TOTAL_AMOUNT(
        totalAmount.toLocaleString().padStart(MAX_PRICE_LENGTH)
      )
    );
    Console.print(
      RECEIPT_FORMAT.EVENT_DISCOUNT(
        promotionDiscount.toLocaleString().padStart(MAX_PRICE_LENGTH)
      )
    );
    Console.print(
      RECEIPT_FORMAT.MEMBERSHIP_DISCOUNT(
        membershipDiscount.toLocaleString().padStart(MAX_PRICE_LENGTH)
      )
    );
    Console.print(
      RECEIPT_FORMAT.FINAL_AMOUNT(
        finalAmount.toLocaleString().padStart(MAX_PRICE_LENGTH)
      )
    );

    Console.print(RECEIPT_FORMAT.END_LABEL);
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;
