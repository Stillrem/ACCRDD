let acceptCount = parseInt(localStorage.getItem('acceptCount')) || 0;
let declineCount = parseInt(localStorage.getItem('declineCount')) || 0;
const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#00FF00');
let acceptedCount = cellColors.filter(color => color === '#00FF00').length;
let declinedCount = cellColors.filter(color => color === '#FF0000').length;
let isLocked = localStorage.getItem('isLocked') === 'true';
let counter = 1;

function updateAcceptanceRate() {
    const acceptanceRate = (acceptedCount / 100) * 100;
    document.getElementById('acceptance-rate').textContent = `Acceptance Rate: ${acceptanceRate.toFixed(2)}%`;
}

function updateDisplayCounts() {
    document.getElementById('accept-count').textContent = acceptCount;
    document.getElementById('decline-count').textContent = declineCount;
    localStorage.setItem('acceptCount', acceptCount);
    localStorage.setItem('declineCount', declineCount);
}

function paint(color) {
    const colorCode = color === 'red' ? '#FF0000' : '#00FF00';

    if (cellColors[99] === '#00FF00') {
        acceptedCount--;
    } else if (cellColors[99] === '#FF0000') {
        declinedCount--;
    }

    for (let i = cellColors.length - 1; i > 0; i--) {
        cellColors[i] = cellColors[i - 1];
        const cell = document.getElementById(`cell-${i}`);
        cell.style.backgroundColor = cellColors[i];
        cell.textContent = '';
    }

    cellColors[0] = colorCode;
    const firstCell = document.getElementById('cell-0');
    firstCell.style.backgroundColor = colorCode;
    firstCell.textContent = colorCode === '#00FF00' ? counter : '';

    if (colorCode === '#00FF00') {
        acceptCount++;
        acceptedCount++;
        if (counter < 100) {
            counter++;
        } else {
            counter = 1;
        }
    } else {
        declineCount++;
        declinedCount++;
    }

    updateDisplayCounts();
    localStorage.setItem('cellColors', JSON.stringify(cellColors));
    updateAcceptanceRate();
}

function toggleCellColor(cellIndex) {
    if (!isLocked) {
        const currentColor = cellColors[cellIndex];
        const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

        if (currentColor !== newColor) {
            cellColors[cellIndex] = newColor;
            const cell = document.getElementById(`cell-${cellIndex}`);
            cell.style.backgroundColor = newColor;
            cell.textContent = newColor === '#00FF00' ? counter : '';

            if (newColor === '#00FF00') {
                acceptedCount++;
                declinedCount--;
            } else {
                acceptedCount--;
                declinedCount++;
            }

            updateDisplayCounts();
            localStorage.setItem('cellColors', JSON.stringify(cellColors));
            updateAcceptanceRate();
        }
    }
}

function resetCount(type) {
    if (type === 'accept') {
        acceptCount = 0;
    } else if (type === 'decline') {
        declineCount = 0;
    }
    updateDisplayCounts();
}

window.onload = function() {
    const cellsContainer = document.querySelector('.cells');
    for (let i = 0; i < cellColors.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.style.backgroundColor = cellColors[i];
        cell.textContent = cellColors[i] === '#00FF00' ? counter : '';

        cell.addEventListener('click', () => toggleCellColor(i));

        cellsContainer.appendChild(cell);
    }
    updateAcceptanceRate();
    updateDisplayCounts();

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
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }

    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
    }, { passive: false });

        function toggleLock() {
            isLocked = true;
            localStorage.setItem('isLocked', 'true');

            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
            cell.style.pointerEvents = 'none';
            });

            document.getElementById('toggle-switch').textContent = 'Unlock Cells';
            }

        function toggleUnLock() {
            isLocked = false;
            localStorage.setItem('isLocked', 'false');

            const cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
            cell.style.pointerEvents = 'auto';
        });

            document.getElementById('toggle-switch').textContent = 'Lock Cells';
            }

            document.getElementById('toggle-switch').addEventListener('click', () => {
            if (isLocked) {
                toggleUnLock();
            } else {
                toggleLock();
            }
        });

    // Initial setup based on stored state
            if (isLocked) {
                toggleLock();
            } else {
                toggleUnLock();
            }
         };
