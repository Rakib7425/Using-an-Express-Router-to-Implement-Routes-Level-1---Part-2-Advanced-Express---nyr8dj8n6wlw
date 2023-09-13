const fs = require("fs");
const express = require("express");
const router = express.Router();

//Including product.json file
const product = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/product.json`));

// Defining The Router
// Get all the products
router.get("/", (req, res) => {
	try {
		//Write your code here
		res.status(200).send({
			status: "success",
			results: product.length,
			data: {
				product,
			},
		});
	} catch (error) {
		res.status(400).json(error);
	}
});

async function saveDataToDatabase(data) {
	return new Promise((resolve, reject) => {
		const jsonData = JSON.stringify(data);

		fs.writeFile(`${__dirname}/../dev-data/product.json`, jsonData, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

//Create a new Product
router.post("/", (req, res) => {
	try {
		//Write your code here
		let newId = product[product.length - 1].id + 1;

		let { title, price } = req.body;
		// console.log(newId, lastProduct);

		const newProduct = {
			id: newId,
			title,
			price,
		};

		if (!title || !price) {
			res.status(404).send({
				message: "Title and price are required",
				status: "Error",
			});
		} else if (price && title) {
			product.push(newProduct);
			saveDataToDatabase(product);

			res.status(200).send({
				status: "success",
				data: {
					product: newProduct,
				},
			});
		}
	} catch (error) {
		res.status(400).send({
			message: "Error creating product",
			status: "Error",
		});
	}
});




module.exports = router;
