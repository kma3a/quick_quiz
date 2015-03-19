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



var myScore = new ScoreKeeper;
myScore.rightAnswer();
console.log(myScore.currentScore === 10);
myScore.wrongAnswer();
console.log(myScore.currentScore === 0);

function Quiz(){
	this.currentScore = new ScoreKeeper;
	this.quizQuestions = [];
}
