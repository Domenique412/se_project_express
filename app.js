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


app.use((req, res, next) => {
  req.user = {
    _id: '690b92d76eabf5f9429ba4ee'
  };
  next();
});

app.use(express.json());
app.use("/", indexRouter);



app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
