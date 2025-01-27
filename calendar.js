const calendarElement = document.getElementById('calendar');

// Load saved moods from localStorage
const savedMoods = JSON.parse(localStorage.getItem('moods')) || {};

function getBrightness(hexColor) {
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Calculate brightness using the formula: (0.299*R + 0.587*G + 0.114*B)
    return (0.299 * r + 0.587 * g + 0.114 * b);
}

// Create calendar for the current month
function createCalendar() {
    const date = new Date();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();

    // Get the first and last days of the month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay(); // Day of the week (0 - Sunday, 6 - Saturday)

    // Clear previous calendar
    calendarElement.innerHTML = '';

    const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day abbreviations
    dayAbbreviations.forEach((abbr) => {
        const abbrDiv = document.createElement('div');
        abbrDiv.classList.add('day-abbr', 'day');
        abbrDiv.textContent = abbr;
        calendarElement.appendChild(abbrDiv);
    });

    // Empty spaces before the first day
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        calendarElement.appendChild(emptyDiv);
        emptyDiv.style.border = '3px solid white';
    }

    // Populate days with saved colors
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = day;

        // Highlight today's date
        if (day === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear()) {
            dayDiv.style.border = '3px solid black';
        }

        // Retrieve the saved mood color for the current day
        const savedColor = savedMoods[`${currentMonth + 1}/${day}/${currentYear}`];

        // Apply saved color or default color
        dayDiv.style.backgroundColor = savedColor ? savedColor.color : '#ffffff';

        if (savedColor) {
            const color = savedColor.color;
            dayDiv.style.backgroundColor = color;

            // Adjust text color based on brightness
            const brightness = getBrightness(color);
            dayDiv.style.color = brightness < 128 ? '#ffffff' : '#000000';
        } else {
            dayDiv.style.backgroundColor = '#ffffff';
        }

        // Add the day to the calendar
        calendarElement.appendChild(dayDiv);

        // Click event to open the mood tracker for that day
        dayDiv.addEventListener('click', () => {
            // Store the selected day in localStorage
            localStorage.setItem('selectedDay', day);
            localStorage.setItem('selectedMonth', currentMonth);
            localStorage.setItem('selectedYear', currentYear);

            // Redirect to the tracker page
            window.location.href = 'tracker.html';
        });
    }
}

// Initialize the calendar
createCalendar();

// Clear button functionality
const clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    createCalendar();
    window.location.reload();
});

// Background circles (for fun animation effect)
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

setInterval(createCircle, Math.random() * 2000 + 500);
setInterval(createCircle, ((Math.random() * 2000) + 500));
setInterval(createCircle, ((Math.random() * 5000) + 1000));
setInterval(createCircle, ((Math.random() * 5000) + 1000));