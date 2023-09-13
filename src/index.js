const express = require("express");
const app = express();

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const productRoute = require("./app");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Router Middlewares
app.use(express.json());
app.use("/api/v1/product", productRoute);

dotenv.config();

app.listen(3000, () => console.log("https://expert-dollop-wqq65gg94v7c94w-3000.app.github.dev/", "OR  3000"));
