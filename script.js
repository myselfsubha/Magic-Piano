document.addEventListener("DOMContentLoaded", () => {
    const keys = document.querySelectorAll(".key");
    const synth = new Tone.Synth().toDestination();
    const demoBtn = document.getElementById("demo-btn");
    const tumHiHoBtn = document.getElementById("tum-hi-ho-btn");
    const bubbleContainer = document.querySelector('.bubble-container');

    // Simplified demo sequence
    const demoSequence = [
        { note: "C4", duration: 300 },
        { note: "E4", duration: 300 },
        { note: "G4", duration: 300 },
        { note: "C5", duration: 300 },
        { note: "B4", duration: 300 },
        { note: "G4", duration: 300 },
        { note: "E4", duration: 300 },
        { note: "C4", duration: 300 },
        { note: "D4", duration: 300 },
        { note: "F4", duration: 300 },
        { note: "A4", duration: 300 },
        { note: "D5", duration: 300 },
        { note: "C5", duration: 300 },
        { note: "A4", duration: 300 },
        { note: "F4", duration: 300 },
        { note: "D4", duration: 300 }
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
            const note = key.getAttribute("data-note");
            synth.triggerAttackRelease(note, "8n");
            animateKey(key);
            createBubble();
        });
    });

    demoBtn.addEventListener("click", () => playDemo(demoSequence));
    tumHiHoBtn.addEventListener("click", () => playDemo(tumHiHoSequence));

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

    function playDemo(sequence) {
        sequence.forEach((item, index) => {
            setTimeout(() => {
                const key = document.querySelector(`.key[data-note="${item.note}"]`);
                synth.triggerAttackRelease(item.note, "8n");
                animateKey(key);
                createBubble();
            }, index * item.duration);
        });
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
