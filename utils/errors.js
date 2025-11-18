

const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZED_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
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

  if (err.message === "Incorrect email or password") {
    return res.status(UNAUTHORIZED_ERROR_CODE).send({ message: "Incorrect email or password" });
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
  handleItemError,
  FORBIDDEN_ERROR_CODE,
};