import {Arr, Lst, Kvm} from "../../Arr/factory.js";
import {Just} from "../../Maybe/factory.js";

test("'Arr' factory works.", () => {
  expect(Arr(['test']).type()).toBe('Arr');
  expect(Arr(['test']).get()).toEqual(['test']);

});

test("'Arr' routes object values to 'Kvm'.", () => {
  expect(Arr({ test: 'value' }).type()).toBe('Kvm');
  expect(Arr({ test: 'value' }).get()).toEqual({ test: 'value' });
});

test("'Lst' and 'Kvm' factories work.", () => {
  expect(Lst(['test']).type()).toBe('Lst');
  expect(Kvm({ test: 'value' }).type()).toBe('Kvm');
});

describe('Gonad interface is implemented', () => {
  
  test("'map' function works.", () => {
      expect(
        Arr(['test'])
          .map(x => x.toUpperCase())
          .get()
      ).toEqual(['TEST']);
  });

  test("'map' function works on object", () => {
      expect(
        Arr({
          first: "John",
          last: "Smith"
        })
          .map(x => x.toUpperCase())
          .get()
      ).toEqual({
        first: "JOHN",
        last: "SMITH"
      });
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