const Router = require("express");
const router = Router();

const {
  register,
  login,
  getRegisteredUsers,
  deleteUser,
  getUserById,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getRegisteredUsers);
router.get("/users/:id", getUserById);
router.delete("/deleteUser/:id",deleteUser);

module.exports = router;
