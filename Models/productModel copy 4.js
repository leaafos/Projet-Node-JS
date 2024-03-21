// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createProduct(id, ProductName, Price, CategoryId, Weight, Description, StockId) {
  return await knex('Products').insert({ id, ProductName, Price, CategoryId, Weight, Description, StockId });
}

// Read
async function getAllProducts() {
  return await knex.select().from('Products');
}

async function getProductById(id) {
  return await knex('Products').where({ id }).first();
}

// Update
async function updateProduct(id, quantity) {
  return await knex('Products').where({ id }).update({ quantity });
}

// Delete
async function deleteProduct(id) {
  return await knex('Products').where({ id }).del();
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};

// npm install knex sqlite3