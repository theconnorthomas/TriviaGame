//global declarations
var time;
var x;
var correctAnswers;
var incorrectAnswers;
var unanswered;
var intervalId;
var currentQuestion;
var questions = [
    {
        question: "What is the surname given to bastards born in Dorne?",
        answers: ["rivers", "Stone", "Sand", "Waters"],
        correctAnswer: "Sand"
    },
    {
        question: "'The Mountain' is the nickname for which character?",
        answers: ["Gregor Clegane", "Sandor Clegane", "Gerold Clegane", "Oberyn Martell"],
        correctAnswer: "Gregor Clegane"
    },
    {
        question: "Who is Lord Commander of the Kingsguard at the beginning of Game of Thrones?",
        answers: ["Ser Jeor Mormont", "Ser Loras Tyrell", "Ser Barristan Selmy", "Ser Jaime Lannister"],
        correctAnswer: "Ser Barristan Selmy"
    },
    {
        question: "Who was Margaery Tyrell's first husband?",
        answers: ["Joffrey Baratheon", "Renly Baratheon", "Stannis Baratheon", "Tommen Baratheon"],
        correctAnswer: "Renly Baratheon"
    },
    {
        question: "Who is known as 'The-King-Beyond-the-Wall'?",
        answers: ["Mance Rayder", "Stannis Baratheon", "The Night King", "Tormund Giantsbane"],
        correctAnswer: "Mance Rayder"
    },
    {
        question: "How many times has Sansa Stark been married?",
        answers: ["Once", "Twice", "Three times", "None"],
        correctAnswer: "Twice"
    },
    {
        question: "Who is the ruler of the Iron Islands at the beginning of Game of Thrones?",
        answers: ["Aeron Greyjoy", "Balon Greyjoy", "Yara Greyjoy", "Euron Greyjoy"],
        correctAnswer: "Balon Greyjoy"
    },
    {
        question: "Who was the Mad King's firstborn son?",
        answers: ["Aemon Targaryen", "Aegon Targaryen", "Viserys Targaryen", "Rhaegar Targaryen"],
        correctAnswer: "Rhaegar Targaryen"
    },
    {
        question: "Who delivered the fatal blow to the King-in-the North, Robb Stark?",
        answers: ["Walder Frey", "Roose Bolton", "Alliser Thorne", "Ramsay Bolton"],
        correctAnswer: "Roose Bolton"
    },
    {
        question: "Grey Worm and Missandei became allies of Daenerys Targaryen after she liberated the slaves of which city?",
        answers: ["Yunkai", "Meereen", "Qarth", "Astapor"],
        correctAnswer: "Astapor"
    }
];

//on click listeners for the answer buttons.
guess('#btn0');
guess('#btn1');
guess('#btn2');
guess('#btn3');

initialize();

//setup function hides everthing but the start button and title text.
function initialize() {
    $("#title").show();
    $("#startBtn").show();
    $("#quiz").hide();
    $("#results").hide();
    correctAnswers = 0;
    incorrectAnswers = 0;
    unanswered = 0;
    x = 0;
    $("#startBtn").on("click", function (e) {
        start();
    })
}

//start is used to setup the gameplay. 
function start() {
    time = 31;
    $("#title").hide();
    $("#startBtn").hide();
    $("#gif").hide();
    $("#quiz").show();
    $("#countdownTimer").show();
    $("#subQuiz").show();
    $("#message").empty();
    countdown();
    run();
    populateQuestion();
    $("#progress").html("<p>" + "Question " + (x + 1) + " of 10" + "</p>");
}

//populates the four answer buttons from the current question.
function populateQuestion() {
    currentQuestion = questions[x];
    for (i = 0; i < 4; i++) {
        $("#questionText").text(currentQuestion.question);
        $("#btn" + i).text(currentQuestion.answers[i]);
    }
}

//this is the on click listener function for the four answer buttons.
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

//run is a 1 second set interval with a clear interval before it.
function run() {
    clearInterval(intervalId);
    intervalId = setInterval(countdown, 1000);
}

//countdown decrements time and sends it to the html. It also checks if the time runs out.
function countdown() {

    time--;

    $("#countdownTimer").html("<p>" + "Time Remaining: " + time + " Seconds" + "</p>");

    if (time === 0) {
        timesUp();
        $("#message").html("<p>Times up!</p>");

    }
}


function timesUp() {
    $("#message").html("<p>Times up!</p>");
    $("#countdownTimer").hide();
    $("#subQuiz").hide();
    $("#gif").show();
    $('#gif').attr('src', './assets/images/timeout' + (x + 1) + '.gif');
    unanswered++;
    x++;
    clearInterval(intervalId);
    if (x === 10) {
        setTimeout(function () { results(); }, 4000);
    }
    else {
        setTimeout(function () { start(); }, 3000);
    }

}

function correctAnswer() {

    $("#message").html("<p>Correct!</p>");
    $("#countdownTimer").hide();
    $("#subQuiz").hide();
    $("#gif").show();
    $('#gif').attr('src', './assets/images/right' + (x + 1) + '.gif');
    correctAnswers++;
    x++;
    clearInterval(intervalId);
    if (x === 10) {
        setTimeout(function () { results(); }, 4000);
    }
    else {
        setTimeout(function () { start(); }, 3000);
    }

}

function incorrectAnswer() {

    $("#message").html("<p>Wrong! The correct answer was " + currentQuestion.correctAnswer + "</p>");
    $("#countdownTimer").hide();
    $("#subQuiz").hide();
    $("#gif").show();
    $('#gif').attr('src', './assets/images/wrong' + (x + 1) + '.gif');
    incorrectAnswers++;
    x++;
    clearInterval(intervalId);
    if (x === 10) {
        setTimeout(function () { results(); }, 4000);
    }
    else {
        setTimeout(function () { start(); }, 3000);
    }

}

function results() {
    $("#quiz").hide();
    $("#right").html("<p>Questions you got right: " + correctAnswers + "</p>");
    $("#wrong").html("<p>Questions you got wrong: " + incorrectAnswers + "</p>");
    $("#timeout").html("<p>Questions you didn't answer: " + unanswered + "</p>");
    $("#results").show();
    setTimeout(function () { initialize(); }, 6000);
}

