import { Result, Ok, Err } from "../../Result/factory.js";
import ResultClass from "../../Result/Result.js";

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
	expect(Ok("value")).toBeInstanceOf(ResultClass);
	expect(Err("problem")).toBeInstanceOf(ResultClass);

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
