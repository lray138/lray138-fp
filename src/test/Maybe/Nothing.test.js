import {Maybe, Just, Nothing} from "../../Maybe/factory.js";
import {Str} from "../../Str/factory.js";

describe('Gonad interface is implemented', () => {
  
  test("'map' function works.", () => {
      expect(
        Nothing('test')
          .map(x => x.toUpperCase())
          .get()
      ).toBe(null);
  });

  test("'bind' function works.", () => {
    expect(
      Nothing('test')
        .bind(x => Just(x.toUpperCase()))
        .get()
    ).toBe(null);

  });

  test("'ap' function works.", () => {

    expect(
      Nothing(x => x.toUpperCase())
        .ap(Just('test'))
        .get()
    ).toBe(null);

  });

  test("'fork' function works.", () => {

      expect(
        Nothing()
          .fork(
            x => 'Nothing here',
            x => x.toUpperCase()
          )
      ).toBe('Nothing here');

  });

  test("'extend' function works.", () => {
    expect(
      Nothing()
        .extend(x => Str(x + 5))
        .type()
    ).toBe('Nothing');
  });

  test("'type' function works.", () => {
    expect(
      Nothing(5)
        .type()
    ).toBe("Nothing");
  });

});