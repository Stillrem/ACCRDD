let acceptCount = +localStorage.getItem('acceptCount') || 0;
let declineCount = +localStorage.getItem('declineCount') || 0;
let cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#00FF00');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;
let declinedCount = cellColors.filter(color => color === '#FF0000').length;
let isLocked = localStorage.getItem('isLocked') === 'true';
let currentNumber = +localStorage.getItem('currentNumber') || 1;
let cellTexts = JSON.parse(localStorage.getItem('cellTexts')) || Array(100).fill('');

const updateAcceptanceRate = () => {
    const acceptanceRate = (acceptedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
};

const updateDisplayCounts = () => {
    document.getElementById('accept-count').textContent = acceptCount;
    document.getElementById('decline-count').textContent = declineCount;
    localStorage.setItem('acceptCount', acceptCount);
    localStorage.setItem('declineCount', declineCount);
};

const paint = (color) => {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';
    if (cellColors[99] === '#00FF00') acceptedCount--;
    if (cellColors[99] === '#FF0000') declinedCount--;

    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        document.getElementById(`cell-${i}`).style.backgroundColor = cellColors[i];
        document.getElementById(`cell-${i}`).textContent = document.getElementById(`cell-${i-1}`).textContent;
    }

    cellColors[0] = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;

    if (colorCode === '#00FF00') {
        document.getElementById('cell-0').textContent = currentNumber++;
        acceptCount++;
        acceptedCount++;
    } else {
        document.getElementById('cell-0').textContent = '';
        declineCount++;
        declinedCount++;
    }

    if (currentNumber > 100) currentNumber = 1;

    localStorage.setItem('currentNumber', currentNumber);
    updateDisplayCounts();
    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    localStorage.setItem('cellTexts', JSON.stringify(Array.from(document.querySelectorAll('.cell')).map(cell => cell.textContent)));
    updateAcceptanceRate();
};

const toggleCellColor = (cellIndex) => {
    if (isLocked) return;
    const newColor = cellColors[cellIndex] === '#00FF00' ? '#FF0000' : '#00FF00';

    cellColors[cellIndex] = newColor;
    document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;
    acceptedCount += (newColor === '#00FF00') ? 1 : -1;
    declinedCount += (newColor === '#00FF00') ? -1 : 1;

    updateDisplayCounts();
    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    updateAcceptanceRate();
};

const resetCount = (type) => {
    if (type === 'accept') {
        acceptCount = 0;
        currentNumber = 1;
    } else if (type === 'decline') declineCount = 0;

    updateDisplayCounts();
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
};

window.onload = () => {
    const cellsContainer = document.querySelector('.cells');

    for (let i = 0; i < cellColors.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.style.backgroundColor = cellColors[i];
        cell.style.textAlign = 'center';
        cell.textContent = cellTexts[i];
        cell.onclick = () => toggleCellColor(i);
        cellsContainer.appendChild(cell);
    }

    updateDisplayCounts();
    updateAcceptanceRate();

    document.getElementById('accept-count').addEventListener('click', () => {
        acceptCount++;
        updateDisplayCounts();
    });

    document.getElementById('decline-count').addEventListener('click', () => {
        declineCount++;
        updateDisplayCounts();
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('Service Worker registered with scope:', registration.scope))
            .catch(error => console.error('Service Worker registration failed:', error));
    }

    document.addEventListener('dblclick', event => event.preventDefault(), { passive: false });

    const toggleLockState = () => {
        isLocked = !isLocked;
        localStorage.setItem('isLocked', isLocked.toString());
        document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = isLocked ? 'none' : 'auto');
        document.getElementById('toggle-switch').textContent = isLocked ? 'Unlock Cells' : 'Lock Cells';
    };

    document.getElementById('toggle-switch').addEventListener('click', toggleLockState);
    toggleLockState(); // Initial setup based on stored state
};
