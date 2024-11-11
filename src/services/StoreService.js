import fs from "fs";
import Product from "../models/Product.js";

const StoreService = {
  products: [],
  totalAmount: 0,

  loadProducts() {
    const productsData = fs.readFileSync("public/products.md", "utf-8");
    const promotionsData = fs.readFileSync("public/promotions.md", "utf-8");

    this.products = this.parseProductData(productsData, promotionsData);
    return this.products;
  },

  parseProductData(productsData, promotionsData) {
    const promotions = this.parsePromotions(promotionsData);

    return productsData
      .trim()
      .split("\n")
      .slice(1)
      .map((line) => {
        const [name, price, quantity, promotion] = line.split(",");
        const promotionInfo = promotions[promotion] || null;

        return new Product(
          name,
          parseInt(price, 10),
          parseInt(quantity, 10),
          promotionInfo
        );
      });
  },

  parsePromotions(promotionsData) {
    return promotionsData
      .trim()
      .split("\n")
      .slice(1)
      .reduce((acc, line) => {
        const [name, buy, get, startDate, endDate] = line.split(",");
        acc[name] = {
          name,
          buy: parseInt(buy, 10),
          get: parseInt(get, 10),
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        };
        return acc;
      }, {});
  },

  addToCart(cart, productName, quantity) {
    const product = this.products.find((item) => item.name === productName);
    if (!product) throw new Error(ERROR_MESSAGES.INVALID_FORMAT);

    const { freeQuantity, discount } =
      product.calculatePromotionOffer(quantity);
    product.reduceStock(quantity + freeQuantity);

    const totalPrice = product.getTotalPrice(quantity);
    this.totalAmount += totalPrice;

    cart.push({
      name: product.name,
      quantity,
      price: product.price,
      hasPromotion: discount > 0,
    });

    return { totalPrice, freeQuantity, discount };
  },

  calculateTotalAmount() {
    return this.totalAmount;
  },
};

export default StoreService;
