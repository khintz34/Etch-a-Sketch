//variables
const defaultColor = 'black';
const defaultMode = 'color';
const defaultSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;
let currentOpacity = .1;
let size = 16;
let s ='';



// document selectors
const container = document.getElementById("container");
const clearSketch = document.querySelector('.refresh');
const cellCountValue = document.querySelector('.cellCount');
const currentCellCount = document.querySelector('.currentSize');
const colorPicker = document.querySelector('.colorPicker');
const rainbowBtn = document.querySelector('.rainbow');
const grayScaleBtn = document.querySelector('.grayScale');
const eraserBtn = document.querySelector('.eraser');




//make grid 
function makeGrid(size) {

    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`

for (let i = 0; i <= size * size; i++) {
    const gridCell = document.createElement('div')
    gridCell.addEventListener('mouseover', changeColor)
    container.appendChild(gridCell)
}
}

// set current color mode 

colorPicker.onchange = () => setColorMode('color');
grayScaleBtn.onclick = () => setColorMode('grayScale');
rainbowBtn.onclick = () => setColorMode('rainbow');
eraserBtn.onclick = () => setColorMode('eraser');


function setColorMode(mode) {
    currentMode = mode;  
    changeButtonColor(mode);

} 


//change color on mousover

const cellSelect = document.querySelectorAll('.cell');

cellSelect.forEach(cell => cell.addEventListener('mouseover', changeColor));



function changeColor(event) {
    if (currentMode === 'color') {
        currentColor = colorPicker.value;
        event.target.style.backgroundColor = currentColor;
        currentOpacity = 1;
    } else if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        event.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
        currentOpacity = 1;
    } else if (currentMode === 'grayScale') {
        let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
        if (currentOpacity <= 0.9) {
            event.target.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
        } else if (event.target.style.backgroundColor == 'rgb(0, 0, 0)') {
            return;
        } else {
            event.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
        }
    } else if (currentMode === 'eraser') {
        event.target.style.backgroundColor = 'white';
        currentOpacity = 1;
    } else {
        event.target.style.backgroundColor = '#000000';
        currentOpacity = 1;

    }
}

//change color button

function changeButtonColor(currentMode) {
    if (currentMode === 'eraser') {
    rainbowBtn.classList.remove('buttonClass');
    grayScaleBtn.classList.remove('buttonClass');
    eraserBtn.classList.add('buttonClass');
    console.log(eraserBtn.classList);
    } else if (currentMode === 'rainbow') {
        eraserBtn.classList.remove('buttonClass');
        grayScaleBtn.classList.remove('buttonClass');
        rainbowBtn.classList.add('buttonClass');
    } else if (currentMode === 'grayScale') {
        eraserBtn.classList.remove('buttonClass');
        rainbowBtn.classList.remove('buttonClass');
        grayScaleBtn.classList.add('buttonClass');
    } else {
        eraserBtn.classList.remove('buttonClass');
        rainbowBtn.classList.remove('buttonClass');
        grayScaleBtn.classList.remove('buttonClass');
    }   
} 



//refresh button

clearSketch.addEventListener('click', refresh);

function refresh() {
   //  cellSelect.forEach(cell => cell.style.backgroundColor = 'white');
   container.innerHTML = '';
   makeGrid(size);
}

//grid size button

cellCountValue.onchange = () => inputChange();

function inputChange() {

    size = cellCountValue.value;

    refresh();
    
    currentCellCount.innerHTML = `Current Cell Count: ${size} x ${size}`;
}


//load window with grid size 16 right away

window.onload = () => {
    makeGrid(size);
}


