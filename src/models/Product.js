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

  calculatePromotionOffer(buyQuantity) {
    if (!this.promotion) return { freeQuantity: 0, discount: 0 };

    const { buy, get } = this.promotion;
    const sets = Math.floor(buyQuantity / (buy + get));
    const freeQuantity = sets * get;
    const discount = freeQuantity * this.price;

    return { freeQuantity, discount };
  }

  getTotalPrice(quantity) {
    return quantity * this.price;
  }

  getInfo() {
    let promotionInfo = "";
    if (this.promotion) {
      promotionInfo = `${this.promotion.name}`;
    }
    return `${this.name} ${this.price}원 ${this.quantity}개 ${promotionInfo}`;
  }

  getPromotionOffer(buyQuantity) {
    if (!this.promotion) return 0;

    const requiredQuantity = this.promotion.buy;
    const freeQuantity = this.promotion.get;
    const eligibleForPromotion =
      buyQuantity % (requiredQuantity + freeQuantity);
    const offerCount =
      eligibleForPromotion >= requiredQuantity ? freeQuantity : 0;

    return offerCount;
  }
}

export default Product;
