const validate = function (val, message) {
	// missing input validation
	if (val == null || val === "") throw `${message} is required.`;

	// non-a-number sanity check
	if ("string" !== typeof val && "number" !== typeof val || isNaN(val)) throw `${message} is invalid.`;
	
	if ("number" === typeof val) {
		if (val === Infinity) throw `${message} is too large`;
		return val;
	}

	return +val;
}

const calculate = function (a, b, operator) {
	a = validate(a, "First number");
	b = validate(b, "Second number");
	let result;
	switch (operator) {
		case "add":
			result = a + b;
			break;
		case "subtract":
			result = a - b;
			break;
		case "multiply":
			result = a * b;
			break;
		case "divide":
			result = a / b;
			break;
		default:
			throw "Invalid operator";
	}

	if (result === Infinity) throw "Result is too large";
	return result;
}

module.exports = calculate;