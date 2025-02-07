import {Boo} from "../../Boo/factory.js";
import {Str} from "../../Str/factory.js";
import {Just} from "../../Maybe/factory.js";

test("'Boo' factory works.", () => {
  expect(Boo(true).type()).toBe('Boo');
});

test("'Boo' returns false for null/undefined.", () => {
  expect(Boo(null).get()).toBe(false);
});

describe('Gonad interface is implemented', () => {
  
  test("'map' function works.", () => {
      expect(
        Boo(true)
          .map(x => x ? "yes" : "no")
          .get()
      ).toBe('yes');
  });

  test("'bind' function works.", () => {
    expect(
      Boo(true)
        .bind(x => Boo(false))
        .get()
    ).toBe(false);

    expect(
      Boo(true)
        .bind(x => x ? Str("yes") : Str("no"))
        .get()
    ).toBe("yes");
  
  });

  test("'ap' function works.", () => {

    expect(
      Just(x => !x)
        .ap(Boo(false))
        .get()
    ).toBe(true);

  });

  test("'fork' function works.", () => {
      expect(
        Boo(true)
          .fork(
            x => "was false",
            x => "was true"
          )
      ).toBe("was true");
  });

  test("'extend' function works.", () => {

      expect(
        Boo(false)
          .extend(x => x.not())
          .get()
      ).toBe(true);

  });

  test("'type' function works.", () => {
    expect(
      Boo()
        .type()
    ).toBe("Boo");
  });

}); // 'Gonad interface is implemented'


describe("Boo methods work", () => {

  test("'isTrue' and 'isFalse' methods work", () => {

    expect(Boo(true).isTrue()).toBe(true);
    expect(Boo(false).isTrue()).toBe(false);
    expect(Boo(false).isTrue()).toBe(false);
    expect(Boo(false).isFalse()).toBe(true);

  });

});