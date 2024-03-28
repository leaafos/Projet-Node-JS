const limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const productDb = require('./db'); // Importez les fonctions CRUD de db.js
const { getAllProducts, createProduct, deleteProduct, updateProduct, getProductsByCategoryId  } = require ('./Models/productModel')

(async function() {
    // Utilisez la fonction getAllProducts de db.js pour récupérer tous les produits
    const products = await productDb.getAllProducts();
    console.log(products);

    // Définissez le classificateur de texte et l'extracteur de fonctionnalités
    var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
        binaryClassifierType: limdu.classifiers.Winnow.bind(0, { retrain_count: 10 })
    });

    var WordExtractor = function(input, features) {
        input.split(" ").forEach(function(word) {
            features[word]=1;
        });
    };

    // Initialisez le classificateur d'intention avec le type de classificateur de texte et l'extracteur de fonctionnalités
    var intentClassifier = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    // Entraînez le classificateur d'intention avec des exemples de phrases et de réponses attendues
    intentClassifier.trainBatch([
        { input: "Je veux acheter un produit", output: "achat" },
        // Ajoutez d'autres exemples d'entraînement ici...
    ]);

    // Initialisez le classificateur d'acceptation avec le type de classificateur de texte et l'extracteur de fonctionnalités
    var intentClassifierAccept = new limdu.classifiers.EnhancedClassifier({
        classifierType: TextClassifier,
        featureExtractor: WordExtractor
    });

    // Entraînez le classificateur d'acceptation avec des exemples de phrases et de réponses attendues
    intentClassifierAccept.trainBatch([
        { input: "Oui, je veux acheter", output: "oui" },
        // Ajoutez d'autres exemples d'entraînement ici...
    ]);

    console.log('Bonjour');
    const product_wanted = prompt("Pouvez-vous me dire le produit que vous souhaitez ? ");
    const predicted_response = intentClassifier.classify(product_wanted);

    let current_product = null;
    for (const product of products) {
        if (product.name == predicted_response[0]) {
            console.log("Le produit", product['name'], "coûte", product['price'], " EUR");
            current_product = product;
            break;
        }
    }

    const yesno = prompt(`Souhaitez-vous acheter votre ${current_product.name} ? (oui/non) `);
    const predicted_response_accept = intentClassifierAccept.classify(yesno);
    if (predicted_response_accept[0] == 'non') {
        console.log('Merci et à la prochaine!');
    }

    if (predicted_response_accept[0] == 'oui') {
        const quantity_needed = prompt(`De combien de ${current_product.name} avez-vous besoin ? `);
        console.log(`Vous voulez ${Number(quantity_needed)} ${current_product.name}(s)`);
        const product_from_db = await productDb.getProductById(current_product.id);
        if (product_from_db.quantity <= 0) {
            console.log(`Nous n'avons plus de ${product_from_db.name}!`);
        } else {
            await productDb.updateProduct(current_product.id, product_from_db.quantity - Number(quantity_needed));
            if (Number(quantity_needed) == 1) {
                console.log('Ok, merci, prenez votre produit!');
            } else {
                console.log('Ok, merci, prenez vos produits!');
            }
        }
    }
})();