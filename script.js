// script.js

      // Navbar scroll state and responsive menu
      const nav = document.getElementById("nav");
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");
      const mobileMenu = window.matchMedia("(max-width: 968px)");

      const updateNav = () => nav.classList.toggle("scrolled", window.scrollY > 20);
      const setMenuOpen = (open) => {
        hamburger.classList.toggle("active", open);
        navLinks.classList.toggle("open", open);
        hamburger.setAttribute("aria-expanded", String(open));
        hamburger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
      };

      updateNav();
      window.addEventListener("scroll", updateNav, { passive: true });
      hamburger.addEventListener("click", () => {
        setMenuOpen(hamburger.getAttribute("aria-expanded") !== "true");
      });
      navLinks.querySelectorAll("a").forEach((link) =>
        link.addEventListener("click", () => setMenuOpen(false)),
      );
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenuOpen(false);
      });
      mobileMenu.addEventListener("change", () => setMenuOpen(false));

      // Reveal on scroll
      const reveals = document.querySelectorAll(".reveal");
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
          });
        },
        { threshold: 0.1 },
      );
      reveals.forEach((r) => io.observe(r));

      // Counter animation
      const counters = document.querySelectorAll("[data-count]");
      const counterIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target;
              const target = parseInt(el.dataset.count);
              let current = 0;
              const step = target / 60;
              const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                el.textContent =
                  Math.floor(current) + (target > 100 ? "+" : "");
              }, 20);
              counterIO.unobserve(el);
            }
          });
        },
        { threshold: 0.5 },
      );
      counters.forEach((c) => counterIO.observe(c));

      // Package selection
      document.querySelectorAll(".package").forEach((p) => {
        p.addEventListener("click", () => {
          document
            .querySelectorAll(".package")
            .forEach((x) => x.classList.remove("selected"));
          p.classList.add("selected");
        });
      });

      // Form submit
      document.getElementById("regForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = e.target.querySelector(".btn-submit");
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> PENDAFTARAN BERJAYA!';
        btn.style.background = "#fff";
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.style.background = "";
          e.target.reset();
        }, 3000);
      });

      // Event booking
      document.querySelectorAll(".btn-book").forEach((b) => {
        b.addEventListener("click", () => {
          const orig = b.textContent;
          b.textContent = "✓ Slot Ditempah";
          b.style.background = "#fff";
          setTimeout(() => {
            b.textContent = orig;
            b.style.background = "";
          }, 2000);
        });
      });
