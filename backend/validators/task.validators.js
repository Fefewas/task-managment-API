const validateTask = (req) => {
  const { title, desc, status, highlighted } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    throw { status: 400, error: "title fields is invalid" };
  }
  if (typeof desc !== "string" || desc.trim() === "") {
    throw { status: 400, error: "desc fields is invalid" };
  }
  return { title, desc, status, highlighted };
};

module.exports = validateTask