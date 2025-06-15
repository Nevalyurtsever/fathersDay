// Hediye kutusuna tıklayınca mesaj göster
function showMessage() {
  const message = document.getElementById("message");
  if (message.classList.contains("hidden")) {
    message.classList.remove("hidden");
  }
}

const playMusicBtn = document.getElementById("play-music-btn");
const bgMusic = document.getElementById("bg-music");

if (playMusicBtn && bgMusic) {
  playMusicBtn.addEventListener("click", () => {
    bgMusic.play().then(() => {
      playMusicBtn.style.display = "none";  // buton gizlensin
    }).catch(err => {
      alert("Müzik çalınamadı, lütfen cihazınızda sesi açın.");
    });
  });
}

// Quiz soruları ve cevapları
const quizData = [
  { q: "Babamın en sevdiği yemek?", a: "Taze fasulye" },
  { q: "Babamın en sevdiği renk?", a: "Siyah" },
  { q: "Babamın en sevdiği kişi kim?", a: "Neval" },
  { q: "Şu an ayrı olsak da bizi bir arada tutan şey nedir?", a: "Güçlü bağımız" },
  { q: "Zaman bize ne yaptı?", a: "Bizi daha da güçlendirdi" },
];

const quizList = document.getElementById("quiz-list");

quizData.forEach(item => {
  const li = document.createElement("li");
  li.style.cursor = "pointer";
  li.style.userSelect = "none";
  li.classList.add("quiz-item");

  const questionText = document.createElement("span");
  questionText.textContent = item.q;
  li.appendChild(questionText);

  const answerText = document.createElement("em");
  answerText.textContent = item.a;
  answerText.style.color = "#ff6677";
  answerText.style.marginTop = "8px";
  answerText.style.display = "none";  // Başlangıçta gizli
  answerText.style.userSelect = "text";
  li.appendChild(answerText);

  li.addEventListener("click", () => {
    if (answerText.style.display === "none") {
      answerText.style.display = "block";
    } else {
      answerText.style.display = "none";
    }
  });

  quizList.appendChild(li);
});

// Yıldız animasyonu (canvas)
const canvas = document.getElementById("star-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.2 + 0.3;
    this.speed = Math.random() * 0.5 + 0.2;
    this.alpha = Math.random() * 0.8 + 0.2;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    this.alpha += (Math.random() - 0.5) * 0.05;

    if (this.alpha > 1) this.alpha = 1;
    if (this.alpha < 0.2) this.alpha = 0.2;

    if (this.y < 0) {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height;
      this.radius = Math.random() * 1.2 + 0.3;
      this.speed = Math.random() * 0.5 + 0.2;
      this.alpha = Math.random() * 0.8 + 0.2;
    }
  }
}

const stars = [];
for (let i = 0; i < 120; i++) {
  stars.push(new Star());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

animate();
