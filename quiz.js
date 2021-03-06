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
	var answer  = this.checkInput("What would you like your answer to be?");
	this.quizQuestions.push(new Question(question, answer)); 
}

Quiz.prototype.checkInput = function(message) {
	var input = this.getInput(message);
	if (input  === "") {
		return this.checkInput(message);
	} else {
		return input;
	}
}

Quiz.prototype.mixQuestions = function() {
	var list = [];
	var quizCopy = this.quizQuestions;
	var length = quizCopy.length;
	while (list.length < length) {
		var currentLength = quizCopy.length;
		var index = Math.floor(Math.random() * currentLength);
		list.push(quizCopy[index]);
		quizCopy.splice(index,1);	
	}
	return list;
}

Quiz.prototype.askQuestions = function() {
	var mixedList = this.mixQuestions(this.quizQuestions);
	mixedList.forEach(function(currentQuestion) {
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

Quiz.prototype.endGame = function() {
	console.log("Thanks for playing!");
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
			this.menu();
			break;
		case "3":
			this.endGame();
			break;
		default:
			this.menu();
	}
}

var myQuiz = new Quiz;
myQuiz.startGame();
