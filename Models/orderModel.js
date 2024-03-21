// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createOrder(id, DateOrder, ProductId, CustomerId) {
  return await knex('Orders').insert({ id, DateOrder, ProductId, CustomerId });
}

// Read
async function getAllOrders() {
  return await knex.select().from('Orders');
}

async function getOrderById(id) {
  return await knex('Orders').where({ id }).first();
}

// Update
async function updateOrder(id, quantity) {
  return await knex('Orders').where({ id }).update({ quantity });
}

// Delete
async function deleteOrder(id) {
  return await knex('Orders').where({ id }).del();
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};

// npm install knex sqlite3