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

