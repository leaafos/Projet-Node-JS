var limdu = require('limdu');
const prompt = require("prompt-sync")({ sigint: true });
const db = require('./Models');

(async function() {

	const bijoux = await db.getAllProducts()
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

		{input: "Je veux un Piercing", output: "Piercing"},
		{input: "Piercings", output: "Piercing"},
		{input: "Des Piercings svp", output: "Piercing"},
		{input: "Des Piercigs", output: "Piercing"},
		{input: "Serait-il possible d'avoir des Pierecing ?", output: "Piercing"},
		{input: "J'aimerais des Piercing'", output: "Piercing"},
		{input: "Je souhaiterais des Piercings", output: "Piercing"},
		{input: "Bijoux aux oreilles", output: "Piercing"},

		{input: "Je veux un Earcuff", output: "Earcuff"},
		{input: "Earcuffs", output: "Earcuff"},
		{input: "Des Earcuffs svp", output: "Earcuff"},
		{input: "Des Earcufs", output: "Earcuff"},
		{input: "Serait-il possible d'avoir des Earccuffs ?", output: "Earcuff"},
		{input: "J'aimerais des Earccufs'", output: "Earcuff"},
		{input: "Je souhaiterais des Earcuffs", output: "Earcuff"},
		{input: "Bijoux aux oreilles", output: "Earcuff"},

	]);


	// Initialize a classifier with the base classifier type and the feature extractor:
	var intentClassifierProduct = new limdu.classifiers.EnhancedClassifier({
		classifierType: TextClassifier,
		featureExtractor: WordExtractor
	});

	// Train and test:
	intentClassifierProdcut.trainBatch([
		{input: "Puis-je commander ce magnifique collier en or, s'il vous plaît?", output: "Collier en Or"},
		{input: "Est-il possible de faire l'acquisition de ce splendide collier en or?", output: "Collier en Or"},
		{input: "Serait-il envisageable d'acheter ce superbe collier en or?", output: "Collier en Or"},
		{input: "Pourrais-je passer commande pour ce ravissant collier en or?", output: "Collier en Or"},
		{input: "J'aimerais acquérir ce collier en or, est-ce réalisable?", output: "Collier en Or"},
		{input: "Est-ce que je pourrais obtenir ce somptueux collier en or?", output: "Collier en Or"},
		{input: "Pourrais-je vous demander de m'envoyer ce collier en or?", output: "Collier en Or"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce collier en or?", output: "Collier en Or"},
		{input: "Je suis intéressé par ce collier en or, comment puis-je le commander?", output: "Collier en Or"},
		{input: "Est-il possible d'acheter ce superbe collier en or, s'il vous plaît?", output: "Collier en Or"},

		{input: "Puis-je commander ce magnifique collier en argent, s'il vous plaît?", output: "Collier en Argent"},
		{input: "Est-il possible de faire l'acquisition de ce splendide collier en argent?", output: "Collier en Argent"},
		{input: "Serait-il envisageable d'acheter ce superbe collier en argent?", output: "Collier en Argent"},
		{input: "Pourrais-je passer commande pour ce ravissant collier en argent?", output: "Collier en Argent"},
		{input: "J'aimerais acquérir ce collier en argent, est-ce réalisable?", output: "Collier en Argent"},
		{input: "Est-ce que je pourrais obtenir ce somptueux collier en argent?", output: "Collier en Argent"},
		{input: "Pourrais-je vous demander de m'envoyer ce collier en argent?", output: "Collier en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce collier en argent?", output: "Collier en Argent"},
		{input: "Je suis intéressé par ce collier en argent, comment puis-je le commander?", output: "Collier en Argent"},
		{input: "Est-il possible d'acheter ce superbe collier en argent, s'il vous plaît?", output: "Collier en Argent"},

		{input: "Puis-je commander ce magnifique collier en or blanc, s'il vous plaît?", output: "Collier en Or blanc"},
		{input: "Est-il possible de faire l'acquisition de ce splendide collier en or blanc?", output: "Collier en Or blanc"},
		{input: "Serait-il envisageable d'acheter ce superbe collier en or blanc?", output: "Collier en Or blanc"},
		{input: "Pourrais-je passer commande pour ce ravissant collier en or blanc?", output: "Collier en Or blanc"},
		{input: "J'aimerais acquérir ce collier en or blanc, est-ce réalisable?", output: "Collier en Or blanc"},
		{input: "Est-ce que je pourrais obtenir ce somptueux collier en or blanc?", output: "Collier en Or blanc"},
		{input: "Pourrais-je vous demander de m'envoyer ce collier en or blanc?", output: "Collier en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce collier en or blanc?", output: "Collier en Or blanc"},
		{input: "Je suis intéressé par ce collier en or blanc, comment puis-je le commander?", output: "Collier en Or blanc"},
		{input: "Est-il possible d'acheter ce superbe collier en or blanc, s'il vous plaît?", output: "Collier en Or blanc"},

		{input: "Puis-je commander ce magnifique bracelet en or, s'il vous plaît?", output: "Bracelet en Or"},
		{input: "Est-il possible de faire l'acquisition de ce splendide bracelet en or?", output: "Bracelet en Or"},
		{input: "Serait-il envisageable d'acheter ce superbe bracelet en or?", output: "Bracelet en Or"},
		{input: "Pourrais-je passer commande pour ce ravissant bracelet en or?", output: "Bracelet en Or"},
		{input: "J'aimerais acquérir ce bracelet en or, est-ce réalisable?", output: "Bracelet en Or"},
		{input: "Est-ce que je pourrais obtenir ce somptueux bracelet en or?", output: "Bracelet en Or"},
		{input: "Pourrais-je vous demander de m'envoyer ce bracelet en or?", output: "Bracelet en Or"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce bracelet en or?", output: "Bracelet en Or"},
		{input: "Je suis intéressé par ce bracelet en or, comment puis-je le commander?", output: "Bracelet en Or"},
		{input: "Est-il possible d'acheter ce superbe bracelet en or, s'il vous plaît?", output: "Bracelet en Or"},

		{input: "Puis-je commander ce magnifique bracelet en argent, s'il vous plaît?", output: "Bracelet en Argent"},
		{input: "Est-il possible de faire l'acquisition de ce splendide bracelet en argent?", output: "Bracelet en Argent"},
		{input: "Serait-il envisageable d'acheter ce superbe bracelet en argent?", output: "Bracelet en Argent"},
		{input: "Pourrais-je passer commande pour ce ravissant bracelet en argent?", output: "Bracelet en Argent"},
		{input: "J'aimerais acquérir ce bracelet en argent, est-ce réalisable?", output: "Bracelet en Argent"},
		{input: "Est-ce que je pourrais obtenir ce somptueux bracelet en argent?", output: "Bracelet en Argent"},
		{input: "Pourrais-je vous demander de m'envoyer ce bracelet en argent?", output: "Bracelet en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce bracelet en argent?", output: "Bracelet en Argent"},
		{input: "Je suis intéressé par ce bracelet en argent, comment puis-je le commander?", output: "Bracelet en Argent"},
		{input: "Est-il possible d'acheter ce superbe bracelet en argent, s'il vous plaît?", output: "Bracelet en Argent"},

		{input: "Puis-je commander ce magnifique bracelet en or blanc, s'il vous plaît?", output: "Bracelet en Or blanc"},
		{input: "Est-il possible de faire l'acquisition de ce splendide bracelet en or blanc?", output: "Bracelet en Or blanc"},
		{input: "Serait-il envisageable d'acheter ce superbe bracelet en or blanc?", output: "Bracelet en Or blanc"},
		{input: "Pourrais-je passer commande pour ce ravissant bracelet en or blanc?", output: "Bracelet en Or blanc"},
		{input: "J'aimerais acquérir ce bracelet en or blanc, est-ce réalisable?", output: "Bracelet en Or blanc"},
		{input: "Est-ce que je pourrais obtenir ce somptueux bracelet en or blanc?", output: "Bracelet en Or blanc"},
		{input: "Pourrais-je vous demander de m'envoyer ce bracelet en or blanc?", output: "Bracelet en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce bracelet en or blanc?", output: "Bracelet en Or blanc"},
		{input: "Je suis intéressé par ce bracelet en or blanc, comment puis-je le commander?", output: "Bracelet en Or blanc"},
		{input: "Est-il possible d'acheter ce superbe bracelet en or blanc, s'il vous plaît?", output: "Bracelet en Or blanc"},

		{input: "Puis-je commander ce magnifique bague en or, s'il vous plaît?", output: "Bague en Or"},
		{input: "Est-il possible de faire l'acquisition de ce splendide bague en or?", output: "Bague en Or"},
		{input: "Serait-il envisageable d'acheter ce superbe bague en or?", output: "Bague en Or"},
		{input: "Pourrais-je passer commande pour ce ravissant bague en or?", output: "Bague en Or"},
		{input: "J'aimerais acquérir ce bague en or, est-ce réalisable?", output: "Bague en Or"},
		{input: "Est-ce que je pourrais obtenir ce somptueux bague en or?", output: "Bague en Or"},
		{input: "Pourrais-je vous demander de m'envoyer ce bague en or?", output: "Bague en Or"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce bague en or?", output: "Bague en Or"},
		{input: "Je suis intéressé par ce bague en or, comment puis-je le commander?", output: "Bague en Or"},
		{input: "Est-il possible d'acheter ce superbe bague en or, s'il vous plaît?", output: "Bague en Or"},

		{input: "Puis-je commander ce magnifique bague en argent, s'il vous plaît?", output: "Bague en Argent"},
		{input: "Est-il possible de faire l'acquisition de ce splendide bague en argent?", output: "Bague en Argent"},
		{input: "Serait-il envisageable d'acheter ce superbe bague en argent?", output: "Bague en Argent"},
		{input: "Pourrais-je passer commande pour ce ravissant bague en argent?", output: "Bague en Argent"},
		{input: "J'aimerais acquérir ce bague en argent, est-ce réalisable?", output: "Bague en Argent"},
		{input: "Est-ce que je pourrais obtenir ce somptueux bague en argent?", output: "Bague en Argent"},
		{input: "Pourrais-je vous demander de m'envoyer ce bague en argent?", output: "Bague en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce bague en argent?", output: "Bague en Argent"},
		{input: "Je suis intéressé par ce bague en argent, comment puis-je le commander?", output: "Bague en Argent"},
		{input: "Est-il possible d'acheter ce superbe bague en argent, s'il vous plaît?", output: "Bague en Argent"},

		{input: "Puis-je commander ce magnifique bague en or blanc, s'il vous plaît?", output: "Bague en Or blanc"},
		{input: "Est-il possible de faire l'acquisition de ce splendide bague en or blanc?", output: "Bague en Or blanc"},
		{input: "Serait-il envisageable d'acheter ce superbe bague en or blanc?", output: "Bague en Or blanc"},
		{input: "Pourrais-je passer commande pour ce ravissant bague en or blanc?", output: "Bague en Or blanc"},
		{input: "J'aimerais acquérir ce bague en or blanc, est-ce réalisable?", output: "Bague en Or blanc"},
		{input: "Est-ce que je pourrais obtenir ce somptueux bague en or blanc?", output: "Bague en Or blanc"},
		{input: "Pourrais-je vous demander de m'envoyer ce bague en or blanc?", output: "Bague en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce bague en or blanc?", output: "Bague en Or blanc"},
		{input: "Je suis intéressé par ce bague en or blanc, comment puis-je le commander?", output: "Bague en Or blanc"},
		{input: "Est-il possible d'acheter ce superbe bague en or blanc, s'il vous plaît?", output: "Bague en Or blanc"},

		{input: "Puis-je commander ce magnifique boucles d'oreilles en or, s'il vous plaît?", output: "Boucles d'oreilles en Or"},
		{input: "Est-il possible de faire l'acquisition de ce splendide boucles d'oreilles en or?", output: "Boucles d'oreilles en Or"},
		{input: "Serait-il envisageable d'acheter ce superbe boucles d'oreilles en or?", output: "Boucles d'oreilles en Or"},
		{input: "Pourrais-je passer commande pour ce ravissant boucles d'oreilles en or?", output: "Boucles d'oreilles en Or"},
		{input: "J'aimerais acquérir ce boucles d'oreilles en or, est-ce réalisable?", output: "Boucles d'oreilles en Or"},
		{input: "Est-ce que je pourrais obtenir ce somptueux boucles d'oreilles en or?", output: "Boucles d'oreilles en Or"},
		{input: "Pourrais-je vous demander de m'envoyer ce boucles d'oreilles en or?", output: "Boucles d'oreilles en Or"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce boucles d'oreilles en or?", output: "Boucles d'oreilles en Or"},
		{input: "Je suis intéressé par ce boucles d'oreilles en or, comment puis-je le commander?", output: "Boucles d'oreilles en Or"},
		{input: "Est-il possible d'acheter ce superbe boucles d'oreilles en or, s'il vous plaît?", output: "Boucles d'oreilles en Or"},

		{input: "Puis-je commander ce magnifique boucles d'oreilles en argent, s'il vous plaît?", output: "Boucles d'oreilles en Argent"},
		{input: "Est-il possible de faire l'acquisition de ce splendide boucles d'oreilles en argent?", output: "Boucles d'oreilles en Argent"},
		{input: "Serait-il envisageable d'acheter ce superbe boucles d'oreilles en argent?", output: "Boucles d'oreilles en Argent"},
		{input: "Pourrais-je passer commande pour ce ravissant boucles d'oreilles en argent?", output: "Boucles d'oreilles en Argent"},
		{input: "J'aimerais acquérir ce boucles d'oreilles en argent, est-ce réalisable?", output: "Boucles d'oreilles en Argent"},
		{input: "Est-ce que je pourrais obtenir ce somptueux boucles d'oreilles en argent?", output: "Boucles d'oreilles en Argent"},
		{input: "Pourrais-je vous demander de m'envoyer ce boucles d'oreilles en argent?", output: "Boucles d'oreilles en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce boucles d'oreilles en argent?", output: "Boucles d'oreilles en Argent"},
		{input: "Je suis intéressé par ce boucles d'oreilles en argent, comment puis-je le commander?", output: "Boucles d'oreilles en Argent"},
		{input: "Est-il possible d'acheter ce superbe boucles d'oreilles en argent, s'il vous plaît?", output: "Boucles d'oreilles en Argent"},

		{input: "Puis-je commander ce magnifique boucles d'oreilles en or blanc, s'il vous plaît?", output: "Boucles d'oreilles en Or blanc"},
		{input: "Est-il possible de faire l'acquisition de ce splendide boucles d'oreilles en or blanc?", output: "Boucles d'oreilles en Or blanc"},
		{input: "Serait-il envisageable d'acheter ce superbe boucles d'oreilles en or blanc?", output: "Boucles d'oreilles en Or blanc"},
		{input: "Pourrais-je passer commande pour ce ravissant boucles d'oreilles en or blanc?", output: "Boucles d'oreilles en Or blanc"},
		{input: "J'aimerais acquérir ce boucles d'oreilles en or blanc, est-ce réalisable?", output: "Boucles d'oreilles en Or blanc"},
		{input: "Est-ce que je pourrais obtenir ce somptueux boucles d'oreilles en or blanc?", output: "Boucles d'oreilles en Or blanc"},
		{input: "Pourrais-je vous demander de m'envoyer ce boucles d'oreilles en or blanc?", output: "Boucles d'oreilles en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce boucles d'oreilles en or blanc?", output: "Boucles d'oreilles en Or blanc"},
		{input: "Je suis intéressé par ce boucles d'oreilles en or blanc, comment puis-je le commander?", output: "Boucles d'oreilles en Or blanc"},
		{input: "Est-il possible d'acheter ce superbe boucles d'oreilles en or blanc, s'il vous plaît?", output: "Boucles d'oreilles en Or blanc"},

		{input: "Puis-je commander ce magnifique piercing en or, s'il vous plaît?", output: "Piercing en Or"},
		{input: "Est-il possible de faire l'acquisition de ce splendide piercing en or?", output: "Piercing en Or"},
		{input: "Serait-il envisageable d'acheter ce superbe piercing en or?", output: "Piercing en Or"},
		{input: "Pourrais-je passer commande pour ce ravissant piercing en or?", output: "Piercing en Or"},
		{input: "J'aimerais acquérir ce piercing en or, est-ce réalisable?", output: "Piercing en Or"},
		{input: "Est-ce que je pourrais obtenir ce somptueux piercing en or?", output: "Piercing en Or"},
		{input: "Pourrais-je vous demander de m'envoyer ce piercing en or?", output: "Piercing en Or"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce piercing en or?", output: "Piercing en Or"},
		{input: "Je suis intéressé par ce piercing en or, comment puis-je le commander?", output: "Piercing en Or"},
		{input: "Est-il possible d'acheter ce superbe piercing en or, s'il vous plaît?", output: "Piercing en Or"},

		{input: "Puis-je commander ce magnifique piercing en argent, s'il vous plaît?", output: "Piercing en Argent"},
		{input: "Est-il possible de faire l'acquisition de ce splendide piercing en argent?", output: "Piercing en Argent"},
		{input: "Serait-il envisageable d'acheter ce superbe piercing en argent?", output: "Piercing en Argent"},
		{input: "Pourrais-je passer commande pour ce ravissant piercing en argent?", output: "Piercing en Argent"},
		{input: "J'aimerais acquérir ce piercing en argent, est-ce réalisable?", output: "Piercing en Argent"},
		{input: "Est-ce que je pourrais obtenir ce somptueux piercing en argent?", output: "Piercing en Argent"},
		{input: "Pourrais-je vous demander de m'envoyer ce piercing en argent?", output: "Piercing en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce piercing en argent?", output: "Piercing en Argent"},
		{input: "Je suis intéressé par ce piercing en argent, comment puis-je le commander?", output: "Piercing en Argent"},
		{input: "Est-il possible d'acheter ce superbe piercing en argent, s'il vous plaît?", output: "Piercing en Argent"},

		{input: "Puis-je commander ce magnifique piercing en or blanc, s'il vous plaît?", output: "Piercing en Or blanc"},
		{input: "Est-il possible de faire l'acquisition de ce splendide piercing en or blanc?", output: "Piercing en Or blanc"},
		{input: "Serait-il envisageable d'acheter ce superbe piercing en or blanc?", output: "Piercing en Or blanc"},
		{input: "Pourrais-je passer commande pour ce ravissant piercing en or blanc?", output: "Piercing en Or blanc"},
		{input: "J'aimerais acquérir ce piercing en or blanc, est-ce réalisable?", output: "Piercing en Or blanc"},
		{input: "Est-ce que je pourrais obtenir ce somptueux piercing en or blanc?", output: "Piercing en Or blanc"},
		{input: "Pourrais-je vous demander de m'envoyer ce piercing en or blanc?", output: "Piercing en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce piercing en or blanc?", output: "Piercing en Or blanc"},
		{input: "Je suis intéressé par ce piercing en or blanc, comment puis-je le commander?", output: "Piercing en Or blanc"},
		{input: "Est-il possible d'acheter ce superbe piercing en or blanc, s'il vous plaît?", output: "Piercing en Or blanc"},

		{input: "Puis-je commander ce magnifique earcuff en or, s'il vous plaît?", output: "Earcuff en Or"},
		{input: "Est-il possible de faire l'acquisition de ce splendide earcuff en or?", output: "Earcuff en Or"},
		{input: "Serait-il envisageable d'acheter ce superbe earcuff en or?", output: "Earcuff en Or"},
		{input: "Pourrais-je passer commande pour ce ravissant earcuff en or?", output: "Earcuff en Or"},
		{input: "J'aimerais acquérir ce earcuff en or, est-ce réalisable?", output: "Earcuff en Or"},
		{input: "Est-ce que je pourrais obtenir ce somptueux earcuff en or?", output: "Earcuff en Or"},
		{input: "Pourrais-je vous demander de m'envoyer ce earcuff en or?", output: "Earcuff en Or"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce earcuff en or?", output: "Earcuff en Or"},
		{input: "Je suis intéressé par ce earcuff en or, comment puis-je le commander?", output: "Earcuff en Or"},
		{input: "Est-il possible d'acheter ce superbe earcuff en or, s'il vous plaît?", output: "Earcuff en Or"},

		{input: "Puis-je commander ce magnifique earcuff en argent, s'il vous plaît?", output: "Earcuff en Argent"},
		{input: "Est-il possible de faire l'acquisition de ce splendide earcuff en argent?", output: "Earcuff en Argent"},
		{input: "Serait-il envisageable d'acheter ce superbe earcuff en argent?", output: "Earcuff en Argent"},
		{input: "Pourrais-je passer commande pour ce ravissant earcuff en argent?", output: "Earcuff en Argent"},
		{input: "J'aimerais acquérir ce earcuff en argent, est-ce réalisable?", output: "Earcuff en Argent"},
		{input: "Est-ce que je pourrais obtenir ce somptueux earcuff en argent?", output: "Earcuff en Argent"},
		{input: "Pourrais-je vous demander de m'envoyer ce earcuff en argent?", output: "Earcuff en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce earcuff en argent?", output: "Earcuff en Argent"},
		{input: "Je suis intéressé par ce earcuff en argent, comment puis-je le commander?", output: "Earcuff en Argent"},
		{input: "Est-il possible d'acheter ce superbe earcuff en argent, s'il vous plaît?", output: "Earcuff en Argent"},

		{input: "Puis-je commander ce magnifique earcuff en or blanc, s'il vous plaît?", output: "Earcuff en Or blanc"},
		{input: "Est-il possible de faire l'acquisition de ce splendide earcuff en or blanc?", output: "Earcuff en Or blanc"},
		{input: "Serait-il envisageable d'acheter ce superbe earcuff en or blanc?", output: "Earcuff en Or blanc"},
		{input: "Pourrais-je passer commande pour ce ravissant earcuff en or blanc?", output: "Earcuff en Or blanc"},
		{input: "J'aimerais acquérir ce earcuff en or blanc, est-ce réalisable?", output: "Earcuff en Or blanc"},
		{input: "Est-ce que je pourrais obtenir ce somptueux earcuff en or blanc?", output: "Earcuff en Or blanc"},
		{input: "Pourrais-je vous demander de m'envoyer ce earcuff en or blanc?", output: "Earcuff en Argent"},
		{input: "S'il vous plaît, pourriez-vous me permettre de commander ce earcuff en or blanc?", output: "Earcuff en Or blanc"},
		{input: "Je suis intéressé par ce earcuff en or blanc, comment puis-je le commander?", output: "Earcuff en Or blanc"},
		{input: "Est-il possible d'acheter ce superbe earcuff en or blanc, s'il vous plaît?", output: "Earcuff en Or blanc"},
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
	console.log('Vous voulez :', predicted_response)
	for (bijou of bijoux) {
		if (bijoux.name == predicted_response[0]) {
			console.log("Voici nos ", {bijoux}/*ici afficher colliers */)
			current_bijoux = bijou 
			break
		}
	}

	const product_want = prompt("Voici trois ${current.bijoux}, lequel voulez-vous"+ colliers);
	predicted_response_product = intentClassifierProduct.classify(product_want);

	let current_product = null
	// console.log('predicted_response', predicted_response)
	for (bijoux of bijoux) {
		if (product.name == predicted_response[0]) {
			console.log("Voici nos ", product['name'])//Afficher les collier 
			current_product = product
			break
		}
	} 
	//Voici trois propositions choissisez celle qui vous plait 

	const want_qty = prompt(`Combien de ${current_product.name} voulez-vous ?`);
		console.log(`Vous voulez ${Number(want_qty)} ${current_product.name}(s)`)
		products_from_db = await db.getProductById(current_product.id)
		if (product_from_db.quantity <= 0) {
			console.log(`Nous n'avons plus de ${product_from_db.name}!`)
		} else {
			if (Number(want_qty) == 1) {
				console.log('Ok merci prennez votre bijou!')
			} else {
				console.log('Ok merci prennez vos bijoux!')
			}
		}
	
	const yesno = prompt(`Souhaitez-vous payer votre ${current_product.name} ?`);
	predicted_response = intentClassifierAccept.classify(yesno);
	if (predicted_response[0] == 'non') {
		console.log('Merci et à la prochaine!')
	}
	if (predicted_response[0] == 'oui') {
		console.log('Merci pour votre achat !')
		db.updateProduct(current_product.id, product_from_db.quantity - Number(want_qty))
		// création de numéro de commande 
		//Afficher le numéro de commande 
	}
})
