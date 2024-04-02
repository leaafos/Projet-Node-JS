// App.js - Utilisation des opérations CRUD avec Knex

const { getAllCategories, createCategory, deleteCategory, getCategoryById } = require('./categoriesModel');
const { getAllProducts, createProduct, deleteProduct, updateProduct, getProductsByCategoryId  } = require ('./productModel')
const { getAllStocks, createStock, deleteStock} = require('./Models/stocksModel');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  //Create
  /*
 await createCategory('Colliers');
  await createCategory('Bracelets');
  await createCategory( "Boucles d'oreilles");
  await createCategory( 'Bagues');
  await createCategory( 'Piercings');
  await createCategory( 'Earcuffs');
  
*/
//await deleteStock(3);
//await createProduct("Earcuffs en Or", 40, 6, 10, "Joli Earcuffs en Or", 16);
  //await createStock(2,80,"Collier en Argent")

  /*await createStock(3,100,"Collier en Or blanc")
  await createStock(4,90,"Bracelet en Or")
  await createStock(5,0,"Bracelet en Argent")
  await createStock(6,50,"Bracelet en Or blanc")
  await createStock(7,70,"Boucles d'oreilles en Or")
  await createStock(8,85,"Boucles d'oreilles en Argent")
  await createStock(9,70,"Boucles d'oreilles en Or blanc")
  await createStock(10,10,"Bagues en Or")
  await createStock(11,10,"Bagues en Argent")
  await createStock(13,10,"Bagues en Or blanc")
  await createStock(14,10,"Piercing en Or")
  await createStock(15,10,"Piercing en Argent")
  await createStock(16,10,"Piercing en Or blanc")
  await createStock(17,10,"Earcuff en Or")
  await createStock(18,10,"Earcuff en Argent")
  await createStock(19,10,"Earcuff en Or blanc")*/
    // Read
    //const categories = await getAllCategories()
    //console.log('Toutes les catégories :', categories, getCategoryById);

    //const gate = await getCategoryById(1)
    // console.log( await getProductsByCategoryId(1) );

    //const products = await getAllProducts();
    //console.log('Tous les produits :',  products);

    const stock = await getAllStocks();
    console.log('Tout le stock:',  stock);

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
