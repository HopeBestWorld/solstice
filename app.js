// Game Levels Data honoring June celebrations and Turing history
const LEVELS = [
    {
        encrypted: "01010100 01010101 01010010 01011001 01001110 01000111",
        solution: "TURING",
        dayRotorKey: 3,
        nightRotorKey: 7,
        hint: "Rotor I (Day): The number of letters in the acronym 'PRIDE'. Minus two. \n\nRotor II (Night): The month number of the Summer Solstice (June). Plus one.",
        clue: "Level 1 Milestone Decrypted: Alan Turing — The Father of Modern Computing & June Pride icon."
    },
    {
        encrypted: "01010011 01001111 01001100 01010011 01010100 01001001 01000011 01000101",
        solution: "SOLSTICE",
        dayRotorKey: 5,
        nightRotorKey: 2,
        hint: "Rotor I (Day): The number of sides on a standard computer chip architecture square, plus one. \n\nRotor II (Night): The number of binary states in standard computing logic (True/False).",
        clue: "Level 2 Milestone Decrypted: Summer Solstice — The celestial alignment point of June 21st."
    },
    {
        encrypted: "01001010 01010101 01001110 01000101 01010100 01000101 01000101 01001110 01010100 01001000",
        solution: "JUNETEENTH",
        dayRotorKey: 6,
        nightRotorKey: 1,
        hint: "Rotor I (Day): The month number of June itself. \n\nRotor II (Night): The numeric value representing unity, liberation, and new beginnings.",
        clue: "Level 3 Milestone Decrypted: Juneteenth — Honoring freedom, resilience, and Black joy."
    }
];

let currentLevel = 0;
let isDayMode = true;
let videoElement, overlay, lightMetric, aiStatus;

// Initialize Web Browser Stream and TensorFlow Engine
async function initGame() {
    videoElement = document.getElementById('webcam');
    overlay = document.getElementById('solstice-overlay');
    lightMetric = document.getElementById('light-metric');
    aiStatus = document.getElementById('ai-status');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 320 }, height: { ideal: 240 } } });
        videoElement.srcObject = stream;
        aiStatus.innerText = "TensorFlow Engine Active";

        videoElement.onloadedmetadata = () => {
            setInterval(processWebcamTensor, 200); // 5 frames per second edge processing
        };
    } catch (err) {
        aiStatus.innerText = "Webcam Blocked / Simulation Mode Active";
        console.warn("Camera access unavailable: ", err);
    }

    loadLevel();
}

// 100% Free Client-Side Google TensorFlow Tensor Analysis Engine
function processWebcamTensor() {
    if (!videoElement || !videoElement.videoWidth) return;

    tf.tidy(() => {
        const webcamTensor = tf.browser.fromPixels(videoElement);
        const meanTensor = tf.mean(webcamTensor);
        const data = meanTensor.dataSync();
        const brightnessValue = data[0];

        lightMetric.innerText = brightnessValue.toFixed(2);

        if (brightnessValue > 110) {
            isDayMode = true;
            overlay.innerText = "SOLSTICE DAY";
            overlay.className = "day-mode";
        } else {
            isDayMode = false;
            overlay.innerText = "SOLSTICE NIGHT";
            overlay.className = "night-mode";
        }
    });
}

function loadLevel() {
    const level = LEVELS[currentLevel];
    document.getElementById('encrypted-text').innerText = level.encrypted;
    document.getElementById('current-hint').innerText = level.hint;
    document.getElementById('output-panel').classList.add('hidden');
    document.getElementById('victory-card').classList.add('hidden');
    document.getElementById('rotor-day').value = 0;
    document.getElementById('rotor-night').value = 0;

    const nextBtn = document.getElementById('next-level-btn');
    if (currentLevel === LEVELS.length - 1) {
        nextBtn.innerText = "🔄 Play Again / Restart Matrix";
    } else {
        nextBtn.innerText = "Load Next Transmission ➡️";
    }
}

// Turing Decryption Algorithm
document.getElementById('decrypt-btn').addEventListener('click', () => {
    const level = LEVELS[currentLevel];
    const userDayRotor = parseInt(document.getElementById('rotor-day').value);
    const userNightRotor = parseInt(document.getElementById('rotor-night').value);
    const outputPanel = document.getElementById('output-panel');
    const decryptedMessage = document.getElementById('decrypted-message');

    outputPanel.classList.remove('hidden');

    // Turing Machine Environmental Mode Constraints
    if (isDayMode && userDayRotor !== level.dayRotorKey) {
        decryptedMessage.innerHTML = "❌ <strong>DECRYPTION FAILED:</strong> Rotor I configuration mismatch for the active Solstice Day frequency.";
        return;
    }
    if (!isDayMode && userNightRotor !== level.nightRotorKey) {
        decryptedMessage.innerHTML = "❌ <strong>DECRYPTION FAILED:</strong> Rotor II configuration mismatch for the active Solstice Night matrix.";
        return;
    }

    if (userDayRotor === level.dayRotorKey && userNightRotor === level.nightRotorKey) {
        decryptedMessage.innerHTML = `🔓 <strong>SUCCESS MATRIX BREAKDOWN:</strong><br><br> "${level.solution}"<br><br><em>${level.clue}</em>`;
        document.getElementById('victory-card').classList.remove('hidden');
    } else {
        decryptedMessage.innerHTML = "⏳ <strong>PARTIAL ALIGNMENT:</strong> The rotor for your current environmental lighting state matches! However, you must now change your room lighting (switch to the opposite Solar Phase) to calibrate and verify the second rotor.";
    }
});

// Progression & Reset Handler
document.getElementById('next-level-btn').addEventListener('click', () => {
    if (currentLevel === LEVELS.length - 1) {
        currentLevel = 0;
    } else {
        currentLevel++;
    }
    loadLevel();
});

window.onload = initGame;