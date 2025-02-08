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

test("handles chaning proxied methods is returned when mapping", () => {
  expect(
    Str('test')
      .map(x => x)
      .toUpperCase()
      .toLowerCase()
      .get()
    ).toBe('test');
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

