const validateUser = (req) => {
  const { email, password, fullName } = req.body;

  if (typeof password !== "string" || password.trim() === "") {
    throw { status: 400, error: "Password fields is invalid" };
  }
  if (typeof fullName !== "string" || fullName.trim() === "") {
    throw { status: 400, error: "Password fields is invalid" };
  }
  if (typeof email !== "string" || email.trim() === "") {
    throw { status: 400, error: "Email fields is invalid" };
  }
  return { email, password, fullName };
};

module.exports = validateUser