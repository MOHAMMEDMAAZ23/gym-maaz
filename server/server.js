const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const routes = require("./routes");
const path = require("path"); 
require("./config");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
app.use("/api", routes);

app.listen(5000, () => console.log("Server running on port 5000"));
