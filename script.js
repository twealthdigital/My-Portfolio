 /* ──────────────────────────────────────────────
       AOS
    ────────────────────────────────────────────── */
      AOS.init({ duration: 600, once: true });

      /* ──────────────────────────────────────────────
       TYPEWRITER
    ────────────────────────────────────────────── */
      const roles = [
        "Automation Architect",
        "CRM Strategist",
        "Email Marketing Pro",
        "AI Workflow Engineer",
        "Adeola Fortune",
      ];
      let roleIdx = 0,
        charIdx = 0,
        isDeleting = false;
      const typedSpan = document.getElementById("typed-word");
      function typeEffect() {
        if (!typedSpan) return;
        const current = roles[roleIdx];
        if (isDeleting) {
          typedSpan.innerText = current.substring(0, charIdx - 1);
          charIdx--;
          if (charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(typeEffect, 400);
            return;
          }
        } else {
          typedSpan.innerText = current.substring(0, charIdx + 1);
          charIdx++;
          if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
          }
        }
        setTimeout(typeEffect, 90);
      }
      typeEffect();

      /* ──────────────────────────────────────────────
       COUNTER ANIMATION — fixed for "2.4M+"
    ────────────────────────────────────────────── */
      function animateCounter(el, end, suffix, duration) {
        let start = 0,
          startTs = null;
        const isFloat = !Number.isInteger(end);
        const step = (ts) => {
          if (!startTs) startTs = ts;
          const progress = Math.min((ts - startTs) / duration, 1);
          const val = isFloat
            ? (progress * end).toFixed(1)
            : Math.floor(progress * end);
          el.textContent = val + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }

      function isInViewport(el) {
        const r = el.getBoundingClientRect();
        return r.top <= window.innerHeight && r.bottom >= 0;
      }
      let statsAnimated = false;
      function checkStats() {
        if (statsAnimated) return;
        const s1 = document.getElementById("stat1");
        if (s1 && isInViewport(s1)) {
          statsAnimated = true;
          animateCounter(s1, 347, "+", 2000);
          animateCounter(document.getElementById("stat2"), 128, "+", 2000);
          animateCounter(document.getElementById("stat3"), 2.4, "M+", 2000);
        }
      }
      window.addEventListener("scroll", checkStats);
      window.addEventListener("load", checkStats);

      /* ──────────────────────────────────────────────
       THEME TOGGLE
    ────────────────────────────────────────────── */
      document
        .getElementById("themeToggle")
        .addEventListener("click", () =>
          document.body.classList.toggle("light"),
        );
      window.addEventListener("scroll", () =>
        document
          .getElementById("navbar")
          .classList.toggle("scrolled", window.scrollY > 50),
      );

      /* ──────────────────────────────────────────────
       MOBILE MENU — with hamburger icon toggle
    ────────────────────────────────────────────── */
      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("navMenu");

      function openMobileMenu() {
        navMenu.classList.remove("closing");
        navMenu.classList.add("show");
        hamburger.classList.add("active");
      }
      function closeMobileMenu() {
        if (!navMenu.classList.contains("show")) return;
        navMenu.classList.add("closing");
        hamburger.classList.remove("active");
        navMenu.addEventListener(
          "animationend",
          () => {
            navMenu.classList.remove("show", "closing");
          },
          { once: true },
        );
      }

      hamburger.addEventListener("click", () => {
        navMenu.classList.contains("show")
          ? closeMobileMenu()
          : openMobileMenu();
      });

      document.addEventListener("click", (e) => {
        if (
          navMenu.classList.contains("show") &&
          !navMenu.contains(e.target) &&
          !hamburger.contains(e.target)
        )
          closeMobileMenu();
      });

      /* ──────────────────────────────────────────────
       PARTICLES
    ────────────────────────────────────────────── */
      const canvas = document.getElementById("particlesCanvas"),
        ctx = canvas.getContext("2d");
      let particles = [];
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      for (let i = 0; i < 50; i++)
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          alpha: Math.random() * 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
        });
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,102,255,${p.alpha * 0.3})`;
          ctx.fill();
        });
        requestAnimationFrame(animateParticles);
      }
      animateParticles();

      /* ──────────────────────────────────────────────
       FIREWORKS
    ────────────────────────────────────────────── */
      let fwCanvas, fwCtx;
      function showFireworks() {
        fwCanvas = document.getElementById("fireworks-canvas");
        fwCtx = fwCanvas.getContext("2d");
        fwCanvas.width = window.innerWidth;
        fwCanvas.height = window.innerHeight;
        let pts = [];
        for (let i = 0; i < 100; i++)
          pts.push({
            x: fwCanvas.width / 2,
            y: fwCanvas.height / 2,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10 - 4,
            size: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360},100%,60%)`,
            life: 1,
            decay: 0.02,
          });
        let aid;
        function loop() {
          fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
          let allDead = true;
          pts.forEach((p) => {
            if (p.life > 0) {
              allDead = false;
              p.x += p.vx;
              p.y += p.vy;
              p.vy += 0.2;
              p.life -= p.decay;
              fwCtx.globalAlpha = p.life;
              fwCtx.fillStyle = p.color;
              fwCtx.beginPath();
              fwCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              fwCtx.fill();
            }
          });
          if (allDead) {
            cancelAnimationFrame(aid);
            fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
          } else {
            aid = requestAnimationFrame(loop);
          }
        }
        loop();
        setTimeout(() => {
          if (aid) cancelAnimationFrame(aid);
          fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
        }, 2500);
      }

      /* ──────────────────────────────────────────────
       SKILLS DATA & RENDER
    ────────────────────────────────────────────── */
      const skillCategories = [
        {
          name: "Website & Dev",
          icon: "fas fa-code",
          skills: ["Figma", "React", "Webflow", "Tailwind", "HTML/CSS", "JavaScript", "Wordpress", "Wix", "Shopify", "Webflow"],
        },
        {
          name: "Automation",
          icon: "fas fa-cogs",
          skills: ["Zapier", "Make.com", "n8n", "Python"],
        },
        {
          name: "Email Marketing",
          icon: "fas fa-envelope",
          skills: ["Klaviyo", "Mailchimp", "ActiveCampaign", "SendGrid"],
        },
        {
          name: "CRM Systems",
          icon: "fas fa-users",
          skills: ["Salesforce", "HubSpot", "Zoho", "GoHighLevel", "Make.com"],
        },
        {
          name: "Marketing Automation",
          icon: "fas fa-bullhorn",
          skills: ["Marketo", "Customer.io", "Omnisend"],
        },
        {
          name: "SEO",
          icon: "fas fa-search",
          skills: ["Keyword Research", "Ahrefs", "SEMrush", "Google SEO"],
        },
        {
          name: "Data Enrichment",
          icon: "fas fa-database",
          skills: ["Apollo.io", "Clearbit", "Hunter.io", "Excel", "Clay.com", "Make.com"],
        },
        {
          name: "AI Automation",
          icon: "fas fa-robot",
          skills: ["OpenAI API", "LangChain", "RPA", "Python AI Libraries"],
        },
        {
          name: "AI Prompt Engineering",
          icon: "fas fa-message",
          skills: ["ChatGPT", "Claude", "Midjourney"],
        },
        {
          name: "Social Media/Management",
          icon: "fab fa-instagram",
          skills: ["Facebook", "Twitter", "Instagram", "TikTok","Buffer", "Hootsuite", "Later"],
        },
      ];
      const skillsContainer = document.getElementById("skillsContainer");
      skillCategories.forEach((cat) => {
        const card = document.createElement("div");
        card.className = "skill-card glass-effect";
        card.innerHTML = `<i class="${cat.icon}"></i><h3>${cat.name}</h3><div class="skill-tags">${cat.skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}</div>`;
        skillsContainer.appendChild(card);
      });

      /* ──────────────────────────────────────────────
       PORTFOLIO DATA & RENDER
    ────────────────────────────────────────────── */
      const portfolioCategories = skillCategories.map((cat, idx) => {
        if (cat.name === "Website & Dev") {
          return {
            name: cat.name,
            icon: cat.icon,
            projects: [
              {
                title: "Fitness Website",
                desc: "Fitwear is a fitness lifestyle brand offering workout gear, training services, and fitness resources for an active lifestyle.",
                thumbnail: "webimg1.png",
                modalImg: "webimg1.png",
                link: "https://fitwear.wpengine.com/",
                category: "Website & Dev",
              },
              {
                title: "Logististics Website",
                desc: "Equita is a global logistics company providing warehousing, freight, customs, and supply chain solutions worldwide",
                thumbnail: "webimg2.png",
                modalImg: "webimg2.png",
                link: "https://demo.farost.net/equita/#",
                category: "Website & Dev",
              },
              {
                title: "Social Enterprise Website",
                desc: "INNOCLUSION is a social initiative creating an inclusive, sustainable community where neurodivergent adults can build meaningful lives through work, support, and connection.",
                thumbnail: "webimg3.png",
                modalImg: "webimg3.png",
                link: "https://innoclusion.org/",
                category: "Website & Dev",
              },
              {
                title: "Spa Website",
                desc: "DreamSalon is a premium salon and grooming website offering hairstyling, skincare, barbering, and beauty services for modern clients.",
                thumbnail: "webimg4.png",
                modalImg: "webimg4.png",
                link: "https://therma.modeltheme.com/",
                category: "Website & Dev",
              },
              {
                title: "Wellness and Homeopathy Website",
                desc: "Renew Mind Sense is a wellness platform promoting healthier living through natural remedies, conscious habits, and homeopathic guidance.",
                thumbnail: "webimg5.png",
                modalImg: "webimg5.png",
                link: "https://renewmindsense.com/",
                category: "Website & Dev",
              },
              {
                title:
                  "Medical Billing and Healthcare Administration Services Website.",
                desc: "Oswego Medical Billing Solutions is a medical billing and healthcare support website providing insurance billing, credentialing, collections, and administrative services for healthcare practices.",
                thumbnail: "webimg6.png",
                modalImg: "webimg6.png",
                link: "https://oswegombs.com/",
                category: "Website & Dev",
              },
            ],
          };
        }
        return {
          name: cat.name,
          icon: cat.icon,
          projects: Array.from({ length: 6 }, (_, i) => ({
            title: `${cat.name} Implementation ${i + 1}`,
            desc: `System delivering +${20 + i * 5}% efficiency improvement.`,
            img: `https://picsum.photos/id/${((idx * 6 + i + 40) % 100) + 100}/600/400`,
            link: `#`,
            category: cat.name,
          })),
        };
      });

      const portfolioMain = document.getElementById("portfolioMain");
      const portfolioDetail = document.getElementById("portfolioDetail");
      const categoriesGrid = document.getElementById("portfolioCategoriesGrid");
      const projectListContainer = document.getElementById(
        "projectListContainer",
      );
      const backBtn = document.getElementById("backToCategories");

      function renderCategoryGrid() {
        categoriesGrid.innerHTML = "";
        portfolioCategories.forEach((cat) => {
          const tile = document.createElement("div");
          tile.className = "category-tile glass-effect";
          tile.innerHTML = `<i class="${cat.icon}"></i><h3>${cat.name}</h3><p style="font-size:0.65rem;">6 case studies</p>`;
          tile.addEventListener("click", () => showCategoryProjects(cat));
          categoriesGrid.appendChild(tile);
        });
      }
      function showCategoryProjects(category) {
        projectListContainer.innerHTML = `<h3 style="margin-bottom:1rem;font-size:1.2rem;"><i class="${category.icon}" style="color:#0066ff;"></i> ${category.name} — Implementations</h3><div class="project-grid" id="projectGrid"></div>`;
        const grid = projectListContainer.querySelector("#projectGrid");
        category.projects.forEach((proj) => {
          const card = document.createElement("div");
          card.className = "project-card glass-effect";
          card.innerHTML = `<img src="${proj.thumbnail || proj.img}" alt="${proj.title}" style="height:170px; width:100%; object-fit:cover; object-position:top 0%;"><h4>${proj.title}</h4><p>${proj.desc}</p><span style="color:#0066ff;font-size:0.7rem;">View →</span>`;
          card.addEventListener("click", () =>
            openModal({ ...proj, img: proj.modalImg || proj.img }),
          );
          grid.appendChild(card);
        });
        portfolioMain.style.display = "none";
        portfolioDetail.style.display = "block";
      }
      backBtn.addEventListener("click", () => {
        portfolioMain.style.display = "block";
        portfolioDetail.style.display = "none";
      });
      renderCategoryGrid();

      // Floating card → portfolio filter
      document.querySelectorAll(".floating-card").forEach((card) => {
        card.addEventListener("click", () => {
          const filterName = card.getAttribute("data-filter");
          const targetCategory = portfolioCategories.find(
            (c) => c.name === filterName,
          );
          if (targetCategory) {
            showCategoryProjects(targetCategory);
            showPage("portfolio");
          }
        });
      });

      /* ──────────────────────────────────────────────
       PROJECT MODAL
    ────────────────────────────────────────────── */
      const modal = document.getElementById("projectModal");
      function openModal(project) {
        document.getElementById("modalImg").src = project.img;
        document.getElementById("modalTitle").innerText = project.title;
        document.getElementById("modalDesc").innerText = project.desc;
        document.getElementById("modalLink").href = project.link;
        modal.style.display = "flex";
      }
      document
        .querySelector(".modal-close")
        .addEventListener("click", () => (modal.style.display = "none"));
      window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
      });

      /* ──────────────────────────────────────────────
       PAGE NAVIGATION — hamburger closed on every nav
    ────────────────────────────────────────────── */
      const pages = {
        home: "home-page",
        about: "about-page",
        skills: "skills-page",
        portfolio: "portfolio-page",
        hire: "hire-page",
      };
      const navLinks = document.querySelectorAll(".nav-link");

      function showPage(pageId) {
        Object.values(pages).forEach((pid) =>
          document.getElementById(pid).classList.remove("active-page"),
        );
        document.getElementById(pages[pageId]).classList.add("active-page");
        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`.nav-link[data-page="${pageId}"]`)
          ?.classList.add("active");
        window.scrollTo(0, 0);
        // Always close mobile menu + reset hamburger icon
        closeMobileMenu();
        if (pageId === "portfolio") {
          portfolioMain.style.display = "block";
          portfolioDetail.style.display = "none";
        }
      }

      navLinks.forEach((link) =>
        link.addEventListener("click", (e) => {
          e.preventDefault();
          showPage(link.getAttribute("data-page"));
        }),
      );

      document
        .getElementById("exploreWorkBtn")
        .addEventListener("click", () => showPage("portfolio"));
      document
        .getElementById("hireNavBtn")
        .addEventListener("click", () => showPage("hire"));
      document
        .getElementById("previewSkills")
        .addEventListener("click", () => showPage("skills"));
      document
        .getElementById("previewPortfolio")
        .addEventListener("click", () => showPage("portfolio"));
      document
        .getElementById("previewHire")
        .addEventListener("click", () => showPage("hire"));
      document
        .getElementById("homeToPortfolioBtn")
        ?.addEventListener("click", () => showPage("portfolio"));
      document
        .getElementById("homeToHireBtn")
        ?.addEventListener("click", () => showPage("hire"));
      document
        .getElementById("aboutToPortfolioBtn")
        ?.addEventListener("click", () => showPage("portfolio"));
      document
        .getElementById("aboutToHireBtn")
        ?.addEventListener("click", () => showPage("hire"));
      document
        .getElementById("skillsToPortfolioBtn")
        ?.addEventListener("click", () => showPage("portfolio"));
      document
        .getElementById("skillsToHireBtn")
        ?.addEventListener("click", () => showPage("hire"));

      /* ──────────────────────────────────────────────
       DOWNLOAD RESUME
    ────────────────────────────────────────────── */
      /* ──────────────────────────────────────────────
   DOWNLOAD RESUME
───────────────────────────────────────────── */
      document
        .getElementById("downloadResumeBtn")
        .addEventListener("click", () => {
          // Force download the PDF file
          const link = document.createElement("a");
          link.href = "AdeolaAdetolaFortuneResume.pdf";
          link.download = "AdeolaAdetolaFortuneResume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      /* ──────────────────────────────────────────────
       CONTACT FORM
    ────────────────────────────────────────────── */
      function showSuccessModal() {
        showFireworks();
        const overlay = document.createElement("div");
        overlay.className = "success-modal-overlay";
        overlay.innerHTML = `<div class="success-modal"><div class="success-check-icon"><i class="fas fa-check-circle"></i></div><h3>Message Sent!</h3><p>Thank you for reaching out.<br><strong>I'll Get in touch as soon as possible.</strong></p><button id="closeSuccessModal">Got it</button></div>`;
        document.body.appendChild(overlay);
        overlay
          .querySelector("#closeSuccessModal")
          .addEventListener("click", () => overlay.remove());
        overlay.addEventListener("click", (e) => {
          if (e.target === overlay) overlay.remove();
        });
      }
      const hireForm = document.getElementById("hireForm");
      if (hireForm) {
        hireForm.addEventListener("submit", async function (e) {
          e.preventDefault();
          const submitBtn = document.getElementById("submitFormBtn");
          const orig = submitBtn.innerHTML;
          submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';
          submitBtn.disabled = true;

          try {
            const res = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: new FormData(hireForm),
            });
            const data = await res.json();

            if (data.success) {
              showSuccessModal();
              hireForm.reset();
            } else {
              alert("Failed to send. Please try again.");
            }
          } catch (err) {
            alert(
              "Network error. Please email directly: adeolafortuneadeola12345@gmail.com",
            );
          } finally {
            submitBtn.innerHTML = orig;
            submitBtn.disabled = false;
          }
        });
      }

      /* ──────────────────────────────────────────────
       TESTIMONIAL SWIPER — mobile-correct config
    ────────────────────────────────────────────── */
      const isMobile = () => window.innerWidth <= 768;

      const testimonialSwiper = new Swiper("#testimonialSwiper", {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        speed: 500,
        /* centeredSlides only on desktop (it causes partial-slide bleed on mobile) */
        centeredSlides: !isMobile(),
        slidesPerView: 1,
        spaceBetween: 16,
        breakpoints: {
          /* ≥ 640px: show 1 centred slide on tablet-ish */
          640: {
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 20,
          },
          /* ≥ 769px (desktop): show 3, centre active */
          769: {
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 24,
          },
        },
      });

      document
        .querySelector(".swiper-button-prev-custom")
        ?.addEventListener("click", () => testimonialSwiper.slidePrev(300));
      document
        .querySelector(".swiper-button-next-custom")
        ?.addEventListener("click", () => testimonialSwiper.slideNext(300));

      /* ──────────────────────────────────────────────
       FOOTER MODAL CONTENT
    ────────────────────────────────────────────── */
      const footerModal = document.getElementById("footerModal");
      const modalPageContent = document.getElementById("modalPageContent");
      const footerPageContent = {
        "case-studies": {
          title: "Case Studies",
          content: `<p>Detailed case studies from recent client implementations.</p><h3 style="color:#00ccff;margin:1.5rem 0 0.8rem;">SaaS Platform (Series A)</h3><p><strong>Challenge:</strong> Manual lead-to-cash cycle causing 2-3 week delays.</p><p><strong>Result:</strong> 35% faster sales cycle, $1.8M additional pipeline in 6 months.</p><h3 style="color:#00ccff;margin:1.5rem 0 0.8rem;">E-commerce Brand</h3><p><strong>Challenge:</strong> 78% abandoned cart rate, 12% email open rates.</p><p><strong>Result:</strong> 180% increase in recovered revenue, open rates climbed to 34%.</p><h3 style="color:#00ccff;margin:1.5rem 0 0.8rem;">B2B Agency</h3><p><strong>Challenge:</strong> Inconsistent lead flow, no systematic follow-up.</p><p><strong>Result:</strong> 2.5x more qualified meetings monthly, 65% reduction in lead research time.</p><h3 style="color:#00ccff;margin:1.5rem 0 0.8rem;">Real Estate Investment Firm</h3><p><strong>Challenge:</strong> 500+ leads/month across spreadsheets and Facebook — nothing centralized.</p><p><strong>Result:</strong> Lead response time under 5 minutes, 42% increase in appointment conversion.</p>`,
        },
        documentation: {
          title: "Documentation",
          content: `<p>Every project includes comprehensive documentation so your team can manage systems independently.</p><h3 style="color:#00ccff;margin:1.5rem 0 0.8rem;">What's Included:</h3><ul style="margin:0.5rem 0 1rem 2rem;"><li>Workflow Architecture Diagrams</li><li>Step-by-Step Setup Guides with screenshots</li><li>Video Tutorial Library (15-30 min walkthroughs)</li><li>Troubleshooting Guide</li><li>Maintenance Schedule</li><li>Scaling Guidelines</li></ul><p>All documentation delivered via shared Google Drive or Notion workspace. You own everything.</p>`,
        },
        support: {
          title: "Support",
          content: `<p>Ongoing support to ensure systems continue working as your business grows.</p><h3 style="color:#00ccff;margin:1.5rem 0 0.8rem;">Standard (Included):</h3><ul style="margin:0.5rem 0 1rem 2rem;"><li>30 days free technical support</li><li>Email response within 4 business hours</li><li>Bug fixes and critical issue resolution</li></ul><h3 style="color:#00ccff;margin:1rem 0 0.8rem;">Emergency:</h3><p><strong>+234 702 572 3662</strong> — response within 1 hour for system-down situations.</p>`,
        },
        privacy: {
          title: "Privacy Policy",
          content: `<p><strong>Last Updated:</strong> 2026</p><p>Fortune Digital respects your privacy.</p><h3 style="color:#00ccff;margin:1.5rem 0 0.8rem;">Information Collected:</h3><ul style="margin:0.5rem 0 1rem 2rem;"><li>Contact information provided via forms</li><li>Project details shared during consultations</li><li>Anonymous website analytics</li></ul><h3 style="color:#00ccff;margin:1rem 0 0.8rem;">Data Sharing:</h3><p>I do not sell, trade, or rent your personal information. Contact: <strong>adeolafortuneadeola12345@gmail.com</strong></p>`,
        },
        terms: {
          title: "Terms of Service",
          content: `<p><strong>Last Updated:</strong> 2026</p><h3 style="color:#00ccff;margin:1.5rem 0 0.8rem;">Payment Terms:</h3><ul style="margin:0.5rem 0 1rem 2rem;"><li>50% deposit required before project start</li><li>50% balance due upon completion</li><li>Payment via bank transfer or PayPal</li></ul><h3 style="color:#00ccff;margin:1rem 0 0.8rem;">Intellectual Property:</h3><p>You own all final deliverables. Contact: <strong>adeolafortuneadeola12345@gmail.com</strong></p>`,
        },
      };

      document.querySelectorAll(".footer-page-link").forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const content = footerPageContent[link.getAttribute("data-page")];
          if (content) {
            modalPageContent.innerHTML = `<h2 style="color:#0066ff;margin-bottom:1rem;">${content.title}</h2>${content.content}`;
            footerModal.classList.add("active-modal");
            document.body.style.overflow = "hidden";
          }
        });
      });
      document.querySelectorAll(".footer-nav-link").forEach((link) =>
        link.addEventListener("click", (e) => {
          e.preventDefault();
          showPage("skills");
        }),
      );
      document
        .querySelector(".footer-modal-close")
        .addEventListener("click", () => {
          footerModal.classList.remove("active-modal");
          document.body.style.overflow = "";
        });
      footerModal.addEventListener("click", (e) => {
        if (e.target === footerModal) {
          footerModal.classList.remove("active-modal");
          document.body.style.overflow = "";
        }
      });

      window.addEventListener("resize", () => {
        if (fwCanvas) {
          fwCanvas.width = window.innerWidth;
          fwCanvas.height = window.innerHeight;
        }
      });
