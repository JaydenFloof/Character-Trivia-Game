var score = 0;
var mistakes = 0;
var api_url = "";
var holder; //To Hold The Data for API for all functions
var counter = 0;

async function get_stuff() {
  const response = await fetch(api_url);
  data = await response.json();
  holder = data;
  console.log("DATA has loaded! ");
  console.log(holder);
  document.getElementById("playButton").style = "display:all";
}

function myFunction() {
  console.log(holder[counter]);
  counter++;
}

get_stuff();

async function get_api() {
  if (data[counter] == data[data.length - 1]) {
    winScreen();
  } else if (mistakes == 3) {
    console.log("You lose!");
    loseScreen();
    return;
  }
  const ans1 = document.getElementById("answer1");
  const ans2 = document.getElementById("answer2");
  const ans3 = document.getElementById("answer3");
  const ans4 = document.getElementById("answer4");
  ans1.style = "display: none;";
  ans2.style = "display: none;";
  ans3.style = "display: none;";
  ans4.style = "display: none;";
  document.getElementById("miscTrait").style = "display:none";
  document.getElementById("characterImage").style = "display: none;";
  document.getElementById("characterImage").src = "";
  const personCard = document.createElement("div");
  const personCardAnime = document.createElement("div");
  const personCardWrong = document.createElement("div");
  const personCardTrait = document.createElement("div");
  personCard.innerHTML = data[counter]["rightAnswer"];
  personCardAnime.innerHTML = data[counter]["Anime"];
  personCardWrong.innerHTML = data[counter]["wrongAnswers"];
  document.getElementById("miscTrait").innerHTML = data[counter]["Trait"];
  let imageElement = document.getElementById("characterImage");
  imageElement.style = "display: all;";
  imageElement.src = data[counter]["Image"];
  personCard.appendChild(personCardAnime);
  personCard.appendChild(personCardWrong);
  personCard.appendChild(personCardTrait);
  ans1.style = "display: all;";
  ans2.style = "display: all;";
  ans3.style = "display: all;";
  ans4.style = "display: all;";
  document.getElementById("miscTrait").style = "display:all";
  counter += 1;
  getButtons(data);
  return data;
}

async function begin() {
  data = await get_api();
  document.getElementById("intro").style = "display:none";
  document.getElementById("score").style = "display: all;";
  document.getElementById("next").style = "display:none";
  document.getElementById("playButton").style.display = "none";
  document.getElementById("answer1").disabled = false;
  document.getElementById("answer2").disabled = false;
  document.getElementById("answer3").disabled = false;
  document.getElementById("answer4").disabled = false;
  clickButton();
}

function getButtons(data) {
  let allAnswers = data[counter - 1]["wrongAnswers"]
    .replace(/\"/gi, "")
    .split(",");
  let rightAnswer = data[counter - 1]["rightAnswer"];
  allAnswers.push(rightAnswer);
  //shuffles the answers to make them random
  let num = 3;
  for (let i = 1; i < 5; i++) {
    let choice = _.random(0, num);
    num = num - 1;
    let character = allAnswers[choice];
    let string = i.toString();
    document.getElementById("answer" + string).innerText = character;
    _.pull(allAnswers, character);
  }
}

function changeColour(green, red1, red2, red3) {
  document.getElementById(green).style.background = "#00FF00";
  document.getElementById(red1).style.background = "#FF3633";
  document.getElementById(red2).style.background = "#FF3633";
  document.getElementById(red3).style.background = "#FF3633";

  document.getElementById(green).style.color = "#000000";
  document.getElementById(red1).style.color = "#FAF0CA";
  document.getElementById(red2).style.color = "#FAF0CA";
  document.getElementById(red3).style.color = "#FAF0CA";
}

function clickButton() {
  document.getElementById("answer1").onclick = function () {
    play(data, 1);
  };
  document.getElementById("answer2").onclick = function () {
    play(data, 2);
  };
  document.getElementById("answer3").onclick = function () {
    play(data, 3);
  };
  document.getElementById("answer4").onclick = function () {
    play(data, 4);
  };
}

function play(data, ansNum) {
  document.getElementById("answer1").disabled = true;
  document.getElementById("answer2").disabled = true;
  document.getElementById("answer3").disabled = true;
  document.getElementById("answer4").disabled = true;
  let rightAnswer = data[counter - 1]["rightAnswer"];
  if (document.getElementById("answer1").textContent == rightAnswer) {
    changeColour("answer1", "answer2", "answer3", "answer4");
    if (ansNum == 1) {
      console.log("u did it");
      score++;
      document.getElementById("score").innerHTML = "Your Score:" + score;
      console.log(score);
    } else {
      mistakes++;
      console.log("WRONG");
    }
  }

  if (document.getElementById("answer2").textContent == rightAnswer) {
    changeColour("answer2", "answer1", "answer3", "answer4");
    if (ansNum == 2) {
      console.log("u did it");
      score++;
      document.getElementById("score").innerHTML = "Your Score:" + score;
      console.log(score);
    } else {
      mistakes++;
      console.log("WRONG");
    }
  }

  if (document.getElementById("answer3").textContent == rightAnswer) {
    changeColour("answer3", "answer1", "answer2", "answer4");
    if (ansNum == 3) {
      console.log("u did it");
      score++;
      document.getElementById("score").innerHTML = "Your Score:" + score;
      console.log(score);
    } else {
      mistakes++;
      console.log("WRONG");
    }
  }

  if (document.getElementById("answer4").textContent == rightAnswer) {
    changeColour("answer4", "answer2", "answer3", "answer1");
    if (ansNum == 4) {
      console.log("u did it");
      score++;
      document.getElementById("score").innerHTML = "Your Score:" + score;
      console.log(score);
    } else {
      mistakes++;
      console.log("WRONG");
    }
  }
  document.getElementById("next").style = "display:all";
}

function winScreen() {
  document.getElementById("congrats").innerHTML =
    "Congratulations, You Made It To The End! Your Score Was: " + score;
  document.getElementById("congrats").style = "display:all";
  document.getElementsByClassName("button").style = "display:none";
  document.getElementById("miscTrait").style = "display:none";
  document.getElementById("score").style = "display:none";
  document.getElementById("title").style = "display:none";
}

function loseScreen() {
  document.getElementById("congrats").innerHTML =
    "You made too many mistakes! ";
  document.getElementById("congrats").style = "display:all";
  document.getElementsByClassName("button").style = "display:none";
  document.getElementById("miscTrait").style = "display:none";
  document.getElementById("score").style = "display:none";
  document.getElementById("title").style = "display:none";
  document.getElementById("characterImage").style = "display:none";
  document.getElementById("answer1").style = "display:none";
  document.getElementById("answer2").style = "display:none";
  document.getElementById("answer3").style = "display:none";
  document.getElementById("answer4").style = "display:none";
}
