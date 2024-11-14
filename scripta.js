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
