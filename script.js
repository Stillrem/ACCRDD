let acceptCount = parseInt(localStorage.getItem('acceptCount')) || 0;
let declineCount = parseInt(localStorage.getItem('declineCount')) || 0;
const cellData = JSON.parse(localStorage.getItem('cellData')) || Array(100).fill({ color: '#00FF00', number: null });
let acceptedCount = cellData.filter(cell => cell.color === '#00FF00').length;
let declinedCount = cellData.filter(cell => cell.color === '#FF0000').length;
let isLocked = localStorage.getItem('isLocked') === 'true';

// Переменная для отслеживания номера
let currentNumber = parseInt(localStorage.getItem('currentNumber')) || 1;

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

    if (cellData[99].color === '#00FF00') {
        acceptedCount--;
    } else if (cellData[99].color === '#FF0000') {
        declinedCount--;
    }

    for (let i = cellData.length - 1; i > 0; i--) {
        cellData[i].color = cellData[i - 1].color;
        cellData[i].number = cellData[i - 1].number;
        document.getElementById(`cell-${i}`).style.backgroundColor = cellData[i].color;
        document.getElementById(`cell-${i}`).textContent = cellData[i].number;
    }

    cellData[0].color = colorCode;
    document.getElementById('cell-0').style.backgroundColor = colorCode;
    
    if (colorCode === '#00FF00') {
        cellData[0].number = currentNumber; // Установка номера в первую ячейку
        acceptCount++;
        acceptedCount++;

        // Увеличение номера, если он меньше 100
        if (currentNumber < 100) {
            currentNumber++;
        } else {
            currentNumber = 1; // Сброс номера после 100
        }
    } else {
        cellData[0].number = null; // Удаление номера в красной ячейке
        declineCount++;
        declinedCount++;
    }

    localStorage.setItem('currentNumber', currentNumber);

    updateDisplayCounts();
    localStorage.setItem('cellData', JSON.stringify(cellData));
    updateAcceptanceRate();
}

function toggleCellColor(cellIndex) {
    if (!isLocked) {
        const currentColor = cellData[cellIndex].color;
        const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

        if (currentColor !== newColor) {
            cellData[cellIndex].color = newColor;
            document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

            if (newColor === '#00FF00') {
                acceptedCount++;
                declinedCount--;
                cellData[cellIndex].number = currentNumber;
                if (currentNumber < 100) {
                    currentNumber++;
                } else {
                    currentNumber = 1;
                }
            } else {
                acceptedCount--;
                declinedCount++;
                cellData[cellIndex].number = null;
            }

            updateDisplayCounts();
            localStorage.setItem('cellData', JSON.stringify(cellData));
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
        cell.style.textAlign = 'center'; // Центрирование текста в ячейке
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
