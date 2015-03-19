var sget = require('sget');

function Question(question, answer) {
	this.question = question;
	this.answer = answer;
}

Question.prototype.displayQuestion = function() {
	return console.log(this.question);
}

Question.prototype.displayAnswer= function() {
	return this.answer;
}

Question.prototype.checkAnswer = function(userAnswer) {
	return this.answer === userAnswer;
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
	this.quizQuestions.push(new Question(question, answer)); 
}

Quiz.prototype.checkInput = function(message) {
	var input = this.getInput(message);
	if (input  === "") {
		return this.checkInputQuestion(message);
	} else {
		return input;
	}
}

Quiz.prototype.askQuestions = function() {
	this.quizQuestions.forEach(function(currentQuestion) {
		currentQuestion.displayQuestion();
		myQuiz.checkAnswer(currentQuestion);	
	})
	console.log("Your score was " + this.currentScore.score);
}

Quiz.prototype.checkAnswer = function(currentQuestion) {
	var userAnswer = this.getInput("your answer: ");
	var isCorrect = currentQuestion.checkAnswer(userAnswer);
	if (isCorrect) {
		this.currentScore.rightAnswer();
		console.log("You are right!");
	} else {
		this.currentScore.wrongAnswer();
		console.log("The correct answer was " + currentQuestion.displayAnswer());
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
			this.askQuestions();
			break;
		case "3":
			break;
		default:
			this.menu();
	}
}

var myQuiz = new Quiz;
myQuiz.startGame();
