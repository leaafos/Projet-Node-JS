const knex = require('knex')(require('./knexfile')['development']);

async function createTable() {
  try {
    let exists = await knex.schema.hasTable('Customers');
    if (!exists) {
      await knex.schema.createTable('Customers', table => {
        table.increments('Id').primary();
        table.string('FirstName');
        table.string('LastName');
        table.string('Email');
        table.integer('Phone');
        table.string('Adress');
        table.integer('Zipcode');
        table.string('Country');
        table.integer('OrderID');
      });
      console.log('La table "Customers" a été créée avec succès.');
    } else {
      console.log('La table "Customers" existe déjà.');
    }

    exists = await knex.schema.hasTable('Orders');
    if (!exists) {
      await knex.schema.createTable('Orders', table => {
        table.increments('Id').primary();
        table.integer('CustomerId');
        table.integer('ProductId');
        table.date('DateOrder'); /*à vérifier*/
      });
      console.log('La table "Orders" a été créée avec succès.');
    } else {
      console.log('La table "Orders" existe déjà.');
    }

    exists = await knex.schema.hasTable('Products');
    if (!exists) {
      await knex.schema.createTable('Products', table => {
        table.increments('Id').primary();
        table.string('ProductName');
        table.integer('Price');
        table.integer('CategoryId');
        table.integer('Weight');
        table.string('Description');
        table.integer('StockId');
      });
      console.log('La table "Products" a été créée avec succès.');
    } else {
      console.log('La table "Products" existe déjà.');
    }

    exists = await knex.schema.hasTable('Categories');
    if (!exists) {
      await knex.schema.createTable('Categories', table => {
        table.increments('Id').primary();
        table.string('CategoryName');
      });
      console.log('La table "Categories" a été créée avec succès.');
    } else {
      console.log('La table "Catagories" existe déjà.');
    }

    exists = await knex.schema.hasTable('OrderDetails');
    if (!exists) {
      await knex.schema.createTable('OrderDetails', table => {
        table.increments('Id').primary();
        table.integer('OrderID');
        table.integer('ProductId');
        table.integer('Quantity');
      });
      console.log('La table "OrderDetails" a été créée avec succès.');
    } else {
      console.log('La table "OrderDetails" existe déjà.');
    }

    exists = await knex.schema.hasTable('Stocks');
    if (!exists) {
      await knex.schema.createTable('Stocks', table => {
        table.increments('Id').primary();
        table.integer('ProductId');
        table.string('ProductName');
        table.integer('Quantity');
      });
      console.log('La table "Stocks" a été créée avec succès.');
    } else {
      console.log('La table "Stocks" existe déjà.');
    }

  } catch (error) {
    console.error('Erreur lors de la création de la table :', error);
  } finally {
    await knex.destroy();
  }
}

createTable();