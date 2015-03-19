var sget = require('sget');

function Questions(question, answer) {
	this.question = question;
	this.answer = answer;
}

function ScoreKeeper() {
	this.score = 0;
}

ScoreKeeper.prototype.rightAnswer = function() {
	this.score += 10;
};

ScoreKeeper.prototype.wrongAnswer = function() {
	this.score -= 10;
};


function Quiz(){
	this.currentScore = new ScoreKeeper;
	this.quizQuestions = [];
}

Quiz.prototype.createQuestion = function() {
	var question = this.checkInput("What would you like your question to be?");
	var answer  = this.checkInput("What would you like your question to be?");
	this.quizQuestions.push(new Questions(question, answer)); 
}

Quiz.prototype.checkInput = function(message) {
	var input = this.getInput(message);
	if (input  === "") {
		return this.checkInputQuestion(message);
	} else {
		return input;
	}
}

Quiz.prototype.getInput = function(message) {
	return sget(message).trim().toUpperCase();
}

Quiz.prototype.startGame = function() {
	console.log("Hello welcome to the Quiz app");
	this.menu();
}

Quiz.prototype.menu = function() {
	console.log("1- create questions\n2- take quiz\n3- exit program");
	switch(this.getInput("What would you like to do?")) {
		case "1":
			this.createQuestion();
			this.menu();
			break;
		case "2":
			break;
		case "3":
			break;
		default:
			this.menu();
	}
}

var myQuiz = new Quiz;
myQuiz.startGame();
