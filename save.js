// App.js - Utilisation des opérations CRUD avec Knex

const db = require('./Models/userModel');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  // Create
  // await db.createUser('Thomas', 'thomas@example.com');

    // Read
    const allUsers = await db.getAllUsers();
    console.log('Tous les utilisateurs :', allUsers);

  // // // Update
  // await db.updateUser(1, 'Jane Doe', 'jane@example.com');


  // // Read user by ID
  // const userById = await db.getUserById(1);
  // console.log('Utilisateur par ID :', userById);

  // // Delete
  await db.deleteUser(2);

      // Read
      const allUsers2 = await db.getAllUsers();
      console.log('Tous les utilisateurs :', allUsers2);
    
}

main().catch(err => console.error(err));
