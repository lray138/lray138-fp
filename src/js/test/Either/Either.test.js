import {Either, Left, Right} from "../../Either/factory.js";

test("'Either' factory works.", () => {
  expect(Either('test').get()).toBe('test');
  expect(Either(null).type()).toBe('Left');
});
