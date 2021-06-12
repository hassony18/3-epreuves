

var mathsGameDifficulty = "normal"

//créé les variables communes à tous les tests
var solution = null
var solution1 = null
var solution2 = null
var timer = null;


///récupère la difficulté sélectionnée
function runMathsGame(difficulty) {
	if (difficulty) {
		document.getElementById("maths-game").style.display = "block"
		document.getElementById("countries-game").style.display = "none"
		mathsGameDifficulty = difficulty
	}
	math()
}

//lance le jeu lié à la difficulté
function math(){
	if (mathsGameDifficulty== "easy") {
		math1();
		///met le bouton qui lance la fonction de recherche de réponse
		document.getElementById("bouton").innerHTML= '<button type="button" value="rendre" onclick="findSolution1()"><span><h3>Rendre</h3></span></button>'
	}
	else if (mathsGameDifficulty== "normal"){
		math2();
		document.getElementById("bouton").innerHTML= '<button type="button" value="rendre" onclick="findSolution2()"><span><h3>Rendre</h3></span></button>'
	}
	else if (mathsGameDifficulty== "hard"){
		math3();
		document.getElementById("bouton").innerHTML= '<button type="button" value="rendre" onclick="findSolution3()"><span><h3>Rendre</h3></span></button>'
		document.getElementById("laFonction").innerHTML= '<section id="plot"><div id="myFunction"></div></section></div>'
	}
}


//-------------------------------------------------------------------------------------------

//équation quadratique
function math1(){
	//met la consigne
	document.getElementById("enoncer").innerHTML="S'il n'y a qu'une solution, ne remplissez que solution 1. S'il n'y a pas de solution, ne remplissez rien."
	//créé l'équation
	var a = Math.floor(Math.random() * 5) + 1;
	var b = Math.floor(Math.random() * 15) + 1;
	var c = Math.floor(Math.random() * 5) + 1;
	document.getElementById("fonc").innerHTML = a+"x<sup>2</sup> +"+b+"x +"+c+" = 0"
	//vérifie s'il y a une solution et lui donne une valeur
	var viete = (b**2) - (4*a*c)
	if (viete<0){
		solution = null
	}
	else if (viete==0) {
		solution = Math.round(-b/(2*a))
	}
	else {
		solution1 = Math.round((Math.sqrt(viete)-b)/(2*a))
		solution2 = Math.round((-Math.sqrt(viete)-b)/(2*a))
	}
}
function findSolution1(){
	//vérifie les réponses des élèves
	var solution_eleve1 = document.getElementById("solution1").value
	var solution_eleve2 = document.getElementById("solution2").value
	//vérifie chaque cas possible
	if (solution_eleve2 == "" && solution_eleve1 == "" ){
		if (Math.round(solution==null && solution1==null )){
			verifyMaths(true)
		}
		else {
			verifyMaths(false)
		}
	}
	else if (solution_eleve2 == "" && solution_eleve1 != "" ){
		if (Math.round(solution_eleve1==solution)){
			verifyMaths(true)
		}
		else {
			verifyMaths(false)
		}
	}
	else if (solution_eleve2 !="" && solution_eleve1 !="" ) {
		if (((Math.round(solution_eleve1) == solution1 || Math.round(solution_eleve1) == solution2)) && ((Math.round(solution_eleve2) == solution2 || Math.round(solution_eleve2) == solution1))  && Math.round(solution_eleve1) != Math.round(solution_eleve2)) {
			verifyMaths(true)
		}
		else {
			verifyMaths(false)
		}
	}
                
}

//--------------------------------------------------------------------------------
 //calcul de fonction 
function math2() {
   //créé la fonction
	var x_limit = Math.floor(Math.random() * 15) + 1;
	document.getElementById("enoncer").innerHTML="calcule lorsque x est égal à "+ x_limit+". En arrondissantt à l'entier"
	var a = Math.floor(Math.random() * 15) + 1;
	var b = Math.floor(Math.random() * 15) + 1;
	var c = Math.floor(Math.random() * 15) + 1;
	document.getElementById("fonc").innerHTML = a+"x<sup>2</sup> ÷ ("+b+"x + "+c+")"
	//trouve la solution
	solution = Math.round(a*x_limit**2/(b*x_limit+c))
}

function findSolution2(){
	//vérifie ce que l'élève a fait
	var solution_eleve1 = document.getElementById("solution1").value
	var solution_eleve2 = document.getElementById("solution2").value
		if (Math.round(solution_eleve1)==solution || Math.round(solution_eleve2)==solution ){
			verifyMaths(true)
		}
		else {
			verifyMaths(false)
		}
}

//                            TROUVER LA FONCTION    
//--------------------------------------------------------------------------------


var f = "x"
var color = "#000000"
function math3() {
	//créé la fonctionon à trouver
	document.getElementById("solution2").style.display = "none"
	document.getElementById("label_solution2").style.display = "none"
	var randomFunction = Math.floor(Math.random() * 3) + 1;
	if (randomFunction==1) {
		f="sin(x)"
	}
	else if (randomFunction==2){
		f="cos(x)"
	}
	else if (randomFunction==3){
		var a = Math.floor(Math.random() * 3) + 1;
		var b = Math.floor(Math.random() * 2);
		if(b==0 && a==1){
			f="x"
		}
		else if(b==0){
			f=a+"*x"
		}
		else if(a==1){
			f="x+"+b
		}
		else{
			f= a+"*x+"+b
		}
	}
	//affiche les consignes
	document.getElementById("enoncer").innerHTML="trouver la fonction avec x comme variable(ne mettez pas d'espace).<br>(*=multiplication;+=addition; il y a aussi des fonctions trigonométriques.)"
	plot(color)
}

function findSolution3(){
	//vérifie ce que l'élève a mit
	var solution_eleve1 = document.getElementById("solution1").value
	if (solution_eleve1== f ){
		verifyMaths(true)
	}
	else {
		verifyMaths(false)
	}
}

//afiche la fonction avec les paramêtre créé
var parameters = {
	target: '#myFunction',
	data: [{
		fn: 'sin(x)',
		color: "red"
	}],
	grid: true,
	yAxis: {domain: [-1, 1]},
	xAxis: {domain: [-1, 1]}
};

//fait changer la couleur toutes les secondes
function plot(color) {
	if (!color) {
		color = "#00ff00"
	}
	if (!timer) {
		timer = setInterval(rainbow, 1000);
	}
	parameters.data[0].fn = f;
	parameters.xAxis.domain = [-4, 4];
	parameters.yAxis.domain = [-2, 2];
	parameters.data[0].color = color;
	
	functionPlot(parameters);
}

function rainbow() {
	var randomColor = Math.floor(Math.random()*16777215).toString(16);
/*         console.log(randomColor) */
	plot("#"+randomColor)
}


//affiche l'animation de réussite
function verifyMaths(win) {
	if (win) {
		document.getElementById("maths-game").style.display = "none"
		document.getElementById("celebration").style.display = "block"
	} else {
		document.getElementById("resultMaths").innerHTML = "Mauvaise réponse!";
	}
}

