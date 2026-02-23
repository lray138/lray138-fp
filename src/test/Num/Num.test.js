import {Num} from "../../Num/factory.js";

test("'Num' factory works.", () => {
  expect(Num(1).get()).toBe(1);
  expect(Num("1").get()).toBe(1);
});

// test("'map' function works (also checks proxy)", () => {
//   expect(
//     Str('test')
//       .map(x => x.toUpperCase())
//       .get()
//     ).toBe('TEST');

// });

// test("'append' function works", () => {
//   expect(
//     Str('12')
//       .append('34')
//       .get()
//   ).toBe('1234');
// });

// test("'prepend' function works", () => {
//   expect(
//     Str('12')
//       .prepend('34')
//       .get()
//   ).toBe('3412');
// });

test("'eq' function works.", () => {
  expect(Num(1).eq(1).get()).toBe(true);
  expect(Num(1).eq("1").get()).toBe(false);
  expect(Num(1).eqg(1)).toBe(true);
});