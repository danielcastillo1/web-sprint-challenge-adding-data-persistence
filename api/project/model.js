// build your `Project` model here
const db = require("../../data/dbConfig");
const xModel = "projects";

async function getAll() {
  const data = await db(`${xModel}`);

  data.map((element) => {
    if (element.project_completed === 1) {
      element.project_completed = true;
    } else {
      element.project_completed = false;
    }
  });

  return data;
}

async function getById(id) {
  const itemById = await db(`${xModel}`)
    .where("project_id", id)
    .first();

  if (itemById.project_completed === 1) {
    itemById.project_completed = true;
  } else {
    itemById.project_completed = false;
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
