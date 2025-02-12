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