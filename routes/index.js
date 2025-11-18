const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { createUser, userLogin } = require("../controllers/users");
const auth = require("../middlewares/auth");
const NOT_FOUND_ERROR_CODE = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", auth, userRouter);

router.post('/signin', userLogin);
router.post('/signup', createUser);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({
    message: "Requested resource not found"
  });
});

module.exports = router;
