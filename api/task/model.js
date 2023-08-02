// build your `Task` model here
const db = require("../../data/dbConfig");
const xModel = "tasks";

async function getAll() {
  const data = await db(`${xModel}`)
    .leftJoin(
      "projects as p",
      "tasks.project_id",
      "p.project_id"
    )
    .select(
      "tasks.task_id",
      "tasks.task_description",
      "tasks.task_notes",
      "tasks.task_completed",
      "p.project_name",
      "p.project_description"
    );

  data.map((element) => {
    if (element.task_completed === 1) {
      element.task_completed = true;
    } else {
      element.task_completed = false;
    }
  });

  return data;
}

async function getById(id) {
  const itemById = await db(`${xModel}`)
    .where("task_id", id)
    .first();

  if (itemById.task_completed === 1) {
    itemById.task_completed = true;
  } else {
    itemById.task_completed = false;
  }

  return itemById;
}

async function addNew(newData) {
  const id = await db(`${xModel}`).insert(newData);

  return getById(id);
}

module.exports = {
  getAll,
  addNew,
  getById,
};
