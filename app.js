// Game Levels Data honoring June celebrations and Turing history
const LEVELS = [
    {
        encrypted: "01010100 01010101 01010010 01011001 01001110 01000111",
        solution: "TURING",
        dayRotorKey: 3,
        nightRotorKey: 7,
        clue: "Level 1 Milestone: The Father of Modern Computing & June Pride icon."
    },
    {
        encrypted: "01010011 01001111 01001100 01010011 01010100 01001001 01000011 01000101",
        solution: "SOLSTICE",
        dayRotorKey: 5,
        nightRotorKey: 2,
        clue: "Level 2 Milestone: Shifting balancing point of June 21st."
    },
    {
        encrypted: "01001010 01010101 01001110 01000101 01010100 01000101 01000101 01001110 01010100 01001000",
        solution: "JUNETEENTH",
        dayRotorKey: 6,
        nightRotorKey: 1,
        clue: "Level 3 Milestone: Honoring historical freedom, resilience, and Black joy."
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

        // Wait for video metadata to load before processing tensors
        videoElement.onloadedmetadata = () => {
            setInterval(processWebcamTensor, 200); // 5 frames per second edge processing
        };
    } catch (err) {
        aiStatus.innerText = "Webcam Required for AI Mode";
        console.error("Camera access denied: ", err);
    }

    loadLevel();
}

// 100% Free Client-Side Google TensorFlow Tensor Analysis Engine
function processWebcamTensor() {
    if (!videoElement.videoWidth) return;

    tf.tidy(() => {
        // Convert video frames into pixel tensors safely on browser GPU/CPU
        const webcamTensor = tf.browser.fromPixels(videoElement);

        // Isolate frame brightness using classic grayscale math: Mean of RGB matrices
        const meanTensor = tf.mean(webcamTensor);
        const data = meanTensor.dataSync();
        const brightnessValue = data[0];

        lightMetric.innerText = brightnessValue.toFixed(2);

        // Thresholding state machine driven natively via tensor mathematical evaluation
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
    document.getElementById('output-panel').classList.add('hidden');
    document.getElementById('victory-card').classList.add('hidden');
    document.getElementById('rotor-day').value = 0;
    document.getElementById('rotor-night').value = 0;
}

// Turing Decryption Algorithm
document.getElementById('decrypt-btn').addEventListener('click', () => {
    const level = LEVELS[currentLevel];
    const userDayRotor = parseInt(document.getElementById('rotor-day').value);
    const userNightRotor = parseInt(document.getElementById('rotor-night').value);
    const outputPanel = document.getElementById('output-panel');
    const decryptedMessage = document.getElementById('decrypted-message');

    outputPanel.classList.remove('hidden');

    // Turing Machine Simulation Constraint: Rotor adjustments must be completed matching the environmental state
    if (isDayMode && userDayRotor !== level.dayRotorKey) {
        decryptedMessage.innerHTML = "❌ <strong>DECRYPTION FAILED:</strong> Rotor I configuration mismatch for the active Solstice Day frequency.";
        return;
    }
    if (!isDayMode && userNightRotor !== level.nightRotorKey) {
        decryptedMessage.innerHTML = "❌ <strong>DECRYPTION FAILED:</strong> Rotor II configuration mismatch for the active Solstice Night matrix.";
        return;
    }

    // Output success state if the combination matches the real-time AI states
    if (userDayRotor === level.dayRotorKey && userNightRotor === level.nightRotorKey) {
        decryptedMessage.innerHTML = `🔓 <strong>SUCCESS:</strong> "${level.solution}"<br><br><em>${level.clue}</em>`;
        document.getElementById('victory-card').classList.remove('hidden');
    } else {
        decryptedMessage.innerHTML = "⏳ <strong>PARTIAL ALIGNMENT:</strong> Current environmental rotor matches, but the alternative solar phase rotor requires alignment.";
    }
});

document.getElementById('next-level-btn').addEventListener('click', () => {
    currentLevel = (currentLevel + 1) % LEVELS.length;
    loadLevel();
});

window.onload = initGame;