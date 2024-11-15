# 🏪 편의점 결제 시스템

## 📋 기능 목록

1. **상품 및 수량 입력 받기**

   - 입력 예시: `"콜라-3", "에너지바-5"`
   - 조건: 하이픈(-)으로 상품과 수량을 구분하고, 쉼표(,)로 구분하여 입력받습니다.
   - 입력 오류 시:
     - `[ERROR] 잘못된 형식입니다. 다시 입력해 주세요.`

2. **재고 상태 확인 및 안내**

   - 입력된 상품에 대해 재고를 확인하고, 재고가 부족하면 오류 메시지를 출력합니다.
   - 예시: 재고가 부족한 상품에 대해 다음과 같이 출력됩니다:
     - `[ERROR] 재고 수량을 초과하여 구매할 수 없습니다. 다시 입력해 주세요.`

3. **프로모션 적용 여부 확인**

   - 특정 상품에 대해 1+1, 2+1 프로모션 적용 여부를 묻고, 수량을 확인합니다.
   - 예시: `"현재 콜라는 1개를 무료로 더 받을 수 있습니다. 추가하시겠습니까?"`

4. **멤버십 할인 적용**

   - 멤버십 가입 여부를 묻고, 해당 시 30%의 멤버십 할인을 적용합니다. 최대 할인 한도는 8,000원입니다.
   - 예시: `"멤버십 할인을 받으시겠습니까? (Y/N)"`

5. **영수증 출력 및 결제 금액 안내**

   - 구매 내역, 증정 상품 내역, 할인 정보를 포함한 영수증을 출력합니다.
   - 예시:
     ```
     ==============W 편의점================
     상품명        수량    금액
     콜라           3    3,000
     에너지바       5   10,000
     =============증	정===============
     콜라           1
     ====================================
     총구매액       8    13,000
     행사할인       -1,000
     멤버십할인     -3,000
     내실돈          9,000
     ```

6. **추가 구매 여부 확인**
   - 결제 후, 추가로 구매할 상품이 있는지 물어보고, 추가 구매 여부에 따라 시스템을 종료하거나 계속 진행합니다.
   - 예시: `"감사합니다. 구매하고 싶은 다른 상품이 있나요? (Y/N)"`

## 🚀 사용 방법

1. `npm install`을 통해 필요한 패키지를 설치합니다.
2. `npm run start`로 프로그램을 실행합니다.
3. 상품명과 수량을 입력하고, 프로모션과 멤버십 할인을 선택하여 결제 정보를 확인합니다.

## 🛠️ 테스트 방법

1. `npm run test`로 모든 테스트 케이스를 실행합니다.
2. 모든 기능이 제대로 작동하는지 확인합니다.

## 🎯 목표

- **기능별로 클래스를 분리하여 객체들이 협력하도록 설계합니다.**
- **입력 유효성 검사를 강화하고, 예외 처리를 통해 안정적인 동작을 보장합니다.**
- **단위 테스트를 통해 각 기능이 의도대로 작동하는지 검증하고, 테스트를 기반으로 코드를 개선합니다.**
- **3주차 피드백을 바탕으로 코드 품질과 효율성을 개선합니다.**
- **마지막 프리코스 과제니 최선을 다해서 잘 마무리 해 봅시다!**
