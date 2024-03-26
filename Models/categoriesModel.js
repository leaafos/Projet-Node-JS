// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('../knexfile')['development']);

// Create
async function createCategory( CategoryName) {
  return await knex('Categories').insert({ CategoryName});
}

// Read
async function getAllCategories() {
  return await knex.select().from('Categories');
}

async function getCategoryById(id) {
  return await knex('Categories').where({ id }).first();
}

// Update
async function updateCategory(id, newName, newEmail) {
  return await knex('Categories').where({ id }).update({ name: newName, email: newEmail });
}

// Delete
async function deleteCategory(id) {
  return await knex('Categories').where({ id }).del();
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
};

// npm install knex sqlite3