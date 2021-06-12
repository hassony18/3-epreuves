//Les variables qui contient les informations suivantes:
var scoreToWinTyping = 3 // les points nécessaires pour gagner le jeu et entrer dans le prochain étape 
var tpyingGameTime = 60;// la limite du temps pour finir
var typingGameDifficulty = "normal";//le niveau de la difficulté 

const quoteAPI ="http://api.quotable.io/random"// lié avec un générateur pour les phrases aléatoire
const quoteDisplayElement = document.getElementById('quoteDisplay')//liée avec le Id quoteDisplay
const quoteInputElement = document.getElementById('quoteInput')//liée avec le Id quoteInput
var currentPhrase = null; //l'état de jeu à ce moment
var scoreTyping = 0; //les points à initial
var ourTimer = null; //le chronomètre à initial


//fonction pour trouver le phrase aléatoire
function getRandomQuote() {
	return fetch(quoteAPI)
		.then(response => response.json())
		.then(data => data.content)
}
//fonction pour initialiser le jeu selon les difficultés différent, chaque niveau correspond avec les données différents
async function renderNewQuote(difficulty){
	if (currentPhrase) {
		return false;
	}
	if (difficulty) {
		typingGameDifficulty = difficulty
	}
	if (typingGameDifficulty == "easy") {
		tpyingGameTime = 120
		scoreToWinTyping = 2
	}
	if (typingGameDifficulty == "hard") {
		tpyingGameTime = 30
		scoreToWinTyping = 5
	}
	const quote = await getRandomQuote()
	currentPhrase = quote
	quoteDisplayElement.innerHTML = ''
	// séparation de chaque charactère dans les mots de la phrase
	quote.split('').forEach(character => {
		const characterSpan=document.createElement('span')
		characterSpan.innerText = character
		quoteDisplayElement.appendChild(characterSpan)
	})
	quoteInputElement.value = null
	//  le chronomètre se relance
	if (ourTimer) {
			clearInterval(ourTimer)
	}
	ourTimer = setInterval(countdown, 1000);      
}
//L'état du chromomètre lié avec l'état du jeu
function countdown() {
	if (!currentPhrase) {
		return false;
	}
	if (tpyingGameTime > 0) {
		tpyingGameTime--;
		isPlaying = true; //si le temps est plus grand que 0, le joueur est entrain de jouer
	} 
	else if (tpyingGameTime == 0) {
		isPlaying = false;
		clearInterval(ourTimer)
		checkStatus() //si le temps arrive à 0, le joueur arrète de jouer, et le chronomètre se relance
	}
	document.getElementById("time").innerHTML = "Temps restant<br>"+ tpyingGameTime + "s";
} //La presentation du temps 

// La fonction pour juger le processus du jeu
function checkStatus(win) {
	if (!currentPhrase) {
		return false
	}
	if (!isPlaying && tpyingGameTime === 0) {
		quoteDisplayElement.innerHTML = 'Perdu.';// quand le temps arrive à 0, le phrase se présent
		currentPhrase = null
		scoreTyping--; // et les points diminuent
		document.getElementById("score").innerHTML = "score<br>" + scoreTyping + " ("+(scoreToWinTyping-scoreTyping)+" score pour passer au test suivant)"// la partie de points indique les points à ce moment et combien des points il faut pour gagner
		setTimeout(function(){ renderNewQuote() }, 3000); // l'étape du jeu actuel est relancé, une autre phrase est généré
	}
	else if (isPlaying && win) {
		quoteDisplayElement.innerHTML = 'Bien joué!';// quand on finit dans le limit du temps, le phrase se présent
		currentPhrase = null
		scoreTyping++;// et les points augmentent
		document.getElementById("score").innerHTML = "score<br>" + scoreTyping + " ("+(scoreToWinTyping-scoreTyping)+" score pour passer au test suivant)"
		if (scoreTyping >= scoreToWinTyping) {
			runCountriesGame(typingGameDifficulty) //si on gagne suffisament les points, le prochain jeu est lancé
		} else {
			setTimeout(function(){ renderNewQuote() }, 3000);// si non il se repète encore pour le jeu actuel
		}
	}
}

quoteInputElement.addEventListener('paste', e => e.preventDefault()); // éviter que les joueurs colle un texte 

quoteInputElement.addEventListener('input', () => {
	const arrayQuote = quoteDisplayElement.querySelectorAll('span')
	const arrayValue = quoteInputElement.value.split('')
	// Juger si les charactères se correspond selon le phrase aléatoire présenté
	let correct = true
	arrayQuote.forEach((characterSpan, index) => {
		const character = arrayValue[index]
		if (character == null) {
			characterSpan.classList.remove('correct')
			characterSpan.classList.remove('incorrect')
			correct = false
		} else if (character === characterSpan.innerText) {
			characterSpan.classList.add('correct')
			characterSpan.classList.remove('incorrect')
		} else {
			characterSpan.classList.remove('correct')
			characterSpan.classList.add('incorrect')
			correct = false
		}
	})
  
	if (correct) {
		checkStatus(true)
	} 
 
})