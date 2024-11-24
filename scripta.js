function calculate() {
    const hours = parseFloat(document.getElementById('hours').value);
    const basePay = parseFloat(document.getElementById('basePay').value);

    if (isNaN(hours) || isNaN(basePay)) {
        alert('Пожалуйста, введите корректные числовые значения');
        return;
    }

    const hourlyRate = basePay / hours;
    const difference = 23 - hourlyRate;
    const additionalPay = hours * difference;

    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';
    resultElement.innerHTML = `
        Почасовая ставка: $${hourlyRate.toFixed(2)}<br>
        Разница со ставкой $23: $${difference.toFixed(2)}<br>
        Дополнительная оплата: $${additionalPay.toFixed(2)}
    `;
}

// Регистрация service worker
//if ('serviceWorker' in navigator) {
                //navigator.serviceWorker.register('/service-worker.js')
                //.then(registration => {
                    //console.log('Service Worker registered with scope:', registration.scope);
                //})
                //.catch(error => {
                    //console.error('Service Worker registration failed:', error);
                //});
            //}

            document.addEventListener('dblclick', function(event) {
                event.preventDefault();
            }, { passive: false })

function getRandomDarkColor() {
    const r = Math.floor(Math.random() * 100);
    const g = Math.floor(Math.random() * 100);
    const b = Math.floor(Math.random() * 100);
    return `rgb(${r}, ${g}, ${b})`;
}

function setRandomColors() {
    const root = document.documentElement;
    root.style.setProperty('--color1', getRandomDarkColor());
    root.style.setProperty('--color2', getRandomDarkColor());
    root.style.setProperty('--color3', getRandomDarkColor());
    root.style.setProperty('--color4', getRandomDarkColor());
}

setRandomColors();
setInterval(setRandomColors, 20000); // Меняем цвета каждые 20 секунд

// Анимация появления страницы
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        document.body.classList.remove('unloading');
    }
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 0);
});

// Обработка кнопки "Назад"
document.getElementById('backButton').addEventListener('click', function(e) {
    e.preventDefault();
    document.body.classList.add('unloading');
    document.body.classList.remove('loaded');
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 300);
});

// Обработка нажатия кнопки "Назад" в браузере
window.addEventListener('pagehide', function() {
    document.body.classList.add('unloading');
});

    // Слушатель события на касание экрана
        document.body.addEventListener('touchstart', function() {
            var audio = document.getElementById('backgroundMusic');
            audio.play().catch(function(error) {
                console.log('Ошибка при воспроизведении:', error);
            });

            // Удалить слушатель после первого касания, чтобы предотвратить повторное воспроизведение
            document.body.removeEventListener('touchstart', arguments.callee);
        }, { once: true }); // Опция { once: true } автоматически удаляет обработчик после первого выполнения
