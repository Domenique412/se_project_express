const express = require('express');

const app = express();

const { PORT = 3001 } = process.env;
const yes = {};

app.listen(PORT, () => {
  console.log(`listeing on port ${PORT}`)
});

