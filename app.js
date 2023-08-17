// Get references to various HTML elements
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector("#line-width");
const colorPicker = document.querySelector("#color");
const modeBtn = document.querySelector("#fill-color");
const resetBtn = document.querySelector("#reset");
const eraseBtn = document.querySelector("#erase");
const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#text");
const saveBtn = document.querySelector("#save");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

// Set canvas dimensions and initial line width
canvas.width = 800;
canvas.height = 500;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

// Initialize painting-related variables
let isPainting = false;
let isFill = false;

// Function to handle mouse movement on the canvas
function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  } else {
    ctx.moveTo(event.offsetX, event.offsetY);
  }
}

// Function to handle mouse button press on the canvas
function onMouseDown(event) {
  if (isFill) {
    // Fill canvas with selected color if in fill mode
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    isPainting = false;
  } else {
    isPainting = true; // Start painting if not in fill mode
  }
}

// Function to handle mouse button release on the canvas
function onMouseUp(event) {
  isPainting = false;
  ctx.beginPath(); // Start a new drawing path
}

// Function to update the line width based on user input
function onLineWidthUpdate(event) {
  ctx.lineWidth = event.target.value;
}

// Function to update the drawing color based on user input
function onColorSelect(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

// Function to handle color selection from color options
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  colorPicker.value = colorValue;
}

// Function to toggle between drawing and fill modes
function onModeBtnClick() {
  if (isFill) {
    isFill = false;
    modeBtn.value = "Draw";
  } else {
    isFill = true;
    modeBtn.value = "Fill";
  }
}

// Function to reset the canvas to a blank state
function onResetBtnClick() {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.beginPath();
}

// Function to switch to erase mode
function onEraseBtnClick() {
  ctx.strokeStyle = "#ffffff"; // Set the drawing color to white for erasing
  colorPicker.value = "#ffffff";
  if (isFill) {
    onModeBtnClick(); // Toggle out of fill mode if necessary
  } else {
    ctx.beginPath(); // Start a new drawing path
  }
}

function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.beginPath;
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}

function onDoubleClick(event) {
  ctx.save();
  const text = textInput.value;
  // const currLineWidth = lineWidth.value;
  ctx.beginPath;
  ctx.lineWidth = 1;
  ctx.font = "48px sans-serif";
  ctx.fillText(text, event.offsetX, event.offsetY);
  // ctx.lineWidth = currLineWidth;
  ctx.restore();
}

function onSaveBtnClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

// Event listeners for various interactions on the canvas
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mouseleave", onMouseUp); // Handle mouse leaving the canvas while painting
canvas.addEventListener("dblclick", onDoubleClick);
lineWidth.addEventListener("change", onLineWidthUpdate);
colorPicker.addEventListener("change", onColorSelect);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick)); // Set up color selection events
modeBtn.addEventListener("click", onModeBtnClick);
resetBtn.addEventListener("click", onResetBtnClick);
eraseBtn.addEventListener("click", onEraseBtnClick);
saveBtn.addEventListener("click", onSaveBtnClick);
fileInput.addEventListener("change", onFileChange);
