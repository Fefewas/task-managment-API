const { ObjectId } = require("mongodb");
const handleError = require("../middlewares/handleError");
const getColl = require("../middlewares/dbComunication");
const validateTask = require("../validators/task.validators");

const getTasks = async (req, res) => {
  try {
    const tasks = await getColl("tasks").find().toArray();
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    handleError(err, res);
  }
};

const getTasksById = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  try {
    const task = await getColl("tasks").findOne({ _id: new ObjectId(id) });
    if (!task) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(task);
  } catch (err) {
    console.log(err);
  }
};

const searchByTitle = async (req, res) => {
  try {
    const searchQuery = req.query.query;

    const result = await getColl("tasks")
      .find({
        $text: {
          $search: searchQuery,
          $caseSensitive: false,
          $diacriticSensitive: false,
        },
      })
      .project({ score: { $meta: "textScore" }, _id: 0 })
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    const array = await result.toArray();
    return res.status(200).json(array);
  } catch (err) {
    console.error(err);
    handleError(err, res);
  }
};

const createTask = async (req, res) => {
  try {
    const task = validateTask(req);
    if (!task.status) {
      task.status = "Pending";
    }
    if (!task.highlighted) {
      task.highlighted = false;
    }
    const result = await getColl("tasks").insertOne(task);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    handleError(err, res);
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const update = req.body;
  const result = await getColl("tasks").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: update }
  );
  if (result) {
    res.status(201).json(result);
  } else {
    console.error(err);
    handleError(err, res);
  }
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const result = await getColl("tasks").deleteOne({ _id: new ObjectId(id) });
    res.status(202).send("Succesfully removed");
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getTasks,
  getTasksById,
  createTask,
  updateTask,
  deleteTask,
  searchByTitle,
};
