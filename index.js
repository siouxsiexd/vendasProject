const express = require("express");
const bodyParser = require("body-parser");

//const { Group } = require("./src/models");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//Group.create({ name: "Comidas" });

app.use(express.json());
app.use(require("./src/routes"));


app.listen(3000);
