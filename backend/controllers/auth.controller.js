const { ObjectId } = require("mongodb");  
const getColl = require("../middlewares/dbComunication");
const handleError = require("../middlewares/handleError");
const validateUser = require("../validators/user.validators");

const register = async (req, res) => {
  try {
    const user = validateUser(req);
    console.log(user);
    const result = await getColl("users").insertOne(user);
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    handleError(err);
  }
};
const login = (req, res) => res.send("login");

module.exports = { register, login };
