const CHECK_SUFFIX = "(Y/N)";

export const INPUT_MESSAGES = {
  ITEM_QUANTITY_INPUT:
    "\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n",
  PROMOTION_OFFER: (productName, additionalQuantity) =>
    `\n현재 ${productName}는 ${additionalQuantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? ${CHECK_SUFFIX}\n`,
  PROMOTION_IMPOSSIBLE: (productName, additionalQuantity) =>
    `\n현재 ${productName}} ${additionalQuantity}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까? ${CHECK_SUFFIX}\n`,
  MEMBERSHIP_CHECK: `\n멤버십 할인을 받으시겠습니까? ${CHECK_SUFFIX}\n`,
  CONTINUE_SHOPPING: "\n감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)\n",
};

export const ERROR_MESSAGES = {
  ERROR_PREFIX: "[ERROR]",
  INVALID_FORMAT: "잘못된 형식입니다. 다시 입력해 주세요.",
  EXCEED_STOCK: "재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.",
};

export const WELCOME_MESSAGE = {
  GREETING_WSTORE: "안녕하세요. W편의점입니다.",
  PRODUCT_INFO: "현재 보유하고 있는 상품입니다.\n",
};

export const RECEIPT_FORMAT = {
  TITLE_STORE: "\n============== W 편의점 ================\n",
  TITLE_GIVEAWAY: "\n============= 증      정 ============\n",
  TITLE_PAYMENT: "\n============= 결제 정보 ================\n",
  END_LABEL: "\n=======================================\n",
  HEADER: "\n상품명        수량      금액",
  ITEM_LINE: (name, quantity, price) => `${name}\t${quantity}\t${price}`,
  GIVEAWAY_LINE: (name, quantity) => `${name}\t${quantity}`,
  TOTAL_AMOUNT: (price) => `총구매액:   ${price}`,
  EVENT_DISCOUNT: (price) => `행사할인:  -${price}`,
  MEMBERSHIP_DISCOUNT: (price) => `멤버십할인:-${price}`,
  FINAL_AMOUNT: (price) => `내실돈:    ${price}`,
};

export const MAX_NAME_LENGTH = 15;
export const MAX_QUANTITY_LENGTH = 5;
export const MAX_PRICE_LENGTH = 10;
