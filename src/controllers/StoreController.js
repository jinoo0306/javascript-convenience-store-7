import OutputView from "../views/OutputView.js";
import InputView from "../views/InputView.js";
import StoreService from "../services/StoreService.js";
import Validator from "../utils/Validator.js";

class StoreController {
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

        if (additionalOffer > 0) {
          const response = await InputView.askPromotionOffer(
            name,
            additionalOffer
          );
          if (response === "Y") {
            console.log("추가!");
          }
        }
      }
    } catch (error) {
      OutputView.printError(error.message);
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
}

export default StoreController;
