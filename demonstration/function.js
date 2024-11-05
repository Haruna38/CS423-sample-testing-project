const mainFunc = function (call = false) {
	console.log(1);
	if (call) neverCalled();
}

const neverCalled = function () {
	console.log("Why are you here?");
}

mainFunc();