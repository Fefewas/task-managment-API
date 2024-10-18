const validateUser = (req) => {
  const { email, password, username } = req.body;

  if (typeof password !== "string" || password.trim() === "") {
    throw { status: 400, error: "password fields is invalid" };
  }
  if (typeof username !== "string" || username.trim() === "") {
    throw { status: 400, error: "user fields is invalid" };
  }
  if (typeof email !== "string" || email.trim() === "") {
    throw { status: 400, error: "email fields is invalid" };
  }
  return { email, password, username };
};

module.exports = validateUser