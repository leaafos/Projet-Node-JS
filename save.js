// App.js - Utilisation des opérations CRUD avec Knex

const { getAllCategories, createCategory, deleteCategory, getCategoryById } = require('./Models/categoriesModel');
const { getAllProducts, createProduct, deleteProduct, updateProduct, getProductsByCategoryId  } = require ('./Models/productModel')
const { getAllStocks, createStock} = require('./Models/stocksModel');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  //Create
  /*
 await createCategory('Colliers');
  await createCategory('Bracelts');
  await createCategory( "Boucles d'oreilles");
  await createCategory( 'Bagues');
  await createCategory( 'Piercings');
  await createCategory( 'Earcuffs');
*/
//await createProduct("Earcuffs en Or", 40, 6, 10, "Joli Earcuffs en Or", 16);
  await createStock(2,10,"Collier en Argent")
    // Read
    //const categories = await getAllCategories()
    //console.log('Toutes les catégories :', categories, getCategoryById);

    //const gate = await getCategoryById(1)
    // console.log( await getProductsByCategoryId(1) );

    //const products = await getAllProducts();
    //console.log('Tous les produits :',  products);

    const stock = await getAllStocks();
    console.log('Tous le stock:',  stock);

  // // // Update
   //await updateProduct(12, "Boucles d'oreilles en Or blanc", 25, 4, "Jolies Boucles d'oreilles en Or blanc", 12);


  // // Read user by ID
  // const userById = await db.getUserById(1);
  // console.log('Utilisateur par ID :', userById);

  // // Delete
  //await deleteCategory(7);


      // Read
      //const allUsers2 = await db.getAllUsers();
      //console.log('Tous les utilisateurs :', allUsers2);
    
}

main().catch(err => console.error(err));
