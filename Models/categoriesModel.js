// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('../../knexfile')['development']);

// Create
async function createUser(name, email) {
  return await knex('users').insert({ name, email });
}

// Read
async function getAllUsers() {
  return await knex.select().from('users');
}

async function getUserById(id) {
  return await knex('users').where({ id }).first();
}

// Update
async function updateUser(id, newName, newEmail) {
  return await knex('users').where({ id }).update({ name: newName, email: newEmail });
}

// Delete
async function deleteUser(id) {
  return await knex('users').where({ id }).del();
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

// npm install knex sqlite3