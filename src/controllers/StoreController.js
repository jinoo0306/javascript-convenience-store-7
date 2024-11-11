import OutputView from "../views/OutputView.js";
import InputView from "../views/InputView.js";
import StoreService from "../services/StoreService.js";
import Validator from "../utils/Validator.js";

class StoreController {
  constructor() {
    this.cart = [];
    this.totalAmount = 0; // 총 구매 금액
    this.finalAmount = 0; // 프로모션 및 멤버십 할인 적용 후 금액
  }

  async start() {
    this.BuyProduct();
  }

  async BuyProduct() {
    OutputView.printWelcome();
    const products = StoreService.loadProducts();
    OutputView.printProduct(products);

    try {
      const input = await InputView.readItem();
      Validator.validateItemInput(input);

      const separatedInput = this.separateInput(input);
      Validator.validateStock(products, separatedInput);

      for (const { name, quantity } of separatedInput) {
        const product = products.find((item) => item.name === name);
        const additionalOffer = product.getPromotionOffer(quantity);

        let totalQuantity = quantity;
        if (additionalOffer > 0) {
          const response = await InputView.askPromotionOffer(
            name,
            additionalOffer
          );
          if (response.toLowerCase() === "Y") {
            totalQuantity += additionalOffer;
          }
        }

        this.addToCart(product.name, totalQuantity, product.price);
      }

      const discountMembership = await InputView.askMembership();
      if (discountMembership === "Y") {
        this.applyMembershipDiscount();
      }

      OutputView.printTotalAmount(this.finalAmount); // 최종 결제 금액 출력
    } catch (error) {
      OutputView.printError(error.message);
      this.BuyProduct();
    }
  }

  separateInput(input) {
    return input
      .slice(1, -1)
      .split("],[")
      .map((item) => {
        const [name, quantity] = item.split("-");
        return { name, quantity: parseInt(quantity, 10) };
      });
  }

  addToCart(productName, quantity, price) {
    const existingItem = this.cart.find((item) => item.name === productName);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({ name: productName, quantity });
    }
    this.totalAmount += quantity * price;
  }

  applyMembershipDiscount() {
    const discount = Math.min(this.totalAmount * 0.3, 8000);
    this.finalAmount = this.totalAmount - discount;
  }
}

export default StoreController;
