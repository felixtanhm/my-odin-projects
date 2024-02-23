const defaultGrid = 16;
const gridContainer = document.querySelector("#grid");
const gridSliderText = document.querySelector("#selection-slider > label");
const utilBtns = document.querySelectorAll("#selection-left > button");
const gridBtns = document.querySelectorAll("#selection-right > button");

let gridSize = defaultGrid;
let state = "default";
let selectedColor = "#000";

// Handles mouse interactions on the grid
let mouseDown = false;
gridContainer.onmousedown = (e) => {
  e.preventDefault();
  mouseDown = true;
};
gridContainer.onmouseup = (e) => {
  e.preventDefault();
  mouseDown = false;
};

const generateGrid = (size) => {
  gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    let singleGrid = document.createElement("div");
    singleGrid.classList.add("grid-element");
    singleGrid.addEventListener("mouseover", colorGrid);
    singleGrid.addEventListener("mousedown", colorGrid);
    gridContainer.appendChild(singleGrid);
  }
};

const colorGrid = (event) => {
  if (event.type === "mouseover" && !mouseDown) return;
  if (state === "default") {
    event.target.style.backgroundColor = selectedColor;
  } else if (state === "rainbow") {
    event.target.style.backgroundColor = generateColor();
  } else event.target.style.backgroundColor = "#fefefe";
};

const generateColor = () => {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
};

const clearGrid = () => {
  gridContainer.textContent = "";
  generateGrid(gridSize);
};

const setState = (mode) => {
  state = mode;
  document.querySelectorAll("button").forEach((button) => {
    button.classList.remove("active");
    const buttonText = button.textContent.toLowerCase();
    if (buttonText === mode && buttonText !== "clear")
      button.classList.add("active");
  });
};

const setColor = (event) => {
  console.log(event.target.value);
  selectedColor = e.target.value;
};

const handleClick = (button) => {
  console.log("handle click");
  console.log(button);
  button.value === "clear" ? clearGrid() : setState(button.value);
};

const handleGridInput = (event) => {
  console.log(event);
  gridSize = event.target.value;
  clearGrid();
};

// Adds event listener to each button
gridBtns.forEach((button) => {
  button.addEventListener("click", () => handleClick(button));
});

// Add event listener for color input change
document.getElementById("color-input").addEventListener("change", setColor);

// Adds event listener to grid size input
document
  .querySelector("#grid-input")
  .addEventListener("change", handleGridInput);

// Initializes grid state
window.onload = () => {
  generateGrid(defaultGrid);
};
