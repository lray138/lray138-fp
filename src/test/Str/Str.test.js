import {Str} from "../../Str/factory.js";

test("'Str' factory works.", () => {
  expect(Str('test').get()).toBe('test');
});

test("'map' function works (also checks proxy)", () => {
  expect(
    Str('test')
      .map(x => x.toUpperCase())
      .get()
    ).toBe('TEST');

});

test("'append' function works", () => {
  expect(
    Str('12')
      .append('34')
      .get()
  ).toBe('1234');
});

test("'prepend' function works", () => {
  expect(
    Str('12')
      .prepend('34')
      .get()
  ).toBe('3412');
});

test("'Str' coercion works for String and template literals.", () => {
  const s = Str('test');
  expect(String(s)).toBe('test');
  expect(`${s}`).toBe('test');
});


// lose in strict out
test("'eq' function works.", () => {
  expect(Str(1).eq("1").get()).toBe(true);
  expect(Str(1).eq(1).get()).toBe(false);
  expect(Str(1).eqg("1")).toBe(true);
});