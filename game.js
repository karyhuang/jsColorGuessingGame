// HARD-CODED VERSION
// var colors = [
//   "rgb(255, 0, 0)", // rgb(255,0,0) WON'T WORK! Space is important here
//   "rgb(255, 255, 0)",
//   "rgb(0, 255, 0)",
//   "rgb(0, 255, 255)",
//   "rgb(0, 0, 255)",
//   "rgb(255, 0, 255)",
// ]

var numSquares = 6;
// numSquares is a variable because it can be 3 or 6 depending on mode, and reset button is used for both, so can't be hard-coded

var colors = []; 
// since init() has reset() which will set all new colors, so we can just start with an empty array

var pickedColor; 

var squares = document.querySelectorAll(".square");

var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;

var message = document.querySelector("#message");

var h1 = document.querySelector("h1");

var resetBtn = document.querySelector("#reset");

// var easyBtn = document.querySelector("#easy");
// var hardBtn = document.querySelector("#hard");
var modeBtn = document.querySelectorAll(".mode");



// runs when the page loads
init();

function init() {
  setupModeBtns();
  setupSquares();
  reset();
}

resetBtn.addEventListener("click", function(){
  reset();
});



function setupModeBtns() {
  // mode buttons event listeners

  // easyBtn.addEventListener("click", function(){
  //   this.classList.add("selected");
  //   hardBtn.classList.remove("selected");
  //   // generate new colors
  //   numSquares = 3;
  //   colors = generateRandomColors(numSquares);
  //   pickedColor = pickColor();
  //   colorDisplay.textContent = pickedColor;
  //   // loop through all 6 squares
  //   for (var i = 0; i < squares.length; i++) {
  //     // the colors array has only 3 elements as we specified above
  //     // so this loop only applies to the first 3 squares
  //     if(colors[i]) {
  //       squares[i].style.backgroundColor = colors[i];
  //     }
  //     // hide the other 3 squares
  //     else {
  //       squares[i].style.display = "none";
  //     }
  //   }
  // });

  // hardBtn.addEventListener("click", function(){
  //   this.classList.add("selected");
  //   easyBtn.classList.remove("selected");
  //   numSquares = 6;
  //   colors = generateRandomColors(numSquares);
  //   pickedColor = pickColor();
  //   colorDisplay.textContent = pickedColor;
  //   for (var i = 0; i < squares.length; i++) {
  //     squares[i].style.backgroundColor = colors[i];
  //     squares[i].style.display = "block";
  //   }
  // });

  // since easy and hard button click event are similar, we can combine into one
  for (var i = 0; i < modeBtn.length; i++) {
    modeBtn[i].addEventListener("click", function(){
      // first remove the class from both button, then add it when it is clicked
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      this.classList.add("selected");
      // this is a ternary operator, same as using if/else in this case
      this.textContent === "EASY" ? numSquares = 3: numSquares = 6;
      // must use reset() when either one of the modeBtns are clicked, otherwise number of squares won't change 
      reset();
    });
  }  
}

function setupSquares() {
  // loop through the squares and assign them random colors
  for (var i = 0; i < squares.length; i++){
    // add click listener to squares
    squares[i].addEventListener("click", function(){
      // grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      // compare clicked color to pickedColor
      if (clickedColor === pickedColor) {
        message.textContent = "CORRECT!";
        // change all squares to the correct color
        changeAllColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
        resetBtn.textContent = "Play Again";
      }
      // if it's wrong, make the square disappear by setting its bg-color to match the bg-color of body
      else {
        this.style.backgroundColor = "#232323";
        message.textContent = "TRY AGAIN!";
      }
    });
  }  
}

function reset() {
  // generate all new colors
  colors = generateRandomColors(numSquares);
  // change colors of squares
  for (var i = 0; i < squares.length; i++) {
    // while there is a next color
    if(colors[i]) {
      // bring all 6 squares to visible first 
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    }
    // if there's only 3 colors, hide the other 3 squares
    else {
      squares[i].style.display = "none";
    }
  }
  // pick new random color to be guessed
  pickedColor = pickColor();
  // update colorDisplay to reflect the change
  colorDisplay.textContent = pickedColor;
  // reset h1 color back to the steelblue we started with
  h1.style.backgroundColor = "steelblue";
  message.textContent = "";
  resetBtn.textContent = "New Colors";  
}

function generateRandomColors(n) {
  var arr = [];
  for(var i = 0; i < n; i++) {
    // get random colors and push into array for n times
    arr.push(randomColor());
  }
  return arr;
}

function pickColor() {
  // pick a random number, then return the color at that index number
  // generate a random number between 0 and length of the color array (might be 6 or 3 depending on the mode)
  // then use Math.floor to wipe out the decimals
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function randomColor() {
  // pick a "red" from 0 to 255
  var r = Math.floor(Math.random() * 256);
  // pick a "green" from 0 to 255
  var g = Math.floor(Math.random() * 256);
  // pick a "blue" from 0 to 255
  var b = Math.floor(Math.random() * 256);
  // format into rgb(r, g, b);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function changeAllColors(color) {
  // loop through all squares to change each other to match correct color
  for(var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}