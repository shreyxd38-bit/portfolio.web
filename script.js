// ================= TYPING EFFECT =================
const roles = ["AI Developer", "Backend Engineer", "Problem Solver"];
let i = 0, j = 0, current = "", deleting = false;

function type() {
  const el = document.getElementById("typing");
  if (!el) return; // prevent error if element not present

  current = roles[i];

  el.textContent = current.substring(0, deleting ? j-- : j++);

  if (!deleting && j === current.length) {
    deleting = true;
    return setTimeout(type, 1000);
  }

  if (deleting && j === 0) {
    deleting = false;
    i = (i + 1) % roles.length;
  }

  setTimeout(type, deleting ? 50 : 100);
}
type();


// ================= THEME TOGGLE =================
function toggleTheme() {
  document.body.classList.toggle("light");
}


// ================= GITHUB PROJECTS =================
const projectContainer = document.getElementById("projects-container");

if (projectContainer) {
  fetch("https://api.github.com/users/YOUR_USERNAME/repos")
    .then(res => res.json())
    .then(data => {
      data.slice(0, 6).forEach(repo => {
        const div = document.createElement("div");
        div.className = "project";

        div.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || "No description available"}</p>
        `;

        projectContainer.appendChild(div);
      });
    })
    .catch(() => {
      console.log("GitHub fetch failed");
    });
}


// ================= CONTACT FORM =================
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputs = e.target.elements;

    try {
      await fetch("https://YOUR-BACKEND.onrender.com/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: inputs[0].value,
          email: inputs[1].value,
          message: inputs[2].value
        })
      });

      alert("Message sent 🚀");
      form.reset();

    } catch {
      alert("Error sending message ❌");
    }
  });
}


// ================= MOBILE MENU =================
function toggleMenu() {
  const nav = document.getElementById("nav-links");
  if (nav) nav.classList.toggle("active");
}


// ================= PAGE TRANSITION =================
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // ignore invalid links
    if (!href || href.startsWith("#") || href.startsWith("http")) return;

    const transition = document.getElementById("transition");
    if (!transition) return;

    e.preventDefault();
    transition.classList.add("active");

    setTimeout(() => {
      window.location.href = href;
    }, 500);
  });
});


// ================= SCROLL REVEAL =================
// SCROLL REVEAL (BEST METHOD)
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active"); // 🔥 THIS FIXES IT
    }

  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});
// ================= ULTRA SMOOTH SCROLL =================
const lenis = new Lenis({
  duration: 1.2,        // smoothness
  smooth: true,
  smoothTouch: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);