const isPositive = function (x) {
	if (x > 0) return true;
	else return false;
}

const isNegative = function (x) {
	if (x < 0) return true;
	else return false;
}

const isZero = function (x) {
	if (x > 0) return false;
	else if (x < 0) return false;
	else return false;
};

const validNumber = function (x) {
	return !isNaN(x);
}

// introduction + lines
// console.log(isPositive(1));

// functions
// console.log(isPositive(1));
// console.log(isNegative(1));
// console.log(isZero(1));
// console.log(validNumber(10));

// branches
// console.log(isPositive(1));
// console.log(isPositive(0));
// console.log(isNegative(-1));
// console.log(isNegative(0));
// console.log(isZero(0));
// console.log(isZero(-1));
// console.log(isZero(1));

// statements
// console.log(isPositive(1));
// console.log(isPositive(0));
// console.log(isNegative(-1));
// console.log(isNegative(0));
// console.log(isZero(0));
// console.log(isZero(-1));
// console.log(isZero(1));
// console.log(validNumber(NaN));
