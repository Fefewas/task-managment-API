const Router = require("express");
const router = Router();
const {
  getTasks,
  getTasksById,
  createTask,
  deleteTask,
  updateTask,
  searchByTitle,
} = require("../controllers/task.controller");

router.get("/tasks/", getTasks);
router.get("/tasks/:id", getTasksById);
router.get("/tasks/search/title", searchByTitle);
router.post("/tasks", createTask);
router.patch("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
