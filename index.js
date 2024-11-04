const express = require("express");
const path = require("path");
const calculate = require("./calculator");

const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/calculate", function (req, res) {
	let { a, b, operator } = req.query;
	
	let val;
	try {
		val = { success: true, message: String(calculate(a, b, operator)) };
	}
	catch (e) {
		val = { success: false, message: e };
	}

	res.status(200).json(val);
});

app.all("*", (req, res) => res.status(404).send("Not found"));

app.listen(8000, "0.0.0.0", () => console.log("App started."));