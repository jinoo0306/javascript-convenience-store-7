import { StoreReceipt } from "";
import { MissionUtils } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";

const mockQuestions = (inputs) => {
  const messages = [];

  MissionUtils.Console.readLineAsync = jest.fn((prompt) => {
    messages.push(prompt);
    const input = inputs.shift();

    if (input === undefined) {
      throw new Error("NO INPUT");
    }

    return Promise.resolve(input);
  });

  MissionUtils.Console.readLineAsync.messages = messages;
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expects) => {
  expects.forEach((exp) => {
    expect(received).toContain(exp);
  });
};

const run = async ({
  inputs = [],
  inputsToTerminate = [],
  expected = [],
  expectedIgnoringWhiteSpaces = [],
}) => {
  // given
  const logSpy = getLogSpy();
  mockQuestions([...inputs, ...inputsToTerminate]);

  const app = new StoreReceipt();
  await app.run();

  const output = getOutput(logSpy);

  if (expectedIgnoringWhiteSpaces.length > 0) {
    expectLogContains(output, expectedIgnoringWhiteSpaces);
  }
  if (expected.length > 0) {
    expectLogContains(output, expected);
  }
};

describe("편의점 결제 시스템 테스트", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("상품 목록을 출력한다.", async () => {
    await run({
      inputs: ["[콜라-1]", "N", "N"],
      expected: [
        "- 콜라 1,000원 10개 탄산2+1",
        "- 콜라 1,000원 10개",
        "- 사이다 1,000원 8개 탄산2+1",
        "- 사이다 1,000원 7개",
        "- 오렌지주스 1,800원 9개 MD추천상품",
        "- 오렌지주스 1,800원 재고 없음",
        "- 탄산수 1,200원 5개 탄산2+1",
        "- 탄산수 1,200원 재고 없음",
        "- 물 500원 10개",
        "- 비타민워터 1,500원 6개",
        "- 감자칩 1,500원 5개 반짝할인",
        "- 감자칩 1,500원 5개",
        "- 초코바 1,200원 5개 MD추천상품",
        "- 초코바 1,200원 5개",
        "- 에너지바 2,000원 5개",
        "- 정식도시락 6,400원 8개",
        "- 컵라면 1,700원 1개 MD추천상품",
        "- 컵라면 1,700원 10개",
      ],
    });
  });

  test("프로모션이 적용된 상품 구매", async () => {
    await run({
      inputs: ["[콜라-3]", "N", "N"],
      expectedIgnoringWhiteSpaces: ["내실돈9,000"],
    });
  });

  test("멤버십 할인이 적용된 구매", async () => {
    await run({
      inputs: ["[콜라-2]", "Y", "N"],
      expectedIgnoringWhiteSpaces: ["내실돈5,800"],
    });
  });

  test("잘못된 형식 입력", async () => {
    await runExceptions({
      inputs: ["[콜라-10", "N", "N"],
      expectedErrorMessage: "[ERROR] 잘못된 형식입니다. 다시 입력해 주세요.",
    });
  });

  test("재고 초과 입력 시 예외 처리", async () => {
    await runExceptions({
      inputs: ["[콜라-12]", "N", "N"],
      expectedErrorMessage:
        "[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.",
    });
  });

  test("프로모션 기간 외 상품 구매", async () => {
    mockNowDate("2024-02-01");

    await run({
      inputs: ["[감자칩-3]", "N", "N"],
      expectedIgnoringWhiteSpaces: ["내실돈4,500"],
    });
  });

  test("프로모션 재고 부족 시 정가로 결제 여부 확인", async () => {
    await run({
      inputs: ["[사이다-5]", "Y", "N"],
      expectedIgnoringWhiteSpaces: ["내실돈5,000"],
    });
  });

  test("멤버십 할인 미적용", async () => {
    await run({
      inputs: ["[콜라-1]", "N", "N"],
      expectedIgnoringWhiteSpaces: ["내실돈1,000"],
    });
  });
});
