const validate = function (val, message) {
	// missing input validation
	if (val == null || val === "") throw `${message} is required.`;

	// if number is a string, check before converting to number
	if ("string" === typeof val) {
		// if (!val.match(/^(\+|\-){0,1}\d*(\d\.{0,1}|\.\d)\d*$/)) throw `${message} has invalid format.`;
		val = +val;
	}

	if ("number" !== typeof val || isNaN(val)) throw `${message} is invalid.`;
	
	if (val === Infinity) throw `${message} is too large!`;

	return val;
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
			if (b === 0) throw "Division by zero detected!";
			result = a / b;
			break;
		default:
			throw "Invalid operator.";
	}

	if (result === Infinity) throw "Result is too large!";
	return result;
}

export default calculate;
