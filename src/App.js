import StoreController from "./controllers/StoreController.js";

class App {
  async run() {
    const storeController = new StoreController();
    storeController.start();
  }
}

export default App;
