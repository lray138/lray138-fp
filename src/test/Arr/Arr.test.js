import {Arr} from "../../Arr/factory.js";
import {Just} from "../../Maybe/factory.js";

test("'Arr' factory works.", () => {
  expect(Arr(['test']).type()).toBe('Arr');
  expect(Arr(['test']).get()).toEqual(['test']);

});

describe('Gonad interface is implemented', () => {
  
  test("'map' function works.", () => {
      expect(
        Arr('test')
          .map(x => x.toUpperCase())
          .get()
      ).toEqual(['TEST']);
  });

  test("'bind' function works.", () => {
    
    expect(
      Arr(['test'])
        .bind(x => Just(x.toUpperCase()))
        .get()
    ).toEqual(['TEST']);

  });

  test("'ap' function works.", () => {

    expect(
      Arr([x => x.toUpperCase()])
        .ap(Just('test'))
        .get()
    ).toEqual(['TEST']);

  });

  test("'fork' function works.", () => {
      expect(
        Arr('test')
          .fork(
            x => x,
            x => x
          )
      ).toEqual(['test']);

  });

  test("'extend' function works.", () => {

      expect(
        Arr(['test'])
          .extend(x => Just(x))
          .type()
      ).toBe("Just");

  });

  test("'type' function works.", () => {
    expect(
      Arr(['test'])
        .type()
    ).toBe("Arr");
  });

}); // 'Gonad interface is implemented'



test('call', () => {
  let a = Arr({
    "prop": "a"
  }).prop("prop").get()

  expect(a).toBe("a");
})