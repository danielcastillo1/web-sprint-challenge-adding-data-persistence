// build your `/api/resources` router here
const router = require("express").Router();
const Resource = require("./model");

router.get("/", async (req, res, next) => {
  try {
    const data = await Resource.getAll();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await Resource.addNew(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    customMessage:
      "something went wrong inside the Resources router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
