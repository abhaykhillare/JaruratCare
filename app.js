let counter = 0;
let history = [];
let historyIndex = -1;
const maxCounter = 150;

const counterElement = document.getElementById('counter');
const progressBarElement = document.getElementById('progress-bar');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');

function updateUI() {
    counterElement.textContent = counter;
    progressBarElement.style.width = `${(counter / maxCounter) * 100}%`;
    progressBarElement.style.transition = 'width 0.3s ease-in-out';
}

function addToHistory(value) {
    // If we do an operation, remove future states for redo
    history = history.slice(0, historyIndex + 1);
    history.push(value);
    historyIndex++;
}

incrementButton.addEventListener('click', () => {
    if (counter < maxCounter) {
        counter++;
        addToHistory(counter);
        updateUI();
    }
});

decrementButton.addEventListener('click', () => {
    if (counter > 0) {
        counter--;
        addToHistory(counter);
        updateUI();
    }
});

undoButton.addEventListener('click', () => {
    if (historyIndex > 0) {
        historyIndex--;
        counter = history[historyIndex];
        updateUI();
    }
});

redoButton.addEventListener('click', () => {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        counter = history[historyIndex];
        updateUI();
    }
});

// Initialize UI
addToHistory(counter);
updateUI();
