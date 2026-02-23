import {Lst} from "../../Lst/factory.js";
import {Kvm} from "../../Kvm/factory.js";
import {Just} from "../../Maybe/factory.js";

test("'Lst' factory works.", () => {
  expect(Lst(['test']).type()).toBe('Lst');
  expect(Lst(['test']).get()).toEqual(['test']);

});

test("'Lst' and 'Kvm' factories work.", () => {
  expect(Lst(['test']).type()).toBe('Lst');
  expect(Kvm({ test: 'value' }).type()).toBe('Kvm');
});

describe('Gonad interface is implemented', () => {
  
  test("'Lst.map' function works.", () => {
      expect(
        Lst(['test'])
          .map(x => x.toUpperCase())
          .get()
      ).toEqual(['TEST']);
  });

  test("'Kvm.map' function works on object", () => {
      expect(
        Kvm({
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

  test("'Lst.bind' function works.", () => {
    
    expect(
      Lst(['test'])
        .bind(x => Just(x.toUpperCase()))
        .get()
    ).toEqual(['TEST']);

  });

  test("'Lst.ap' function works.", () => {

    expect(
      Lst([x => x.toUpperCase()])
        .ap(Just('test'))
        .get()
    ).toEqual(['TEST']);

  });

  test("'Lst.fork' function works.", () => {
      expect(
        Lst('test')
          .fork(
            x => x,
            x => x
          )
      ).toEqual(['test']);

  });

  test("'Lst.extend' function works.", () => {

      expect(
        Lst(['test'])
          .extend(x => Just(x))
          .type()
      ).toBe("Just");

  });

  test("'type' function works.", () => {
    expect(
      Lst(['test'])
        .type()
    ).toBe("Lst");
  });

}); // 'Gonad interface is implemented'



test('call', () => {
  let a = Kvm({
    "prop": "a"
  }).prop("prop").get()

  expect(a).toBe("a");
})