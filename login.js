const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
    window.location.href = 'calendar.html';
});

// 2. Create a background container for the falling circles
const background = document.querySelector('.background');

function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = Math.floor(Math.random() * 50) + 10;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    // Random horizontal position
    const leftPosition = Math.random() * 100; // 0 to 100%
    circle.style.left = `${leftPosition}%`;

    const duration = Math.floor(Math.random() * 5) + 6.5; // Duration will be between 8 and 12 seconds
    circle.style.animationDuration = `${duration}s`;

    // Append circle to the body
    document.body.appendChild(circle);

    // Remove the circle after animation to keep the DOM clean
    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}

setInterval(createCircle, ((Math.random() * 2000) + 500));
setInterval(createCircle, ((Math.random() * 2000) + 500));
setInterval(createCircle, ((Math.random() * 5000) + 1000));
setInterval(createCircle, ((Math.random() * 5000) + 1000));