



document.addEventListener("DOMContentLoaded", () => {
  
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".slider-dot");
  let current = 0,
    timer;

  function goToSlide(n) {
    slides[current].classList.remove("active");
    dots[current]?.classList.remove("active");
    current = (n + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current]?.classList.add("active");
  }

  function startSlider() {
    timer = setInterval(() => goToSlide(current + 1), 6000);
  }

  function resetSlider() {
    clearInterval(timer);
    startSlider();
  }

  document.querySelector(".arrow-next")?.addEventListener("click", () => {
    goToSlide(current + 1);
    resetSlider();
  });
  document.querySelector(".arrow-prev")?.addEventListener("click", () => {
    goToSlide(current - 1);
    resetSlider();
  });
  dots.forEach((d, i) =>
    d.addEventListener("click", () => {
      goToSlide(i);
      resetSlider();
    }),
  );

  if (slides.length) startSlider();

  
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileClose = document.querySelector(".mobile-close");

  hamburger?.addEventListener("click", () => mobileMenu?.classList.add("open"));
  mobileClose?.addEventListener("click", () =>
    mobileMenu?.classList.remove("open"),
  );
  mobileMenu?.addEventListener("click", (e) => {
    if (e.target === mobileMenu) mobileMenu.classList.remove("open");
  });

  
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  reveals.forEach((el) => observer.observe(el));

  
  const ticker = document.querySelector(".ticker-content");
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
  }

  
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });

  
  const form = document.querySelector(".newsletter-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector(".newsletter-input");
    const btn = form.querySelector(".newsletter-btn");
    if (input.value.trim()) {
      btn.textContent = "Subscribed ✓";
      btn.style.background = "#27ae60";
      input.value = "";
      setTimeout(() => {
        btn.textContent = "Subscribe";
        btn.style.background = "";
      }, 3000);
    }
  });

  
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 60);
  });

  
  const btt = document.createElement("button");
  btt.className = "back-to-top";
  btt.innerHTML = '<i class="fas fa-arrow-up"></i>';
  btt.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:999;
    width:44px; height:44px; border-radius:50%;
    background:var(--red); color:#fff; font-size:1rem;
    box-shadow:0 4px 16px rgba(0,0,0,.25);
    display:flex; align-items:center; justify-content:center;
    opacity:0; pointer-events:none;
    transition:opacity .3s ease, transform .3s ease;
    cursor:pointer; border:none;
  `;
  document.body.appendChild(btt);
  window.addEventListener("scroll", () => {
    const show = window.scrollY > 400;
    btt.style.opacity = show ? "1" : "0";
    btt.style.pointerEvents = show ? "auto" : "none";
    btt.style.transform = show ? "translateY(0)" : "translateY(10px)";
  });
  btt.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  
  const progress = document.querySelector(".reading-progress");
  if (progress) {
    window.addEventListener("scroll", () => {
      const h = document.body.scrollHeight - window.innerHeight;
      progress.style.width = (window.scrollY / h) * 100 + "%";
    });
  }

  
  const galleryItems = document.querySelectorAll(".gallery-item");
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.querySelector("img")?.src;
      const caption = item.querySelector(".gallery-caption")?.textContent;
      if (!src) return;
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position:fixed; inset:0; z-index:5000;
        background:rgba(0,0,0,.92); display:flex;
        flex-direction:column; align-items:center; justify-content:center;
        padding:20px; cursor:zoom-out;
      `;
      overlay.innerHTML = `
        <img src="${src}" style="max-width:90vw; max-height:80vh; object-fit:contain; border-radius:3px;">
        <p style="color:rgba(255,255,255,.7);font-family:sans-serif;font-size:.85rem;margin-top:14px;">${caption || ""}</p>
      `;
      overlay.addEventListener("click", () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });  
  const likeBtns = document.querySelectorAll('.like-btn');
  likeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isLiked = btn.classList.toggle('liked');
      const countEl = btn.querySelector('span');
      let count = parseInt(countEl.textContent);
      countEl.textContent = isLiked ? count + 1 : count - 1;
    });
  });

  const commentForm = document.querySelector('.comment-form');
  commentForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = commentForm.querySelector('.comment-submit');
    const inputs = commentForm.querySelectorAll('.comment-input');
    
    btn.textContent = 'Posting...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.textContent = 'Post Comment';
      btn.disabled = false;
      inputs.forEach(input => input.value = '');
      alert('Thank you! Your comment is under review.');
    }, 1500);
  });

  
  const dropBtns = document.querySelectorAll(".mobile-dropdown-btn");
  dropBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".mobile-dropdown-wrapper");
      const submenu = parent?.querySelector(".mobile-submenu");
      btn.classList.toggle("active");
      submenu?.classList.toggle("open");
    });
  });

  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const accountType = document.getElementById('account-type').value;
      const btn = loginForm.querySelector('.btn-auth');
      
      
      const originalText = btn.textContent;
      btn.textContent = 'Authenticating...';
      btn.disabled = true;

      setTimeout(() => {
        
        const username = document.getElementById('email').value.split('@')[0];
        localStorage.setItem('stackly_username', username);

        if (accountType === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else if (accountType === 'user') {
          window.location.href = 'user-dashboard.html';
        } else {
          alert('Please select an account type.');
          btn.textContent = originalText;
          btn.disabled = false;
        }
      }, 1200);
    });
  }

});

