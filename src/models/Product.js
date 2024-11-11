import { ERROR_MESSAGES } from "../utils/constants.js";

class Product {
  constructor(name, price, quantity, promotion = null) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.promotion = promotion;
  }

  reduceStock(amount) {
    if (amount > this.quantity) {
      throw new Error(ERROR_MESSAGES.EXCEED_STOCK);
    }
    this.quantity -= amount;
  }

  getPromotionOffer(buyQuantity) {
    if (!this.promotion) return 0;

    const requiredQuantity = this.promotion.buy;
    const freeQuantity = this.promotion.get;
    const remainder = buyQuantity % (requiredQuantity + freeQuantity);
    if (remainder >= requiredQuantity) {
      return freeQuantity;
    }
    return 0;
  }

  getInfo() {
    let promotionInfo = "";
    if (this.promotion) {
      promotionInfo = this.promotion.name;
    }
    return `${this.name} ${this.price}원 ${this.quantity}개 ${promotionInfo}`;
  }
}

export default Product;
