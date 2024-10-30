    function calculateOrdersToIncreaseRate() {
    const currentAcceptanceRate = (acceptedCount / 100) * 100;
    const targetAcceptanceRate = currentAcceptanceRate + 1;
    const totalOrders = acceptedCount + declinedCount;
    
    const neededAccepts = Math.ceil((targetAcceptanceRate * totalOrders - 100 * acceptedCount) / (100 - targetAcceptanceRate));
    return neededAccepts;
}

function displayNeededOrders() {
    const neededAccepts = calculateOrdersToIncreaseRate();
    document.getElementById('needed-orders').textContent = `Orders needed to increase rate by 1%: ${neededAccepts}`;
}

window.onload = function() {
    const cellsContainer = document.querySelector('.cells');
    for (let i = 0; i < cellColors.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.style.backgroundColor = cellColors[i];

        cell.addEventListener('click', () => toggleCellColor(i));

        cellsContainer.appendChild(cell);
    }

    updateAcceptanceRate();
    updateDisplayCounts();
    displayNeededOrders(); // Добавили вызов новой функции

    document.getElementById('accept-count').addEventListener('click', () => {
        acceptCount++;
        updateDisplayCounts();
        displayNeededOrders(); // Обновляем отображение после изменений
    });

    document.getElementById('decline-count').addEventListener('click', () => {
        declineCount++;
        updateDisplayCounts();
        displayNeededOrders(); // Обновляем отображение после изменений
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

    // Создаем элемент для отображения необходимого количества заказов
    const neededOrdersElement = document.createElement('div');
    neededOrdersElement.id = 'needed-orders';
    document.body.appendChild(neededOrdersElement);
}

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
