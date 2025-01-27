// Select DOM elements
const colorPicker = document.getElementById('color-wheel');
const colorBox = document.getElementById('color-box');
const moodInput = document.getElementById('mood');
const descriptionInput = document.getElementById('description');
const saveBtn = document.getElementById('save-btn');
const errorMessage = document.getElementById('error-message');
const backBtn = document.getElementById('back-btn');

// Load saved mood entries from localStorage
const savedMoods = JSON.parse(localStorage.getItem('moods')) || {};

// Get the selected day, month, and year
const selectedDay = parseInt(localStorage.getItem('selectedDay'), 10);
const selectedMonth = parseInt(localStorage.getItem('selectedMonth'), 10);
const selectedYear = parseInt(localStorage.getItem('selectedYear'), 10);

// Display the selected date
const dateInfo = document.getElementById('date-info');
dateInfo.textContent = `Mood for ${selectedMonth + 1}/${selectedDay}/${selectedYear}`;

// Check if there's a saved entry for the selected day
const selectedDateString = `${selectedMonth + 1}/${selectedDay}/${selectedYear}`;
const savedMood = savedMoods[selectedDateString];

// If there's a saved mood, display it
if (savedMood) {
    moodInput.value = savedMood.mood;
    descriptionInput.value = savedMood.description;
    colorBox.style.backgroundColor = savedMood.color;
    colorPicker.value = savedMood.color;
} else {
    colorBox.style.backgroundColor = '#ffffff'; // Default color if no mood saved
}

// Handle saving the mood entry
saveBtn.addEventListener('click', () => {
    const mood = moodInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!mood || !description) {
        errorMessage.textContent = 'Please fill in both mood and description!';
        return;
    }

    // Save or update the mood and description for the selected day
    savedMoods[selectedDateString] = {
        mood: mood,
        description: description,
        color: colorPicker.value,
    };

    // Save to localStorage
    localStorage.setItem('moods', JSON.stringify(savedMoods));

    // Clear the inputs and show success message
    errorMessage.textContent = '';
    window.location.href = 'calendar.html'; // Redirect to calendar page
});

// Handle going back to the calendar page
backBtn.addEventListener('click', () => {
    window.location.href = 'calendar.html'; // Redirect to calendar page
});

// When the user clicks on the color box, open the color picker
colorBox.addEventListener('click', () => {
    colorPicker.click(); // Programmatically open the hidden color picker
});

// Update the color box when the user selects a color
colorPicker.addEventListener('input', () => {
    colorBox.style.backgroundColor = colorPicker.value; // Set the color box to the selected color
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