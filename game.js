"use strict";

// document.querySelector("h1").textContent = "jovana";
// $("h1").text("jovana");

const gamePattern = [];
let userClickedPattern = [];

const ButtonColours = ["red", "blue", "green", "yellow"];

const audioBlue = new Audio("sounds/blue.mp3");
const audioGreen = new Audio("sounds/green.mp3");
const audioRed = new Audio("sounds/red.mp3");
const audioWrong = new Audio("sounds/wrong.mp3");
const audioYellow = new Audio("sounds/yellow.mp3");

const playAudio = function (str) {
  switch (str) {
    case "blue":
      audioBlue.play();
      break;
    case "green":
      audioGreen.play();
      break;
    case "red":
      audioRed.play();
      break;
    case "yellow":
      audioYellow.play();
      break;
    default:
      console.log("wrong input");
  }
};

const animatePress = function (currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

$(".btn").click(function (e) {
  let userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playAudio(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

const updateH1 = function (str) {
  $("h1").text(str);
};

let level = 0;
const nextSequence = function () {
  userClickedPattern = [];
  level++;
  updateH1(`Level ${level}`);

  let randomNum = Math.floor(Math.random() * ButtonColours.length);

  let randomChosenColour = ButtonColours[randomNum];

  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
  playAudio(randomChosenColour);
};

let gameStarted = false;
$(document).keypress(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
    updateH1(`Level ${level}`);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    currentLevel++;
    if (gamePattern.length === currentLevel) {
      setTimeout(nextSequence, 1000);
    }
  } else gameOver();
}

function gameOver() {
  audioWrong.play();
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 300);
  $("h1").text("Game over! Press any key to restart!");
  startOver();
}

function startOver() {
  level = 0;
  gamePattern.length = 0;
  gameStarted = false;
}
