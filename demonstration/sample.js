const isPositive = function (x) { if (x > 0) return true; else return false; }

const isNegative = function (x) { if (x < 0) return true; else return false; }

const isZero = function (x) { if (x > 0) return false; else if (x < 0) return false; else return false; };

const validNumber = function (x) { return !isNaN(x); }

console.log(isPositive(1));
