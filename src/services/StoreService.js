import fs from "fs";
import Product from "../models/Product.js";

const StoreService = {
  loadProducts() {
    const productsData = fs.readFileSync("public/products.md", "utf-8");
    const promotionsData = fs.readFileSync("public/promotions.md", "utf-8");

    return this.parseProductData(productsData, promotionsData);
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
};

export default StoreService;
