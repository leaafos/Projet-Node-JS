// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createCustomer(id, FirstName, LastName, Email, Phone, Adress, Zipcode, Country) {
  return await knex('Customers').insert({ id, FirstName, LastName, Email, Phone, Adress, Zipcode, Country });
}

// Read
async function getAllCustomers() {
  return await knex.select().from('Customers');
}

async function getCustomerById(id) {
  return await knex('Customers').where({ id }).first();
}

// Update
async function updateCustomer(id, quantity) {
  return await knex('Customers').where({ id }).update({ quantity });
}

// Delete
async function deleteCustomer(id) {
  return await knex('Customers').where({ id }).del();
}

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};

// npm install knex sqlite3