const express = require("express");
const app = express();
const path = require("path");
const gameRoutes = require("./routes/game");

app.listen(process.env.PORT ||3000 ,()=>{
  console.log("server is run at http://localhost:3000")
});

app.use(express.static(
  path.join(__dirname,"public"),
))

gameRoutes(app);