// build your `/api/tasks` router here
const router = require("express").Router();
const Task = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const data = await Task.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await Task.addNew(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    customMessage:
      "something went wrong inside the Tasks router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
