const handleError = (err, res) => {
  if (err.status) {
    res.status(err.status).json({ error: err.error });
  } else {
    res.status(500).json({ error: "An error occurred" }).send(err);
  }
};

module.exports = handleError;
