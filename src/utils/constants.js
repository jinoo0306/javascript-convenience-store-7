export const INPUT_MESSAGES = {
  CHECK_SUFFIX: "(Y/N)",
  ITEM_QUANTITY_INPUT:
    "\n구매하실 상품명과 수량을 입력해 주세요. (예: [사이다-2],[감자칩-1])\n",
  PROMOTION_OFFER: (productName, additionalQuantity) =>
    `\n현재 ${productName}는 ${additionalQuantity}개를 무료로 더 받을 수 있습니다. 추가하시겠습니까? ${INPUT_MESSAGES.CHECK_SUFFIX}\n`,
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
