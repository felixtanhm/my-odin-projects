const defaultGrid = 16;

let gridSize = defaultGrid;
let gridContainer = document.querySelector("#grid");
let gridSliderText = document.querySelector("#selection-slider > label");

let gameMode = "default";

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
  if (gameMode === "default") {
    event.target.style.backgroundColor = "#000";
  } else if (gameMode === "rainbow") {
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
  gameMode = mode;
  document.querySelectorAll("#selection-buttons > button").forEach((button) => {
    button.classList.remove("active");
    const buttonText = button.textContent.toLowerCase();
    if (buttonText === mode && buttonText !== "clear")
      button.classList.add("active");
  });
};

const handleClick = (e) => {
  let button = e.target.textContent.toLowerCase();
  button === "clear" ? clearGrid() : setState(button);
};

const handleSlide = (event) => {
  gridSize = event.target.value;
  gridSliderText.textContent = `${gridSize} x ${gridSize}`;
  clearGrid();
};

// Adds event listener to each button
document.querySelectorAll("#selection-buttons > button").forEach((button) => {
  button.addEventListener("click", handleClick);
});

// Adds event listener to grid size slider
document.querySelector("#grid-slider").addEventListener("input", handleSlide);

// Initializes grid state
window.onload = () => {
  generateGrid(defaultGrid);
};