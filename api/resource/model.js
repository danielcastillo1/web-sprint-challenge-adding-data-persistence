// build your `Resource` model here
const db = require("../../data/dbConfig");
const xModel = "resources";

async function getAll() {
  const data = await db(`${xModel}`);

  return data;
}

async function getById(id) {
  const itemById = await db(`${xModel}`)
    .where("resource_id", id)
    .first();

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
