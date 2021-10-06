"use strict";

window.addEventListener("DOMContentLoaded", start);

let currentColor = "#ffffff";

const partColor = {
  shoelaces: "#ffffff",
  plaque: "#ffffff",
  labels: "#ffffff",
  tongue: "#ffffff",
  eyestay: "#ffffff",
  collar: "#ffffff",
  heelcap: "#ffffff",
  quarter: "#ffffff",
  logo: "#ffffff",
  toevamp: "#ffffff",
  upper: "#ffffff",
  sole: "#ffffff",
};

//////////////////////////////////////////////
function start() {
  //fetch bucket cursor
  fetch("assets/bucket-cursor.svg")
    .then(function (res) {
      return res.text();
    })
    .then(function (data) {
      document.querySelector("#cursor").innerHTML = data;
    });

  //fetch shoes & buttons
  fetch("assets/shoe-cofigurator.svg")
    .then(function (res) {
      return res.text();
    })
    .then(function (data) {
      document.querySelector("#screen").innerHTML += data;
      selectButtons();
    });

  //check if is colors saving
}

/////////////////////////////////////////////////////////////
function selectButtons() {
  //add event listener click to the buckets
  document.querySelectorAll('g[data-name="btn-color"]').forEach((btn) => {
    btn.addEventListener("click", selectColor);
  });

  document.querySelector('g[data-color="#ffffff"]').removeEventListener("click", selectColor);
  document.querySelector("#colorSelector").addEventListener("input", pickColor);
  //selectig the shoes
  const parts = document.querySelectorAll("#shoes .cls-1");

  //applying the color in the diferent parts
  parts.forEach((part) => {
    part.addEventListener("click", getPartId);

    //reading x and y for cursor
    part.addEventListener("mousemove", cursorPosition);
    part.addEventListener("mouseout", () => {
      const cursor = document.querySelector("#cursor");
      cursor.style.display = `none`;
    });
  });
  //botton reset click
  document.querySelector("#reset").addEventListener("click", resetColors);

  //botton save click
  document.querySelector("#save").addEventListener("click", saveColors);

  if (localStorage.getItem("myShoesColors")) {
    getMyColors();
  }
}

///////////////////////////////////////////////////////
function selectColor(e) {
  // console.log(e.target.parentElement.dataset.color);
  currentColor = e.target.parentElement.dataset.color;
  document.querySelectorAll("#pocket .cls-21").forEach((paint) => {
    paint.style.fill = currentColor;
  });
  //set color in hover
  document.querySelector(":root").style.setProperty("--current-color", currentColor);
}

/////////////////////////////////////////////////////////////
function getPartId(e) {
  const section = this.id;
  applyColor(section, currentColor);
}

/////////////////////////////////////////////////////////
function applyColor(section, color) {
  document.querySelector(`#${section}`).style.fill = color;
  partColor[section] = color;
  document.querySelectorAll(".cls-20").forEach((part) => (part.style.fill = partColor.eyestay));
}

//////////////////////////////////////////////////
function resetColors() {
  //reset current color
  currentColor = "#ffffff";

  //reset values obj partColor
  for (let property in partColor) {
    partColor[property] = currentColor;
    applyColor(property, currentColor);
  }

  //paint cursor in white
  document.querySelectorAll("#pocket .cls-21").forEach((paint) => {
    paint.style.fill = currentColor;
  });

  //css :root current color white
  document.querySelector(":root").style.setProperty("--current-color", currentColor);
}

//////////////////////////////////////////////////
function saveColors() {
  localStorage.setItem("myShoesColors", JSON.stringify(partColor));
  alert("Your selection is save");
}

////////////////////////////////////////////////
function getMyColors() {
  const myShoesColors = JSON.parse(localStorage.getItem("myShoesColors"));
  const colorProperties = Object.keys(partColor);
  colorProperties.forEach((key) => {
    partColor[key] = myShoesColors[key];
    applyColor(key, partColor[key]);
  });
}

////////////////////////////////////////////
function cursorPosition(e) {
  const cursor = document.querySelector("#cursor");
  cursor.style.display = `block`;
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
}

function pickColor(e) {}
