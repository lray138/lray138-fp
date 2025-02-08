import {Just, Nothing} from "../../Maybe/factory.js";
import {Str} from "../../Str/factory.js";

describe('Gonad interface is implemented', () => {
  
  test("'map' function works.", () => {
      expect(
        Just('test')
          .map(x => x.toUpperCase())
          .get()
      ).toBe('TEST');
  });

  test("'bind' function works.", () => {
    
    expect(
      Just('test')
        .bind(x => Just(x.toUpperCase()))
        .get()
    ).toBe('TEST');

  });

  test("'ap' function works.", () => {

    expect(
      Just(x => x.toUpperCase())
        .ap(Just('test'))
        .get()
    ).toBe('TEST');

  });

  test("'fork' function works.", () => {

      expect(
        Just('test')
          .fork(
            x => x,
            x => x.toUpperCase()
          )
      ).toBe('TEST');

  });

  test("'extend' function works.", () => {

      expect(
        Just(5)
          .extend(x => Str(x + 5))
          .type()
      ).toBe("Str");

  });

  test("'type' function works.", () => {
    expect(
      Just(5)
        .type()
    ).toBe("Just");
  });

}); // 'Gonad interface is implemented'


describe('"Magic" proxy functions impemented', () => {

  test("Proxy call to prototype method works with String", () => {

    expect(
      Just('test')
        .toUpperCase()
        .get()
    ).toBe('TEST');

  });

  test("Proxy call to prototype method works with Number", () => {
    let val = Just(1).toFixed(2);
    expect(val.type()).toBe("Str");
    expect(val.get()).toBe("1.00");
  });

  test("Proxy call to non-member and non-prototype method returns Nothing.", () => {

    expect(
      Just('test')
        .toUppferCase()
        .type()
    ).toBe('Nothing');

  });

  test("Proxy call to non-member and non-prototype method returns Left.", () => {
    let val = Just({first_name: "John"}).toUppferCase();
      expect(val.type()).toBe('Nothing');
  });

});
