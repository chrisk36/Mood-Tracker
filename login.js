const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
    window.location.href = 'calendar.html';
});

const background = document.querySelector('.background');

function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = Math.floor(Math.random() * 50) + 10;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    const leftPosition = Math.random() * 100;
    circle.style.left = `${leftPosition}%`;

    const duration = Math.floor(Math.random() * 5) + 6.5;
    circle.style.animationDuration = `${duration}s`;

    document.body.appendChild(circle);

    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}

setInterval(createCircle, ((Math.random() * 2000) + 500));
setInterval(createCircle, ((Math.random() * 2000) + 500));
setInterval(createCircle, ((Math.random() * 5000) + 1000));
setInterval(createCircle, ((Math.random() * 5000) + 1000));