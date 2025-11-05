const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("CONNECTED TO DB, ALL CLEAR");
  })
  .catch(console.error);

const routes = require("./routes");
app.use(express.json());
app.use(routes);
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
