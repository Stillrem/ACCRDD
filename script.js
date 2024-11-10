(function() {
    let acceptCount = parseInt(localStorage.getItem('acceptCount')) || 0;
    let declineCount = parseInt(localStorage.getItem('declineCount')) || 0;
    const cellColors = JSON.parse(localStorage.getItem('cellColors')) || Array(100).fill('#00FF00');
    let acceptedCount = cellColors.filter(color => color === '#00FF00').length;
    let declinedCount = cellColors.filter(color => color === '#FF0000').length;
    let isLocked = localStorage.getItem('isLocked') === 'true';
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
            document.getElementById('cell-0').textContent = currentNumber;
            acceptCount++;
            acceptedCount++;
            currentNumber++;
        } else {
            document.getElementById('cell-0').textContent = '';
            declineCount++;
            declinedCount++;
        }

        if (currentNumber > 100) currentNumber = 1;

        localStorage.setItem('currentNumber', currentNumber);
        localStorage.setItem('cellColors', JSON.stringify(cellColors));
        const cellTexts = Array.from(document.querySelectorAll('.cell')).map(cell => cell.textContent);
        localStorage.setItem('cellTexts', JSON.stringify(cellTexts));
        updateDisplayCounts();
        updateAcceptanceRate();
    }

    function toggleCellColor(cellIndex) {
        if (!isLocked) {
            const currentColor = cellColors[cellIndex];
            const newColor = currentColor === '#00FF00' ? '#FF0000' : '#00FF00';

            if (currentColor !== newColor) {
                cellColors[cellIndex] = newColor;
                document.getElementById(`cell-${cellIndex}`).style.backgroundColor = newColor;

                if (newColor === '#00FF00') {
                    acceptedCount++;
                    declinedCount--;
                } else {
                    acceptedCount--;
                    declinedCount++;
                }

                localStorage.setItem('cellColors', JSON.stringify(cellColors));
                updateDisplayCounts();
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

    function toggleLock() {
        isLocked = true;
        localStorage.setItem('isLocked', 'true');
        document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
        document.getElementById('toggle-switch').textContent = 'Unlock Cells';
    }

    function toggleUnLock() {
        isLocked = false;
        localStorage.setItem('isLocked', 'false');
        document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'auto');
        document.getElementById('toggle-switch').textContent = 'Lock Cells';
    }

    window.onload = function() {
        const cellsContainer = document.querySelector('.cells');
        const cellTexts = JSON.parse(localStorage.getItem('cellTexts')) || Array(100).fill('');

        cellColors.forEach((color, i) => {
            javascript
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell-${i}`;
            cell.style.backgroundColor = color;
            cell.textContent = cellTexts[i];
            cell.onclick = () => toggleCellColor(i);
            cellsContainer.appendChild(cell);
        });

        updateDisplayCounts();
        updateAcceptanceRate();

        if (isLocked) {
            toggleLock();
        } else {
            toggleUnLock();
        }

        document.getElementById('accept-button').onclick = () => paint('green');
        document.getElementById('decline-button').onclick = () => paint('red');
        document.getElementById('reset-accept').onclick = () => resetCount('accept');
        document.getElementById('reset-decline').onclick = () => resetCount('decline');
        document.getElementById('toggle-switch').onclick = () => {
            if (isLocked) {
                toggleUnLock();
            } else {
                toggleLock();
            }
        };
    };
})();
