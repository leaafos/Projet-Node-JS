var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./Model./');

(async function() {

	const bijoux = await db.getAllbijoux()
	console.log(bijoux)
	// First, define our base classifier type (a multi-label classifier based on winnow):
	var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
		binaryClassifierType: limdu.classifiers.Winnow.bind(0, {retrain_count: 10})
	});

	// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
	var WordExtractor = function(input, features) {
		input.split(" ").forEach(function(word) {
			features[word]=1;
		});
	};

	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifier = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifier.trainBatch([
		{input: "Je veux un collier", output: "colliers"},
		{input: "Collier", output: "colliers"},
		{input: "Des colliers svp", output: "colliers"},
		{input: "Une chaine", output: "colliers"},
		{input: "Des chaines", output: "colliers"},
		{input: "Serait-il possible d'avoir un collier ?", output: "colliers"},
		{input: "J'aimerais un collier'", output: "colliers"},
		{input: "Je souhaiterais un collier", output: "colliers"},
		{input: "Bijoux autour du cou", output: "colliers"},

		{input: "Je veux un bracelet", output: "bracelet"},
		{input: "bracelet", output: "bracelet"},
		{input: "Des bracelets svp", output: "bracelet"},
		{input: "Un bracelet", output: "bracelet"},
		{input: "Serait-il possible d'avoir un bracelet ?", output: "bracelet"},
		{input: "J'aimerais un bracelet'", output: "bracelet"},
		{input: "Je souhaiterais un bracelet", output: "bracelet"},
		{input: "Bijoux autour du poignet", output: "bracelet"},

		{input: "Je veux une bague", output: "bague"},
		{input: "bague", output: "bague"},
		{input: "Des bagues svp", output: "bague"},
		{input: "Une bague", output: "bague"},
		{input: "Serait-il possible d'avoir une bague ?", output: "bague"},
		{input: "J'aimerais une bague'", output: "bague"},
		{input: "Je souhaiterais une bague", output: "bague"},
		{input: "Bijoux autour du doigt", output: "bague"},
		{input: "Bague de mariage", output: "bague"},
		{input: "Bague de fiançaille", output: "bague"},
		{input: "Alliance", output: "bague"},
		{input: "Chevalière", output: "bague"},
		{input: "Accessoire de main", output: "bague"},
		{input: "Symbole d'engagement", output: "bague"},

		{input: "Je veux une Boucles d'oreille", output: "Boucles d'oreille"},
		{input: "Boucles d'oreille", output: "Boucles d'oreille"},
		{input: "Des Boucles d'oreille svp", output: "Boucles d'oreille"},
		{input: "Des Boucles d'oreille", output: "Boucles d'oreille"},
		{input: "Serait-il possible d'avoir des Boucles d'oreille ?", output: "Boucles d'oreille"},
		{input: "J'aimerais des Boucles d'oreille'", output: "Boucles d'oreille"},
		{input: "Je souhaiterais des Boucles d'oreille", output: "Boucles d'oreille"},
		{input: "Bijoux aux oreilles", output: "Boucles d'oreille"},

	]);


	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifierAccept = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifierAccept.trainBatch([
		{input: "Je veux bien cette boisson", output: "oui"},
		{input: "Donne moi !", output: "oui"},
		{input: "je prends", output: "oui"},
		{input: "ok", output: "oui"},
		{input: "je ne prends pas", output: "no"},
		{input: "Non c'est trop chère", output: "non"},
		{input: "Non je veux pas", output: "non"},
		{input: "Non sait pas !", output: "non"},
	]);


	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifierAccept = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifierAccept.trainBatch([
		{input: "Je veux bien cette boisson", output: "oui"},
		{input: "Donne moi !", output: "oui"},
		{input: "je prends", output: "oui"},
		{input: "ok", output: "oui"},
		{input: "je ne prends pas", output: "no"},
		{input: "Non c'est trop chère", output: "non"},
		{input: "Non je veux pas", output: "non"},
		{input: "Non sait pas !", output: "non"},
	]);


	console.log('Bonjour')
	const bijoux_want = prompt("Quelle catégorie de bijoux cherchez-vous (Bracelets, Colliers, Bagues, Boucles d'oreille, Priecings, Earcuffs) ?");
	predicted_response = intentClassifier.classify(bijoux_want);

	let current_bijoux = null
	// console.log('predicted_response', predicted_response)
	for (bijoux of bijoux) {
		if (bijoux.name == predicted_response[0]) {
			console.log("Voici nos ", bijoux['name'] /*ici afficher colliers */)
			current_bijoux = bijoux 
			break
		}
	}

	const yesno = prompt(`Souhaitez-vous payer votre ${current_boisson.name} ?`);
	predicted_response = intentClassifierAccept.classify(yesno);
	if (predicted_response[0] == 'non') {
		console.log('Merci et à la prochaine!')
	}

	if (predicted_response[0] == 'oui') {

		const want_qty = prompt(`Avez-vous besoin de combien de ${current_boisson.name} ?`);
		console.log(`Vous voulez ${Number(want_qty)} ${current_boisson.name}(s)`)
		boisson_from_db = await db.getbijouxById(current_boisson.id)
		if (boisson_from_db.quantity <= 0) {
			console.log(`Nous n'avons plus de ${boisson_from_db.name}!`)
		} else {
			db.updateBoisson(current_boisson.id, boisson_from_db.quantity - Number(want_qty))
			if (Number(want_qty) == 1) {
				console.log('Ok merci prennez votre boisson!')
			} else {
				console.log('Ok merci prennez vos bijoux!')
			}
		}
	}

})()