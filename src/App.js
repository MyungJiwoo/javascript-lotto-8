import { Console } from "@woowacourse/mission-utils";
import LottoController from "./controller/LottoController.js";
import { ERROR_PREFIX } from "./constants.js";

class App {
  async run() {
    try {
      const controller = new LottoController();
      await controller.run();
    } catch (error) {
      Console.print(`${ERROR_PREFIX} ${error.message}`);
    }
  }
}

export default App;
