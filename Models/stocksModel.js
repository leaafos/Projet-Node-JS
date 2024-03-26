// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('../knexfile')['development']);

// Create
async function createStock(id, ProductId, Quantity, ProductName) {
  return await knex('Stocks').insert({ id, ProductId, Quantity, ProductName });
}

// Read
async function getAllStocks() {
  return await knex.select().from('Stocks');
}

async function getStockById(id) {
  return await knex('Stocks').where({ id }).first();
}

// Update
async function updateStock(id, quantity) {
  return await knex('Stocks').where({ id }).update({ quantity });
}

// Delete
async function deleteStock(id) {
  return await knex('Stocks').where({ id }).del();
}

module.exports = {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock
};

// npm install knex sqlite3