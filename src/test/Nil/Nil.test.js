import { Nil } from "../../Nil/factory.js";

test("'Nil' factory works.", () => {
	expect(Nil("missing").type()).toBe("Nil");
	expect(Nil("missing").extract()).toBe(null);
});

test("'Nil' forks with reason on left branch.", () => {
	const out = Nil("missing").fork(
		x => x,
		x => x
	);

	expect(out).toBe("");
});

test("'Nil' helper conversions work.", () => {
	const n = Nil("missing");
	expect(n.isNil()).toBe(true);
	expect(n.toMaybe().type()).toBe("Nothing");
	expect(
		n.toResult().fork(
			x => x,
			x => x
		)
	).toBe("");
});

test("'Nil' coercion works.", () => {
	const n = Nil("missing");
	expect(String(n)).toBe("");
	expect(`${n}`).toBe("");
});
