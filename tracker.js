const colorPicker = document.getElementById('color-wheel');
const colorBox = document.getElementById('color-box');
const moodInput = document.getElementById('mood');
const descriptionInput = document.getElementById('description');
const saveBtn = document.getElementById('save-btn');
const errorMessage = document.getElementById('error-message');
const backBtn = document.getElementById('back-btn');

const savedMoods = JSON.parse(localStorage.getItem('moods')) || {};

const selectedDay = parseInt(localStorage.getItem('selectedDay'), 10);
const selectedMonth = parseInt(localStorage.getItem('selectedMonth'), 10);
const selectedYear = parseInt(localStorage.getItem('selectedYear'), 10);

const dateInfo = document.getElementById('date-info');
dateInfo.textContent = `${selectedMonth + 1} - ${selectedDay} - ${selectedYear}`;

const selectedDateString = `${selectedMonth + 1}/${selectedDay}/${selectedYear}`;
const savedMood = savedMoods[selectedDateString];

if (savedMood) {
    moodInput.value = savedMood.mood;
    descriptionInput.value = savedMood.description;
    colorBox.style.backgroundColor = savedMood.color;
    colorPicker.value = savedMood.color;
} else {
    colorBox.style.backgroundColor = '#ffffff';
}

saveBtn.addEventListener('click', () => {
    const mood = moodInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!mood || !description) {
        errorMessage.textContent = 'Please fill in both mood and description!';
        return;
    }

    savedMoods[selectedDateString] = {
        mood: mood,
        description: description,
        color: colorPicker.value,
    };

    localStorage.setItem('moods', JSON.stringify(savedMoods));

    errorMessage.textContent = '';
    window.location.href = 'calendar.html';
});

backBtn.addEventListener('click', () => {
    window.location.href = 'calendar.html';
});

colorBox.addEventListener('click', () => {
    colorPicker.click();
});

colorPicker.addEventListener('input', () => {
    colorBox.style.backgroundColor = colorPicker.value;
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