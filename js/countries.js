var scoreToWinCountries = 5  // score nécessaire pour gagner le jeu de drapeaux
var countriesGameDifficulty = "normal"; // la difficulté du jeu de drapeaux

var scoreCountries = 0; // score actuel du joueur
var correctCountry = null; // pays actuel (dont le drapeau est affiché)
function runCountriesGame(difficulty) { // lancer le jeu
	// modifier le score à atteindre pour gagner selon chaque difficulté
	if (difficulty) {
		document.getElementById("countries-game").style.display = "block"
		document.getElementById("typing-game").style.display = "none"
		countriesGameDifficulty = difficulty
	}
	if (countriesGameDifficulty == "easy") {
		scoreToWinCountries = 2
	}
	else if (countriesGameDifficulty == "hard") {
		scoreToWinCountries = 8
	}
	var randomKey = getRandomCountryKey() // un nombre aléatoire dans la liste de pays
	correctCountry = countriesList[randomKey]["name"]; // on cherche le nom du pays à partir du nombre aléatoire trouvé auparavant
	document.getElementById("countryFlag").src = "./style/images/"+countriesList[randomKey]["alpha2"]+".png"; // afficher le pays cible.
	var randomOption = getRandomInteger(1, 5) // choisis un nombre entre 1 et 4
	// générer aléatoirement les positions des boutons
	var listToUpdate = [1, 2, 3, 4] //liste qui va pouvoir être modifiée pour selectionner la position de la réponse
	for( var i = 0; i < listToUpdate.length; i++){  // boucle 
		if ( listToUpdate[i] === randomOption) {  // if statement
			listToUpdate.splice(i, 1);  // splice 
		}
	}
	document.getElementById("option" + randomOption ).innerHTML = correctCountry;
	for (var key in listToUpdate) {
		var randomShit = getRandomCountryKey()
		document.getElementById("option" + listToUpdate[key] ).innerHTML = countriesList[randomShit]["name"];
	}
}
function verify(element) { // appelé en choissisant un pays.
	var value = element.innerHTML
	if (value == correctCountry) { // si la bonne réponse, rajouter un point et relancer le jeu
			scoreCountries++
			if (scoreCountries >= scoreToWinCountries) {
				runMathsGame(countriesGameDifficulty)
			} else {
				runCountriesGame()
			}
	} else { // si mauvaise réponse, enlever un point.
			scoreCountries--
	}
	document.getElementById("result").innerHTML = "Score: "+scoreCountries+" ("+ (scoreToWinCountries-scoreCountries) +" points pour passer au test suivant)"; // afficher le score
}
function getRandomCountryKey() {
        var keys = countriesList.length
        var randomKey = getRandomInteger(1, keys)
        return randomKey
}
function getRandomInteger(min, max) { // trouver un nombre aléatoire entre 2 valeurs.
        return Math.floor(Math.random() * (max - min) ) + min;
}