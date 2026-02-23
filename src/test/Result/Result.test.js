import { Result, Ok, Err } from "../../Result/factory.js";
import Either from "../../Either/Either.js";

test("'Result' factory returns Ok/Err semantics.", () => {
	expect(
		Result("value").fork(
			x => x,
			x => x
		)
	).toBe("value");

	expect(
		Result(null, "missing").fork(
			x => x,
			x => x
		)
	).toBe("missing");
});

test("'Ok' and 'Err' helpers work.", () => {
	expect(Ok("value")).toBeInstanceOf(Either);
	expect(Err("problem")).toBeInstanceOf(Either);

	expect(
		Ok("value").fork(
			x => x,
			x => x
		)
	).toBe("value");

	expect(
		Err("problem").fork(
			x => x,
			x => x
		)
	).toBe("problem");
});
