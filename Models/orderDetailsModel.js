// db.js - Fichier pour gérer les opérations CRUD avec Knex

const knex = require('knex')(require('./knexfile')['development']);

// Create
async function createOrderDetails(id, quantity, OrderId, ProductId) {
  return await knex('OrderDetailss').insert({ id, quantity, OrderId, ProductId});
}

// Read
async function getAllOrderDetailss() {
  return await knex.select().from('OrderDetailss');
}

async function getOrderDetailsById(id) {
  return await knex('OrderDetailss').where({ id }).first();
}

// Update
async function updateOrderDetails(id, quantity) {
  return await knex('OrderDetailss').where({ id }).update({ quantity });
}

// Delete
async function deleteOrderDetails(id) {
  return await knex('OrderDetailss').where({ id }).del();
}

module.exports = {
  createOrderDetails,
  getAllOrderDetailss,
  getOrderDetailsById,
  updateOrderDetails,
  deleteOrderDetails
};

// npm install knex sqlite3