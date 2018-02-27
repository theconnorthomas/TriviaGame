var time = 3;
var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;
var intervalId;
var currentQuestion;
var questions = [
    {
        question: "Which one is not an object oriented programming language?",
        answers: ["Java", "C#", "C++", "C"],
        correctAnswer: "C"
    },
    {
        question: "Which language is used for styling web pages?",
        answers: ["HTML", "JQuery", "CSS", "XML"],
        correctAnswer: "CSS"
    },
    {
        question: "There are ____ main components of object oriented programming.",
        answers: ["PHP", "Python", "Javascript", "All"],
        correctAnswer: "All"
    },
    {
        question: "Which language is used for web apps?",
        answers: ["PHP", "Python", "Javascript", "All"],
        correctAnswer: "All"
    },
    {
        question: "Which one is not an object oriented programming language?",
        answers: ["Java", "C#", "C++", "C"],
        correctAnswer: "C"
    }
];

$("#quiz").hide();

guess('#btn0');
guess('#btn1');
guess('#btn2');
guess('#btn3');

initialize();

function initialize() {
    $("#startBtn").on("click", function (e) {
       start();   
    })
}

function start() {
        $("#startBtn").hide();
        $("#quiz").show();
        run();
        populateQuestion();   
}

function populateQuestion() {
    currentQuestion = questions[0];
    for (i = 0; i < 4; i++) {
        $("#questionText").text(currentQuestion.question);
        $("#btn" + i).text(currentQuestion.answers[i]);
    }
}

function guess(buttonId) {
    $(buttonId).on("click", function (e) {
        if (e.target.textContent === currentQuestion.correctAnswer) {
            correctAnswer();
        }
        else {
            incorrectAnswer();
        }
    });
}

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(countdown, 1000);
}

function countdown() {

    time--;

    $("#countdownTimer").html("<h2>" + "Time Remaining: " + time + " Seconds" + "</h2>");

    if (time === 0) {

        timesUp();

        $("#message").html("<h2>Times up!</h2>");

    }
}

function timesUp() {

    unanswered++;
    console.log(unanswered);
    clearInterval(intervalId);

}

function correctAnswer() {

    $("#message").html("<h2>Correct!</h2>");

    correctAnswers++;
    clearInterval(intervalId);
}

function incorrectAnswer() {

    $("#message").html("<h2>Wrong!</h2>");

    incorrectAnswers++;
    clearInterval(intervalId);
}

