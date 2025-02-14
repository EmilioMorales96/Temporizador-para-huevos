let timer = null; 
let timeLeft = 0; 
const alarm = document.getElementById("alarm-sound");
const timerDisplay = document.getElementById("timer");
const alarmControls = document.getElementById("alarm-controls");

// Opciones de huevos
const options = [
    { time: 3, img: "Assets/3min.jpg", text: "Huevo Pasado (3 min)" },
    { time: 6, img: "Assets/6min.jpg", text: "Medio (6 min) (muy promedio y normal)" },
    { time: 9, img: "Assets/9min.jpg", text: "Huevo Duro (9 min)" },
    { time: 12, img: "Assets/extra duro.jpg", text: "Extra Duro (12 min)" }
];

let currentIndex = 0; 

// Elementos de la interfaz
const optionImg = document.getElementById("option-img");
const optionText = document.getElementById("option-text");
const optionDisplay = document.querySelector(".option-display");

// Botones de navegación
document.getElementById("prev").addEventListener("click", prevOption);
document.getElementById("next").addEventListener("click", nextOption);
document.getElementById("start").addEventListener("click", () => startTimer(options[currentIndex].time));
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("stop-alarm").addEventListener("click", stopAlarm);
document.getElementById("snooze").addEventListener("click", snoozeAlarm);

function prevOption() {
    currentIndex = (currentIndex - 1 + options.length) % options.length;
    updateOptionDisplay();
}

function nextOption() {
    currentIndex = (currentIndex + 1) % options.length;
    updateOptionDisplay();
}

function updateOptionDisplay() {
    // Aplicar animación de desvanecimiento hacia afuera
    optionDisplay.classList.remove("visible");
    optionDisplay.classList.add("fadeOut");

    // Después de que la animación termine, actualizar el contenido
    setTimeout(() => {
        optionImg.src = options[currentIndex].img;
        optionText.textContent = options[currentIndex].text;

        // Aplicar animación de desvanecimiento hacia adentro
        optionDisplay.classList.remove("fadeOut");
        optionDisplay.classList.add("visible");
    }, 300); // El tiempo debe coincidir con la duración de la animación
}

function startTimer(minutes) {
    clearInterval(timer); 
    timeLeft = minutes * 60;
    updateDisplay();

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            triggerAlarm();
        }
    }, 1000);
}

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function stopTimer() {
    clearInterval(timer);
    timeLeft = 0; 
    updateDisplay(); 
}

function triggerAlarm() {
    alarmControls.classList.remove("hidden");
    alarm.currentTime = 0;
    alarm.play().catch(error => {
        console.log("Error al reproducir la alarma:", error);
        alert("Haz clic en la página para permitir la reproducción de la alarma.");
    });
}

function stopAlarm() {
    alarm.pause();
    alarm.currentTime = 0;
    alarmControls.classList.add("hidden");
}

function snoozeAlarm() {
    stopAlarm(); 
    startTimer(1); 
}

// Inicializar con la primera opción
updateOptionDisplay();
