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
