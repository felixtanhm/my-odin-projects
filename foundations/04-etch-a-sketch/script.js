const defaultGrid = 12;
const gridContainer = document.querySelector("#grid");
const gridLinesBtn = document.getElementById("grid-lines-btn");
const downloadBtn = document.getElementById("download-btn");
const gridBtns = document.querySelectorAll("#selection-right > button");
const colorDisplay = document.getElementById("color-display");

let gridSize = defaultGrid;
let state = "default";
let selectedColor = "#2A2E32";

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
    singleGrid.classList.add("grid-element", "grid-lines");
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

const clearGrid = () => {
  gridContainer.textContent = "";
  generateGrid(gridSize);
};

const setState = (button) => {
  state = button.value;
  gridBtns.forEach((gridBtn) => {
    gridBtn.classList.remove("active");
    if (gridBtn.value === button.value && gridBtn.value !== "clear")
      gridBtn.classList.add("active");
  });
};

const setColor = (event) => {
  selectedColor = event.target.value;
  colorDisplay.style.backgroundColor = selectedColor;
};

const generateColor = () => {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
};

const toggleGridLines = () => {
  gridLinesBtn.classList.contains("active")
    ? gridLinesBtn.classList.remove("active")
    : gridLinesBtn.classList.add("active");
  document.querySelectorAll(".grid-element").forEach((grid) => {
    grid.classList.contains("grid-lines")
      ? grid.classList.remove("grid-lines")
      : grid.classList.add("grid-lines");
  });
};

const handleClick = (button) => {
  button.value === "clear" ? clearGrid() : setState(button);
};

const handleGridInput = (event) => {
  gridSize = event.target.value;
  clearGrid();
};

const createImg = () => {
  const createdImg = document.createElement("canvas");
  const imgContext = createdImg.getContext("2d");
  gridContainer.appendChild(createdImg);
  console.log("image appended");

  document.querySelectorAll("grid-element").forEach((grid, i) => {
    const row = Math.floor(i / gridSize);
    console.log(row);

    const col = i % gridSize;
    console.log(col);

    imgContext.fillStyle = grid.style.backgroundColor;
    imgContext.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
  });
  downloadImg(createdImg.toDataURL());
  createdImg.remove();
};

const downloadImg = (href) => {
  const link = document.createElement("a");
  link.download = "etch-a-sketch__felixtanhm-portfolio";
  link.href = href;
  document.body.appendChild(link);
  link.click();
  link.remove();
  console.log("download initiated");
};

// Adds event listener to each button
gridBtns.forEach((button) => {
  button.addEventListener("click", () => handleClick(button));
});
gridLinesBtn.addEventListener("click", toggleGridLines);
downloadBtn.addEventListener("click", createImg);

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
