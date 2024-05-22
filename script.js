document.addEventListener("DOMContentLoaded", () => {
    const keys = document.querySelectorAll(".key");
    const synth = new Tone.Synth().toDestination();
    const demoBtn = document.getElementById("demo-btn");
    const tumHiHoBtn = document.getElementById("tum-hi-ho-btn");
    const bubbleContainer = document.querySelector('.bubble-container');
    const songButtons = document.querySelectorAll(".song-btn");
    let playing = false;
    let currentTimeouts = [];
    // Simplified demo sequence
    const demoSequence = [
        { note: "C4", duration: 500 },
        { note: "E4", duration: 500 },
        { note: "G4", duration: 500 },
        { note: "C5", duration: 500 },
        { note: "B4", duration: 500 },
        { note: "G4", duration: 500 },
        { note: "E4", duration: 500 },
        { note: "C4", duration: 500 },
        { note: "D4", duration: 500 },
        { note: "F4", duration: 500 },
        { note: "A4", duration: 500 },
        { note: "D5", duration: 500 },
        { note: "C5", duration: 500 },
        { note: "A4", duration: 500 },
        { note: "F4", duration: 500 },
        { note: "D4", duration: 500 }
    ];

    // Simplified "Tum Hi Ho" sequence
    const tumHiHoSequence = [
        { note: "E4", duration: 400 },
        { note: "G#4", duration: 400 },
        { note: "A4", duration: 400 },
        { note: "G#4", duration: 400 },
        { note: "F#4", duration: 800 },
        { note: "E4", duration: 400 },
        { note: "D4", duration: 400 },
        { note: "E4", duration: 400 },
        { note: "F#4", duration: 800 },
        { note: "E4", duration: 400 },
        { note: "G#4", duration: 400 },
        { note: "A4", duration: 400 },
        { note: "B4", duration: 400 },
        { note: "A4", duration: 400 },
        { note: "G#4", duration: 400 },
        { note: "F#4", duration: 800 },
        { note: "E4", duration: 400 },
        { note: "D4", duration: 400 },
        { note: "E4", duration: 400 },
        { note: "F#4", duration: 800 },
        { note: "E4", duration: 400 },
        { note: "G#4", duration: 400 },
        { note: "A4", duration: 400 },
        { note: "B4", duration: 400 },
        { note: "A4", duration: 400 },
        { note: "G#4", duration: 400 },
        { note: "F#4", duration: 800 }
        
    ];

    keys.forEach(key => {
        key.addEventListener("click", () => {
            stopMusic(); // Stop any currently playing music
            const note = key.getAttribute("data-note");
            synth.triggerAttackRelease(note, "8n");
            animateKey(key);
            createBubble();
        });
    });

    demoBtn.addEventListener("click", () => playDemo(demoSequence, demoBtn));
    tumHiHoBtn.addEventListener("click", () => playDemo(tumHiHoSequence, tumHiHoBtn));

    function animateKey(key) {
        key.classList.add("active");
        anime({
            targets: key,
            scale: [1, 1.2, 1],
            backgroundColor: key.classList.contains("black") ? ['#000', '#444', '#000'] : ['#fff', '#ffd700', '#fff'],
            duration: 300,
            easing: 'easeInOutQuad',
            complete: () => key.classList.remove("active")
        });
    }

    function playDemo(sequence, button) {
        stopMusic(); // Stop any currently playing music
        button.classList.add("highlight");
        playing = true;
        currentTimeouts = sequence.map((item, index) => {
            return setTimeout(() => {
                if (!playing) return;
                const key = document.querySelector(`.key[data-note="${item.note}"]`);
                synth.triggerAttackRelease(item.note, "8n");
                animateKey(key);
                createBubble();
            }, index * item.duration);
        });

        const totalDuration = sequence.reduce((total, item) => total + item.duration, 0);
        setTimeout(() => {
            button.classList.remove("highlight");
            playing = false;
        }, totalDuration);
    }

    function stopMusic() {
        playing = false; // Set playing flag to false
        currentTimeouts.forEach(timeout => clearTimeout(timeout)); // Clear all timeouts
        currentTimeouts = [];
        songButtons.forEach(btn => btn.classList.remove("highlight")); // Remove highlight class from buttons
    }

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
        bubbleContainer.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3000);
    }

});

