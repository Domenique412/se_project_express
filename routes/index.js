const router = require("express").Router();
const clothingItem = require("./clothingItem");
const userRouter = require("./users");
const { createUser, userLogin } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use("/items", clothingItem);
router.use("/users", auth, userRouter);

router.post('/signin', userLogin);
router.post('/signup', createUser);

router.use((req, res) => {
  res.status(404).send({
    message: "Requested resource not found"
  });
});

module.exports = router;
