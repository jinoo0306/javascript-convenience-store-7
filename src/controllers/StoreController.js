import OutputView from "../views/OutputView.js";
import InputView from "../views/InputView.js";
import StoreService from "../services/StoreService.js";
import Validator from "../utils/Validator.js";

class StoreController {
  constructor() {
    this.cart = [];
    this.giveawayItems = []; // 증정 상품 내역
    this.totalAmount = 0; // 총 구매 금액
    this.promotionDiscount = 0; // 프로모션 할인액
    this.membershipDiscount = 0; // 멤버십 할인액
    this.finalAmount = 0; // 최종 결제 금액
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
          if (response.toLowerCase() === "y") {
            totalQuantity += additionalOffer;
            this.giveawayItems.push({ name, quantity: additionalOffer }); // 증정 상품 내역에 추가
            this.promotionDiscount += additionalOffer * product.price; // 행사 할인 금액 누적
          }
        }

        this.addToCart(product.name, totalQuantity, product.price);
      }

      const discountMembership = await InputView.askMembership();
      if (discountMembership.toLowerCase() === "y") {
        this.applyMembershipDiscount();
      }

      this.finalAmount =
        this.totalAmount - this.promotionDiscount - this.membershipDiscount;

      // 영수증 출력
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
    this.membershipDiscount = Math.min(this.totalAmount * 0.3, 8000);
  }

  printReceipt() {
    OutputView.printReceipt(
      this.cart,
      this.giveawayItems,
      this.promotionDiscount,
      this.membershipDiscount,
      this.finalAmount,
      this.totalAmount // 총 구매 금액
    );
  }
}

export default StoreController;
