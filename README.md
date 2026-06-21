# The Turing Test of Light 🌙

A unique, browser-based interactive puzzle game that blends historical cryptanalysis with real-world physical environments. Built for the **June Solstice Game Jam (2026)**.

 **[Play the Live Game Here!](https://hopebestworld.github.io/solstice/)**

---

## 📜 Project Overview

**Solstice Cipher** is a clandestine, atmospheric cryptography game that pays homage to Alan Turing's legendary code-breaking legacy and celebrates foundational June milestones, including Pride Month, the Summer Solstice, and Juneteenth. 

Instead of relying on standard inputs, the game features a custom **"Solstice Engine"** that turns your consumer webcam into an on-device environment sensor. To crack intercepted binary transmissions, players must simultaneously align physical, real-world light variables with logical mechanical rotors.

### Core Mechanics:
1. **Solar Phase Modulation:** Shine a light at your webcam to shift the game into **DAY MODE**, or block the lens with your hand to plunge the matrix into **NIGHT MODE**.
2. **Cryptic Matrix Alignment:** Decode thematic riddles to deduce secret rotor settings for both states.
3. **Quantum Verification:** The engine strictly validates both solar cycles. Please calibrate and lock in the correct parameters across both environmental lighting phases to drop the firewall and reveal the historical milestone.

---

## 🧠 Technology Stack & Architecture

This project is built explicitly to be lightweight, completely free to operate, serverless, and private. 

*   **Core Engine:** Pure HTML5, CSS3 (Custom properties for reactive UI states), and Vanilla JavaScript (ES6+).
*   **Google AI Integration:** Powered by **Google TensorFlow.js**. 
    *   Webcam video frames are ingested dynamically as multidimensional pixel data matrices using `tf.browser.fromPixels()`.
    *   The structural luminosity of the player's physical environment is computed directly on the browser's GPU/CPU utilizing matrix reduction through `tf.mean()`. 
    *   This eliminates the need for external API keys, subscription fees, or backend processing.

---

## 📁 File Structure

```text
├── index.html         # Main user interface and operational briefing panel
├── style.css          # Cryptograph bunker theme aesthetics and responsive layouts
├── app.js             # TensorFlow.js pipeline, state tracking, and level logic
└── README.md          # Project documentation

```

---

## ⚖️ License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).
