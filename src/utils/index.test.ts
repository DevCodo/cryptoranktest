import { format, getFromATH, getToATH, round } from ".";

describe("Тестирование функции format", () => {
  it("форматирование суммы", () => {
    expect(format(12342.004)).toEqual("12 342.004");
  });
});

describe("Тестирование функции round", () => {
  it("округление числа", () => {
    expect(round(123.555)).toEqual(123.56);
  });
});

describe("Тестирование функции getFromATH", () => {
  it("Eсли не шашлась манета", () => {
    expect(getFromATH(undefined)).toEqual(undefined);
  });

  it("Получение разницы в %", () => {
    expect(
      getFromATH({
        name: "Bitcoin",
        athPrice: { USD: 100 },
        price: { USD: 40 },
      })
    ).toEqual(60);
  });
});

describe("Тестирование функции getToATH", () => {
  it("Eсли не шашлась манета", () => {
    expect(getToATH(undefined)).toEqual(undefined);
  });

  it("Получение разницы в %", () => {
    expect(
      getToATH({
        name: "Bitcoin",
        athPrice: { USD: 100 },
        price: { USD: 40 },
      })
    ).toEqual(150);
  });
});
