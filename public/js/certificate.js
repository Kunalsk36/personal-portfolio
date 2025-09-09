
/* ================== DATA ================== */
const education = [
  {
    icon: "assets/edu-bsccs.png",
    title: "BSc Computer Science",
    right: "2021 – 2024",
    lines: [
      "University of Mumbai,",
      "Gogate Jogalekar College (Autonomous), Ratnagiri",
      "CGPA: 9.5/10.0"
    ]
  },
  {
    icon: "assets/edu-rpa.png",
    title: "Course in Robotic Process Automation",
    right: "2024",
    lines: [
      "Gained hands-on experience with RPA tools and technologies.",
      "Learned to design, develop, and implement RPA solutions."
    ]
  },
  {
    icon: "assets/edu-uiux.png",
    title: "Course in UI/UX Design",
    right: "2023",
    lines: [
      "Grade Obtained: A+",
      "Acquired practical skills in UI/UX design through a skill-based curriculum.",
      "Designed and developed user-friendly interfaces and engaging user experiences."
    ]
  },
  {
    icon: "assets/edu-gamedev.png",
    title: "Course in Unity 3D",
    right: "2023",
    lines: [
      "Completed an intensive, hands-on course in Unity 3D game development.",
      "Designed and developed interactive and engaging games.",
      "Utilized C# for scripting and implementing game functionality."
    ]
  }
];

const certificates = [
  "./certificates/uiux-certificate.png",
  "./certificates/web-pheonix-certificate.png",
  "./certificates/app-pheonix-certificate.jpg",
  "./certificates/unity3d-certificate.png",
  "./certificates/mu-certificate-bsc-cs.jpg",
  "./certificates/merit-certificate-bsc-cs.jpg",
  "./certificates/IBM-Web-Development-Fundamentals.jpg",
  "./certificates/IBM-click-code-create-beginners-guide-to-web-development.jpg",
  "./certificates/Zep-Certificate.jpg",
  "./certificates/javascript-bootcamp-certificate.png",
  "./certificates/typing-certificate.png",
  "./certificates/GS-Letter.jpg",
  "./certificates/Quick-heal-appreciation-letter.png",
  "./certificates/chatGPT-prompt-engineering-certificate.png",
];

/* ================== RENDER EDUCATION LIST ================== */
(function renderEducation(){
  const list = document.getElementById("eduList");
  list.innerHTML = "";
  education.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "edu-item";
    li.innerHTML = `
      <img class="edu-icon" src="${item.icon}" alt="" loading="lazy" />
      <div class="edu-body text-sm sm:text-lg">
        <h3 class="edu-heading">
          <strong>${item.title}</strong>, <span style="font-weight:600">${item.right}</span>
        </h3>
        <div class="edu-meta">
          ${item.lines.map(t => `<p>${t}</p>`).join("")}
        </div>
      </div>
    `;
    list.appendChild(li);
    if (idx !== education.length - 1) {
      const sep = document.createElement("div");
      sep.className = "edu-sep";
      list.appendChild(sep);
    }
  });
})();

/* ================== CERTIFICATE CAROUSEL ================== */
const certTrack = document.getElementById("certTrack");
const prevBtn   = document.getElementById("certPrev");
const nextBtn   = document.getElementById("certNext");
const dotsWrap  = document.getElementById("certDots");

let startIndex = 0;
let perView = getPerView();

function getPerView(){
  const w = window.innerWidth;
  if (w <= 525) return 1;
  if (w <= 1030) return 2;
  return 3;
}

function clampIndex(idx){
  const maxStart = Math.max(0, certificates.length - perView);
  return Math.min(Math.max(0, idx), maxStart);
}

function renderCertificates(){
  certTrack.innerHTML = certificates
    .slice(startIndex, startIndex + perView)
    .map(src => `
      <figure class="cert-card">
        <img src="${src}" loading="lazy" alt="Certificate" />
      </figure>
    `).join("");

  // dots
  dotsWrap.innerHTML = "";
  const pages = Math.max(1, certificates.length - perView + 1);
  for (let i = 0; i < pages; i++){
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-current", i === startIndex ? "true" : "false");
    b.addEventListener("click", () => { startIndex = i; renderCertificates(); updateNavState(); });
    dotsWrap.appendChild(b);
  }
}

function updateNavState(){
  const maxStart = Math.max(0, certificates.length - perView);
  prevBtn.disabled = (startIndex <= 0);
  nextBtn.disabled = (startIndex >= maxStart);
}

prevBtn.addEventListener("click", () => {
  startIndex = clampIndex(startIndex - 1);
  renderCertificates(); updateNavState();
});
nextBtn.addEventListener("click", () => {
  startIndex = clampIndex(startIndex + 1);
  renderCertificates(); updateNavState();
});

window.addEventListener("resize", () => {
  const newPerView = getPerView();
  if (newPerView !== perView){
    perView = newPerView;
    startIndex = clampIndex(startIndex);
    renderCertificates(); updateNavState();
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});

// init
renderCertificates(); updateNavState();
