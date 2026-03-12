import "./style.css";

// ── Mobile Menu ──────────────────────────────────
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIconOpen = document.getElementById("menu-icon-open");
const menuIconClose = document.getElementById("menu-icon-close");

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = !mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden");
  menuIconOpen.classList.toggle("hidden");
  menuIconClose.classList.toggle("hidden");
});

// Close mobile menu on link click
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIconOpen.classList.remove("hidden");
    menuIconClose.classList.add("hidden");
  });
});

// ── Accordion (Services) ─────────────────────────
document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".accordion-item");
    const content = item.querySelector(".accordion-content");
    const chevron = btn.querySelector(".accordion-chevron");
    const isOpen = !content.classList.contains("hidden");

    // Close all
    document.querySelectorAll(".accordion-content").forEach((c) => c.classList.add("hidden"));
    document.querySelectorAll(".accordion-chevron").forEach((c) => c.classList.remove("rotate-180"));
    document.querySelectorAll(".accordion-btn").forEach((b) => b.setAttribute("aria-expanded", "false"));

    // Open clicked if it was closed
    if (!isOpen) {
      content.classList.remove("hidden");
      chevron.classList.add("rotate-180");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// ── Benefit Cards ────────────────────────────────
const benefitData = {
  cost: {
    title: "Cost Savings",
    text: "Captive insurance can provide significant cost savings compared to traditional commercial insurance by eliminating broker fees, reducing administrative expenses, and allowing businesses to retain underwriting profits. Many businesses see premium reductions of 20-40% compared to traditional markets.",
  },
  coverage: {
    title: "Customized Coverage",
    text: "Captive insurance allows businesses to tailor their coverage to their specific risk profile, ensuring they have the protection they need without paying for unnecessary coverage. This means you can insure risks that traditional carriers won't cover or price prohibitively.",
  },
  risk: {
    title: "Enhanced Risk Management",
    text: "Captive insurance gives businesses greater control over their risk management strategies, enabling them to implement risk mitigation measures and better manage their exposures. This proactive approach leads to fewer claims and lower long-term costs.",
  },
  profit: {
    title: "Increased Profitability",
    text: "By reducing insurance costs and retaining underwriting profits, captive insurance can improve a business's overall profitability and financial performance. When claims are lower than premiums, your captive retains the profit rather than an external insurer.",
  },
  cashflow: {
    title: "Improved Cash Flow",
    text: "Captive insurance provides businesses with improved cash flow by allowing them to retain premiums that would otherwise be paid to traditional insurers. Investment income on reserves stays within your organization, enhancing overall financial flexibility.",
  },
  tax: {
    title: "Tax Advantages",
    text: "Captive insurance can offer certain tax advantages, such as the ability to deduct premiums paid to the captive and the potential for tax-deferred growth of the captive's reserves. Properly structured captives may qualify for favorable tax treatment under IRC Section 831(b).",
  },
};

const benefitDetail = document.getElementById("benefit-detail");
const benefitDetailContent = document.getElementById("benefit-detail-content");

document.querySelectorAll(".benefit-card").forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.benefit;
    const data = benefitData[key];
    benefitDetailContent.innerHTML = `<h4 class="text-xl font-bold text-aurora-slate mb-3">${data.title}</h4><p class="text-aurora-gray leading-relaxed">${data.text}</p>`;
    benefitDetail.classList.remove("hidden");
    benefitDetail.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

document.getElementById("benefit-close").addEventListener("click", () => {
  benefitDetail.classList.add("hidden");
});

// ── Market Trends Toggle ─────────────────────────
const marketTrendsBtn = document.getElementById("market-trends-btn");
const marketTrendsPanel = document.getElementById("market-trends-panel");
const trendsChevron = document.getElementById("trends-chevron");

marketTrendsBtn.addEventListener("click", () => {
  marketTrendsPanel.classList.toggle("hidden");
  trendsChevron.classList.toggle("rotate-180");
  if (!marketTrendsPanel.classList.contains("hidden")) {
    marketTrendsBtn.classList.add("rounded-b-none");
  } else {
    marketTrendsBtn.classList.remove("rounded-b-none");
  }
});

// ── Leader Bio Toggle ────────────────────────────
document.querySelectorAll(".leader-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".leader-card");
    const bio = card.querySelector(".leader-bio");
    const chevron = btn.querySelector("svg");
    const span = btn.querySelector("span");
    bio.classList.toggle("hidden");
    chevron.classList.toggle("rotate-180");
    span.textContent = bio.classList.contains("hidden") ? "View full bio" : "Hide bio";
  });
});

// ── Industry Tabs ────────────────────────────────
document.querySelectorAll(".industry-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    // Reset all tabs
    document.querySelectorAll(".industry-tab").forEach((t) => {
      t.classList.remove("bg-aurora-slate", "text-white", "active");
      t.classList.add("text-aurora-gray");
    });
    // Activate clicked tab
    tab.classList.add("bg-aurora-slate", "text-white", "active");
    tab.classList.remove("text-aurora-gray");

    // Show correct panel
    document.querySelectorAll(".industry-panel").forEach((p) => p.classList.add("hidden"));
    document.getElementById(`panel-${tab.dataset.industry}`).classList.remove("hidden");
  });
});

// ── Navbar scroll effect ─────────────────────────
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 100) {
    navbar.classList.add("bg-white/95", "shadow-sm");
  } else {
    navbar.classList.remove("bg-white/95", "shadow-sm");
  }
  lastScroll = currentScroll;
});

// ── Scroll animations (Intersection Observer) ────
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("animate-section");
  observer.observe(section);
});

// ── Contact form (placeholder) ───────────────────
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = "Thank you! We'll be in touch.";
  btn.disabled = true;
  btn.classList.add("opacity-70");
});
