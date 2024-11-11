import OutputView from "../views/OutputView.js";
import InputView from "../views/InputView.js";
import StoreService from "../services/StoreService.js";
import Validator from "../utils/Validator.js";

class StoreController {
  constructor() {
    this.cart = [];
    this.giveawayItems = [];
    this.promotionDiscount = 0;
    this.membershipDiscount = 0;
    this.totalAmount = 0;
    this.finalAmount = 0;
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
        const { totalPrice, freeQuantity, discount } = StoreService.addToCart(
          this.cart,
          name,
          quantity
        );
        if (freeQuantity > 0)
          this.giveawayItems.push({ name, quantity: freeQuantity });

        this.promotionDiscount += discount;
      }

      this.totalAmount = StoreService.calculateTotalAmount(); // 총 구매액 저장

      const discountMembership = await InputView.askMembership();
      if (discountMembership.toLowerCase() === "y") {
        this.applyMembershipDiscount();
      }

      this.finalAmount =
        this.totalAmount - this.promotionDiscount - this.membershipDiscount;

      this.printReceipt();
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

  applyMembershipDiscount() {
    const nonPromotionalTotal = this.cart
      .filter((item) => !item.hasPromotion)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);

    this.membershipDiscount = Math.min(nonPromotionalTotal * 0.3, 8000);
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
