import { Person } from "../scripts/page";

describe("average person",() => {
	test("person to exist", () => {
		const p = new Person("karl", 33);
		expect(p.age).toBe(33);
		expect(p.name).toBe("karl");
	});
});