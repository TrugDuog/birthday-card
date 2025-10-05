const giftBox = document.getElementById('giftBox');
const message = document.getElementById('message');
const birthdayText = document.getElementById("birthdayText");
const birthdayMusic = document.getElementById("birthdayMusic");

const texts = [
    "Chúc chế Ba sinh nhật dzui dẻ, bớt cà khịa thiên hạ cho trái đất được yên bình một ngày nhaaa 🤣🎂",
    "Tuổi mới xinh lung linh như ánh đèn pha, cười tỏa nắng làm người ta xỉu up xỉu down 😍✨",
    "Chúc chế Ba ăn ngon ngủ kỹ, tiền vô như suối, phúc lộc dạt dào.🚀💸"
];

// Confetti
function createConfetti(number) {
    for (let i = 0; i < number; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 500000);
    }
}

// Typewriter effect + GIF quà
function typeWriter(texts, element, textIndex = 0, charIndex = 0) {
    if (textIndex >= texts.length) {
        setTimeout(() => {
            const imgGift = document.createElement('img');
            imgGift.src = './123.gif';
            imgGift.classList.add('img-gift');
            message.appendChild(imgGift);
        }, 500);
        return;
    }

    const text = texts[textIndex];
    if (charIndex < text.length) {
        element.innerHTML += text.charAt(charIndex);
        setTimeout(() => typeWriter(texts, element, textIndex, charIndex + 1), 40);
    } else {
        element.innerHTML += '<br>';
        setTimeout(() => typeWriter(texts, element, textIndex + 1, 0), 1500);
    }
}

// Fireworks
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Firework {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height / 2;
        this.speed = 3 + Math.random() * 3;
        this.exploded = false;
        this.particles = [];
    }

    update() {
        if (!this.exploded) {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.exploded = true;
                for (let i = 0; i < 30; i++) {
                    this.particles.push(new Particle(this.x, this.y));
                }
            }
        } else {
            this.particles.forEach(p => p.update());
            this.particles = this.particles.filter(p => !p.dead);
        }
    }

    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        } else {
            this.particles.forEach(p => p.draw());
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.alpha = 1;
        this.dead = false;
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        if (this.alpha <= 0) this.dead = true;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

let fireworks = [];

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(fw => {
        fw.update();
        fw.draw();
    });
    fireworks = fireworks.filter(fw => !fw.exploded || fw.particles.length > 0);
    requestAnimationFrame(animate);
}

animate();

// Mở quà
giftBox.addEventListener('click', () => {
    giftBox.style.display = 'none';
    birthdayMusic.play();

    setTimeout(() => {
        message.classList.remove('hidden');
        message.classList.add('show');
        typeWriter(texts, birthdayText);
        createConfetti(50);

        // Pháo hoa
        for (let i = 0; i < 20; i++) fireworks.push(new Firework());
        setInterval(() => fireworks.push(new Firework()), 200);
    }, 1000);
});
