const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));


app.listen(3000, () => {
  console.log("Student Portal running at http://localhost:3000");
});