import express from "express";
import path from "path";
import calculate from "./calculator.js";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 8000;
    
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/calculate", function (req, res) {
	let { a, b, operator } = req.query;
	
	let val;
	try {
		val = { success: true, message: calculate(a, b, operator) };
	}
	catch (e) {
		val = { success: false, message: e };
	}

	res.status(200).json(val);
});

app.all("*", (req, res) => res.status(404).send("Not found"));

app.listen(PORT, "0.0.0.0", () => console.log(`App started at http://localhost:${PORT}`));