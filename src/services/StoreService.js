import fs from "fs";

const StoreService = {
  loadProducts() {
    const productsData = fs.readFileSync("public/products.md", "utf-8");
    const promotionsData = fs.readFileSync("public/promotions.md", "utf-8");

    const products = this.parseProductData(productsData, promotionsData);
    return products;
  },

  parseProductData(productsData, promotionsData) {
    const promotions = this.parsePromotions(promotionsData);

    const products = productsData
      .trim()
      .split("\n")
      .slice(1)
      .map((line) => {
        const [name, price, quantity, promotion] = line.split(",");
        let promotionInfo = "";

        if (promotion && promotions[promotion] && !promotionInfo) {
          const promo = promotions[promotion];
          promotionInfo = `${promo.name}`;
        }

        return {
          name,
          price: parseInt(price, 10),
          quantity: parseInt(quantity, 10),
          promotion: promotionInfo,
        };
      });

    return products;
  },

  parsePromotions(promotionsData) {
    const promotions = promotionsData
      .trim()
      .split("\n")
      .slice(1) // 첫 줄은 헤더이므로 제외
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

    return promotions;
  },
};

export default StoreService;
