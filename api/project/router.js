// build your `/api/projects` router here
const router = require("express").Router();
const Project = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const data = await Project.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await Project.addNew(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    customMessage:
      "something went wrong inside the Projects router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
