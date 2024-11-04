import sinon from "sinon";
import importCalc from "../calculator.js";

import testcases from "./testcases.json" with { type: "json" };

import { expect } from "chai";

const calculate = sinon.spy(importCalc);

const unitTest = test => {
	if (Array.isArray(test.testcases)) {
		describe(test.name, () => {
			for (let subTest of test.testcases) {
				for (let k of ["a", "b", "operator"]) {
					if (!subTest.data) subTest.data = {};
					if (!(k in subTest.data)) subTest.data[k] = test.data?.[k];
				}
				unitTest(subTest);
			}
		});
	}
	else it(test.name, () => {
		let { a, b, operator } = test.data;
		if (test.expects.error) expect(calculate.bind(this, a, b, operator)).to.throw(test.expects.result);
		else expect(calculate(a, b, operator)).to.equal(test.expects.result);
	})
}

unitTest({ name: "Calculator backend functionality", testcases });