
import {Maybe, Just, Nothing} from "../Maybe/factory.js";


test("'Maybe' factory works.", () => {

  expect(Maybe('test').get()).toBe('test');
  expect(Maybe(null).get()).toBe(null);

});


test("'Just' map function works.", () => {

  expect(
    Just('test')
      .map(x => x.toUpperCase())
      .get()
  ).toBe('TEST');

});