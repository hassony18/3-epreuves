
document.getElementById("celebration").style.display = "none" // ne pas afficher le div de celebration
document.getElementById("typing-game").style.display = "none" // ne pas afficher le div de "typing-game"
document.getElementById("maths-game").style.display = "none" // ne pas afficher le div de maths
document.getElementById("countries-game").style.display = "none" // ne pas afficher le div de drapeaux

function startGame(difficulty) { // lancer le jeu
	document.getElementById("homepage").style.display = "none" // faire disparaitre l'écran d'acceuil
	document.getElementById("typing-game").style.display = "block" // afficher le "typing-game"
	document.getElementById("quoteInput").focus() // cliquer dans le text-area
	renderNewQuote(difficulty) // appeler la fonction qui lance le jeu "typing-game"
}
