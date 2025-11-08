
// Status code constants for DRY code
const BAD_REQUEST_ERROR_CODE = 400;
const NOT_FOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const INTERNAL_SERVER_ERROR_CODE = 500;

const handleError = (err, res) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: err.message });
  }

  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND_ERROR_CODE).send({ message: "Document not found" });
  }

  if (err.name === "CastError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: "Invalid ID format" });
  }

  return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: "Internal server error" });
};


const handleUserError = (err, res) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: "Invalid user data provided" });
  }

  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR_CODE).send({ message: "User already exists" });
  }

  return handleError(err, res);
};

const handleItemError = (err, res) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: "Invalid clothing item data" });
  }

  return handleError(err, res);
};

module.exports = {
  handleError,
  handleUserError,
  handleItemError
};