import {Either, Left, Right} from "../../Either/factory.js";
import {Just} from "../../Maybe/factory.js";
import {Str} from "../../Str/factory.js";

describe('Gonad interface is implemented', () => {
  
  test("'map' function works.", () => {
      expect(
        Left('test')
          .map(x => x.toUpperCase())
          .get()
      ).toBe('test');
  });

  test("'bind' function works.", () => {
    
    expect(
      Left('test')
        .bind(x => Right(x.toUpperCase()))
        .get()
    ).toBe('test');

  });

  test("'ap' function works.", () => {

    const func = x => x.toUpperCase();

    expect(
      Left(func)
        .ap(Just('test'))
        .get()
    ).toBe(func);

  });

  test("'fork' function works.", () => {

      expect(
        Left('test')
          .fork(
            x => x,
            x => x.toUpperCase()
          )
      ).toBe('test');

  });

  test("'extend' function works.", () => {

    expect(
      Left(5)
        .extend(x => Str(x + 5))
        .type()
    ).toBe("Left");

  });

  test("'type' function works.", () => {
    expect(
      Left(5)
        .type()
    ).toBe("Left");
  });

}); // 'Gonad interface is implemented'


describe('"Magic" proxy functions impemented', () => {

  test("Proxy call to prototype method works with String", () => {
    expect(
      Left('test')
        .toUpperCase()
        .get()
    ).toBe('test');
  });

  test("Proxy call to prototype method works with Number", () => {
    let val = Just(1).toFixed(2);
    expect(val.type()).toBe("Str");
    expect(val.get()).toBe("1.00");
  });

  test("Proxy call to non-member and non-prototype method returns Left.", () => {
    let val = Right('test')
        .toUppferCase();

    expect(val.type()).toBe('Left');
    expect(val.get()).toBe("'toUppferCase' not found.");
  });

  test("Proxy call to non-member and non-prototype method returns Left.", () => {
    let val = Right({first_name: "John"}).toUppferCase();
      expect(val.type()).toBe('Left');
  });

});