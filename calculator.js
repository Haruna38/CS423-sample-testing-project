import Decimal from "decimal.js";

const limit = new Decimal("1e100");
const precision_limit = new Decimal("1e-100");
const zero = new Decimal("0");

const validate = function (val, message) {
	// missing input validation
	if (val == null || val === "") throw `${message} is required.`;

	// only accept strings
	if ("string" !== typeof val) throw `${message} is invalid.`;

	// don't accept exponent or other base type
	if (!val.match(/^(\+|\-){0,1}\d*(\d\.{0,1}|\.\d)\d*$/)) throw `${message} has invalid format.`;

	val = new Decimal(val);

	if (val.isNaN()) throw `${message} has invalid format.`;
	
	if (val.gte(limit)) throw `${message} falls outside the allowed range (-10^100, 10^100)`;

	if (val.gt(zero) && val.lte(precision_limit)) return zero;

	return val;
}

const calculate = function (a, b, operator) {
	a = validate(a, "First number");
	b = validate(b, "Second number");
	let result;
	switch (operator) {
		case "add":
			result = a.plus(b);
			break;
		case "subtract":
			result = a.minus(b);
			break;
		case "multiply":
			result = a.times(b);
			break;
		case "divide":
			if (b.equals(zero)) throw "Division by zero detected!";
			result = a.dividedBy(b);
			break;
		case "":
		case null:
		case undefined:
			throw "Choose an operator.";
		default:
			throw "Invalid operator.";
	}

	if (result.gte(limit)) throw "Result falls outside the allowed range (-10^100, 10^100)";

	if (result.gt(0) && result.lte(precision_limit)) result = zero;

	return result.toFixed();
}

export default calculate;
