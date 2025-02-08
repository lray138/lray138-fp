import {Maybe, Just, Nothing} from "../../Maybe/factory.js";

test("'Maybe' factory works.", () => {
  expect(Maybe('test').get()).toBe('test');
});

test("'Maybe' factory works #2", () => {
  expect(Maybe(null).type()).toBe('Nothing');
});