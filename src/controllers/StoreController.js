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
      Validator.validateItemInput(input); // Validator를 사용하여 입력 형식 검증
      // 올바른 입력이 확인되면 다음 로직으로 이동 (예: 상품 처리 로직)
    } catch (error) {
      OutputView.printError(error.message); // 오류 메시지 출력
      this.BuyProduct(); // 재귀 호출로 재입력 요청
    }
  }
}

export default StoreController;
