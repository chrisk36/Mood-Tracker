const calendarElement = document.getElementById('calendar');

const savedMoods = JSON.parse(localStorage.getItem('moods')) || {};

function getBrightness(hexColor) {
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    return (0.299 * r + 0.587 * g + 0.114 * b);
}

function createCalendar() {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();

    calendarElement.innerHTML = '';

    const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    dayAbbreviations.forEach((abbr) => {
        const abbrDiv = document.createElement('div');
        abbrDiv.classList.add('day-abbr', 'day');
        abbrDiv.textContent = abbr;
        calendarElement.appendChild(abbrDiv);
    });

    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        calendarElement.appendChild(emptyDiv);
        emptyDiv.style.border = '3px solid white';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        if (day === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear()) {
            dayDiv.style.border = '3px solid black';
        }

        const savedColor = savedMoods[`${currentMonth + 1}/${day}/${currentYear}`];

        dayDiv.style.backgroundColor = savedColor ? savedColor.color : '#ffffff';

        if (savedColor) {
            const color = savedColor.color;
            dayDiv.style.backgroundColor = color;

            const brightness = getBrightness(color);
            dayDiv.style.color = brightness < 128 ? '#ffffff' : '#000000';
        } else {
            dayDiv.style.backgroundColor = '#ffffff';
        }

        calendarElement.appendChild(dayDiv);

        dayDiv.addEventListener('click', () => {
            localStorage.setItem('selectedDay', day);
            localStorage.setItem('selectedMonth', currentMonth);
            localStorage.setItem('selectedYear', currentYear);

            window.location.href = 'tracker.html';
        });
    }
}

createCalendar();

const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    createCalendar();
    window.location.reload();
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

setInterval(createCircle, Math.random() * 2000 + 500);
setInterval(createCircle, ((Math.random() * 2000) + 500));
setInterval(createCircle, ((Math.random() * 5000) + 1000));
setInterval(createCircle, ((Math.random() * 5000) + 1000));