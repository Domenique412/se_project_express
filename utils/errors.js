
const handleError = (err, res) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: "Document not found" });
  }

  if (err.name === "CastError") {
    return res.status(400).send({ message: "Invalid ID format" });
  }


  return res.status(500).send({ message: "Internal server error" });
};


const handleUserError = (err, res) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).send({ message: "Invalid user data provided" });
  }

  if (err.code === 11000) {
    return res.status(409).send({ message: "User already exists" });
  }

  return handleError(err, res);
};

const handleItemError = (err, res) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).send({ message: "Invalid clothing item data" });
  }

  return handleError(err, res);
};

module.exports = {
  handleError,
  handleUserError,
  handleItemError
};