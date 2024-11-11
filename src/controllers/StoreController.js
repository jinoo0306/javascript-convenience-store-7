import OutputView from "../views/OutputView.js";
import InputView from "../views/InputView.js";
import StoreService from "../services/StoreService.js";
import Validator from "../utils/Validator.js";

class StoreController {
  constructor() {
    this.cart = [];
    this.giveawayItems = [];
    this.totalAmount = 0;
    this.promotionDiscount = 0;
    this.membershipDiscount = 0;
    this.finalAmount = 0;
    this.products = StoreService.loadProducts();
  }

  async start() {
    await this.BuyProduct();
  }

  async BuyProduct() {
    OutputView.printWelcome();
    OutputView.printProduct(this.products);

    try {
      const input = await InputView.readItem();
      Validator.validateItemInput(input);

      const separatedInput = this.separateInput(input);
      Validator.validateStock(this.products, separatedInput);

      for (const { name, quantity } of separatedInput) {
        const product = this.products.find((item) => item.name === name);
        const additionalOffer = product.getPromotionOffer(quantity);

        let totalQuantity = quantity;
        if (additionalOffer > 0) {
          const response = await InputView.askPromotionOffer(
            name,
            additionalOffer
          );
          if (response.toLowerCase() === "y") {
            this.giveawayItems.push({ name, quantity: additionalOffer });
            this.promotionDiscount += additionalOffer * product.price;
            totalQuantity += additionalOffer;
          }
        }

        product.reduceStock(totalQuantity);
        this.addToCart(product.name, totalQuantity, product.price);
      }

      const discountMembership = await InputView.askMembership();
      if (discountMembership.toLowerCase() === "y") {
        this.applyMembershipDiscount();
      }

      this.finalAmount =
        this.totalAmount - this.promotionDiscount - this.membershipDiscount;

      this.printReceipt();

      const response = await InputView.askContinueShopping();
      if (response.toLowerCase() === "y") {
        await this.BuyProduct();
      } else {
        Console.print("프로그램을 종료합니다.");
      }
    } catch (error) {
      OutputView.printError(error.message);
      await this.BuyProduct();
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
      this.cart.push({ name: productName, quantity, price });
    }
    this.totalAmount += quantity * price;
  }

  applyMembershipDiscount() {
    this.membershipDiscount = Math.min(
      (this.totalAmount - this.promotionDiscount) * 0.3,
      8000
    );
  }

  printReceipt() {
    OutputView.printReceipt(
      this.cart,
      this.giveawayItems,
      this.promotionDiscount,
      this.membershipDiscount,
      this.finalAmount,
      this.totalAmount
    );
  }
}

export default StoreController;
