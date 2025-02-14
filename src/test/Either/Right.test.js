import {Either, Left, Right} from "../../Either/factory.js";
import {Just} from "../../Maybe/factory.js";
import {Str} from "../../Str/factory.js";

describe('Gonad interface is implemented', () => {
  
  test("'map' function works.", () => {
      expect(
        Right('test')
          .map(x => x.toUpperCase())
          .get()
      ).toBe('TEST');
  });

  test("'bind' function works.", () => {
    
    expect(
      Right('test')
        .bind(x => Right(x.toUpperCase()))
        .get()
    ).toBe('TEST');

  });

  test("'ap' function works.", () => {

    expect(
      Right(x => x.toUpperCase())
        .ap(Just('test'))
        .get()
    ).toBe('TEST');

  });

  test("'fork' function works.", () => {

      expect(
        Right('test')
          .fork(
            x => x,
            x => x.toUpperCase()
          )
      ).toBe('TEST');

  });

  test("'extend' function works.", () => {

      expect(
        Right(5)
          .extend(x => Str(x + 5))
          .type()
      ).toBe("Str");

  });

  test("'type' function works.", () => {
    expect(
      Right(5)
        .type()
    ).toBe("Right");
  });

  test("'goe' function works.", () => {
    expect(
      Right(5)
        .goe('else')
    ).toBe(5);
  });

}); // 'Gonad interface is implemented'

