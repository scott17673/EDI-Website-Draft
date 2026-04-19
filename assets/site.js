(function () {
  const content = window.siteContent;

  if (!content) {
    return;
  }

  const body = document.body;
  const root = body.dataset.root || ".";
  const page = body.dataset.page || "home";
  const links = [
    { key: "home", label: "Home", href: `${root}/` },
    { key: "services", label: "Services", href: `${root}/services/` },
    { key: "areas", label: "Areas", href: `${root}/areas/` },
    { key: "contact", label: "Contact", href: `${root}/contact/` }
  ];

  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  function asset(path) {
    return `${root}/${path}`;
  }

  function renderHeader() {
    if (!header) {
      return;
    }

    header.innerHTML = `
      <nav class="site-nav">
        <a href="${root}/" class="logo" aria-label="${content.company.name} home">
          <img src="${asset("assets/logo-ed-industrial.svg")}" alt="${content.company.name} logo" />
        </a>
        <ul class="nav-links">
          ${links
            .map(
              (link) => `
                <li><a class="${page === link.key ? "is-active" : ""}" href="${link.href}">${link.label}</a></li>
              `
            )
            .join("")}
        </ul>
        <div class="nav-right">
          <a href="${content.company.phoneHref}" class="nav-phone">${content.company.phone}</a>
          <a href="${root}/contact/#contact-form" class="btn btn-primary">Request a quote</a>
        </div>
        <button class="nav-toggle" type="button" aria-expanded="false" data-nav-toggle>Menu</button>
      </nav>
      <div class="nav-wrap" data-nav-wrap>
        <ul class="nav-links">
          ${links
            .map(
              (link) => `
                <li><a class="${page === link.key ? "is-active" : ""}" href="${link.href}">${link.label}</a></li>
              `
            )
            .join("")}
        </ul>
        <div class="nav-right">
          <a href="${content.company.phoneHref}" class="nav-phone">${content.company.phone}</a>
          <a href="${root}/contact/#contact-form" class="btn btn-primary">Request a quote</a>
        </div>
      </div>
    `;

    const toggle = header.querySelector("[data-nav-toggle]");
    const navWrap = header.querySelector("[data-nav-wrap]");

    if (toggle && navWrap) {
      toggle.addEventListener("click", function () {
        const isOpen = navWrap.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
    }
  }

  function renderFooter() {
    if (!footer) {
      return;
    }

    const serviceLinks = content.services
      .map((s) => `<li><a href="${root}/services/#${s.id}">${s.eyebrow}</a></li>`)
      .join("");

    footer.innerHTML = `
      <footer class="site-footer">
        <div class="footer-brand">
          <a href="${root}/" class="logo" aria-label="${content.company.name} home">
            <img src="${asset("assets/logo-ed-industrial.svg")}" alt="${content.company.name} logo" style="height:40px;width:auto" />
          </a>
          <p>${content.company.positioning} Part of the PROBAT Group.</p>
        </div>
        <div class="footer-col">
          <h5>Links</h5>
          <ul>
            ${links.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}
            <li><a href="${content.company.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Services</h5>
          <ul>${serviceLinks}</ul>
        </div>
        <div class="footer-col">
          <h5>Contact</h5>
          <ul>
            <li><a href="${content.company.phoneHref}">${content.company.phone}</a></li>
            <li><a href="${content.company.emailHref}">${content.company.email}</a></li>
            <li><span>${content.company.address.replace(", Canada", "").replace("Milton, ON", "Milton, ON")}</span></li>
          </ul>
        </div>
      </footer>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ${content.company.name}. All rights reserved.</p>
        <span class="probat"><span class="probat-dot"></span>Part of the PROBAT Group</span>
      </div>
    `;
  }

  function renderHeroStats() {
    document.querySelectorAll("[data-hero-stats]").forEach(function (node) {
      node.innerHTML = `
        <div class="stat-item">
          <div class="stat-num">20K</div>
          <div class="stat-label">sq ft fabrication shop</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">20+</div>
          <div class="stat-label">years in the field</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">3</div>
          <div class="stat-label">service regions</div>
        </div>
      `;
    });
  }

  function renderServiceCards() {
    document.querySelectorAll("[data-services-grid]").forEach(function (node) {
      node.innerHTML = content.services
        .map(
          (service, index) => `
            <div class="svc">
              <span class="svc-num">${String(index + 1).padStart(2, "0")}</span>
              <h3>${service.name}</h3>
              <p>${service.homeSummary}</p>
              <a class="svc-link" href="${root}/services/#${service.id}">View service &rarr;</a>
            </div>
          `
        )
        .join("");
    });
  }

  function renderServiceDetails() {
    document.querySelectorAll("[data-service-details]").forEach(function (node) {
      node.innerHTML = content.services
        .map(
          (service) => `
            <article class="detail-card panel" id="${service.id}">
              <div class="detail-media">
                <img src="${asset(service.detailPhoto)}" alt="${service.detailPhotoAlt}" loading="lazy" />
              </div>
              <div class="detail-body">
                <p class="eyebrow">${service.eyebrow}</p>
                <h2>${service.name}</h2>
                <p class="detail-copy">${service.description}</p>
                <div class="detail-columns">
                  <div>
                    <h3>Scope includes</h3>
                    <ul class="check-list">
                      ${service.deliverables.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                  </div>
                  <div>
                    <h3>Typical work</h3>
                    <ul class="check-list">
                      ${service.examples.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                  </div>
                </div>
                <a class="btn btn-outline" href="${root}/contact/#contact-form">Request a quote</a>
              </div>
            </article>
          `
        )
        .join("");
    });
  }

  function renderIndustries() {
    document.querySelectorAll("[data-industries-grid]").forEach(function (node) {
      const icons = [
        '<svg class="ind-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        '<svg class="ind-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
        '<svg class="ind-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>',
        '<svg class="ind-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
      ];
      node.innerHTML = content.industries
        .map(
          (industry, index) => `
            <div class="ind-card">
              ${icons[index] || ""}
              <h4>${industry.title}</h4>
              <p>${industry.description}</p>
            </div>
          `
        )
        .join("");
    });
  }

  function renderProofPoints() {
    document.querySelectorAll("[data-proof-grid]").forEach(function (node) {
      node.innerHTML = content.proofPoints
        .map(function (item) {
          const big = item.title.includes("20,000")
            ? "20K<sup>sqft</sup>"
            : item.title.includes("Welding")
            ? "CWB"
            : "ON<sup>-site</sup>";

          return `
            <div class="cap-card">
              <div class="cap-big">${big}</div>
              <h4>${item.title}</h4>
              <p>${item.description}</p>
            </div>
          `;
        })
        .join("");
    });
  }

  function renderHomeAreas() {
    document.querySelectorAll("[data-home-areas]").forEach(function (node) {
      const tags = ["Home Base", "Primary Coverage", "Extended Coverage"];
      const bullets = [
        ["Fabrication, fit-up, and project prep", "Local dispatch for field crews", "Millwrighting and piping work"],
        ["Industrial service across local Halton facilities", "Maintenance, fabrication, and installation", "Shop-built work with nearby site support"],
        ["Industrial millwrighting and mechanical work", "Process piping tied to field installation", "Project support for regional facilities"]
      ];
      node.innerHTML = content.homeAreas
        .map(
          (item, index) => `
            <div class="area-card">
              <span class="area-tag">${tags[index] || ""}</span>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <ul class="area-list">
                ${(bullets[index] || []).map((b) => `<li>${b}</li>`).join("")}
              </ul>
            </div>
          `
        )
        .join("");
    });
  }

  function renderGallery() {
    const placeholderClasses = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"];
    document.querySelectorAll("[data-gallery-grid]").forEach(function (node) {
      node.innerHTML = content.galleryItems
        .map(
          (item, index) => `
            <div class="gal-item ${placeholderClasses[index] || "g1"}">
              ${
                item.photo
                  ? `<img src="${asset(item.photo)}" alt="${item.photoAlt}" loading="lazy" />`
                  : `<div class="gal-inner"></div>`
              }
              <span class="gal-label">${item.title}</span>
            </div>
          `
        )
        .join("");
    });
  }

  function renderContactBand() {
    document.querySelectorAll("[data-contact-band-info]").forEach(function (node) {
      node.innerHTML = `
        <div class="eyebrow">Contact</div>
        <h2>Send the scope.<br>We'll take it<br>from there.</h2>
        <p>Include the facility name, type of work, timing, and any drawings or site notes. ED Industrial will review and respond directly.</p>
        <div class="contact-details">
          <a href="${content.company.phoneHref}">${content.company.phone}</a>
          <a href="${content.company.emailHref}">${content.company.email}</a>
          <span>${content.company.address}</span>
        </div>
        <a href="${content.company.emailHref}" class="btn btn-primary">Open email draft</a>
      `;
    });

    document.querySelectorAll("[data-contact-band-quote]").forEach(function (node) {
      node.innerHTML = `
        <div class="quote-box">
          <h3>Include in Your Request</h3>
          <ul class="quote-list">
            ${content.quoteChecklist.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      `;
    });
  }

  function renderWorkTypes() {
    document.querySelectorAll("[data-work-types-grid]").forEach(function (node) {
      node.innerHTML = content.workTypes
        .map(
          (item) => `
            <article class="cap-card">
              <h4>${item.title}</h4>
              <p>${item.description}</p>
            </article>
          `
        )
        .join("");
    });
  }

  function renderAreaSections() {
    document.querySelectorAll("[data-area-sections]").forEach(function (node) {
      node.innerHTML = content.areasPage.sections
        .map(
          (section) => `
            <section class="area-section" id="${section.id}">
              <figure class="photo-card">
                <img src="${asset(section.photo)}" alt="${section.photoAlt}" loading="lazy" />
              </figure>
              <div class="content-block area-copy">
                <h2>${section.title}</h2>
                <p>${section.copy}</p>
                <ul class="area-list">
                  ${section.bullets.map((item) => `<li>${item}</li>`).join("")}
                </ul>
              </div>
            </section>
          `
        )
        .join("");
    });
  }

  function renderServiceCoverage() {
    document.querySelectorAll("[data-service-coverage]").forEach(function (node) {
      node.innerHTML = content.serviceCoverage
        .map(
          (item) => `
            <div class="svc">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
              <a class="svc-link" href="${item.href}">View service &rarr;</a>
            </div>
          `
        )
        .join("");
    });
  }

  function renderContacts() {
    document.querySelectorAll("[data-contact-grid]").forEach(function (node) {
      node.innerHTML = content.contacts
        .map(
          (person) => `
            <article class="cap-card">
              <h4>${person.name}</h4>
              <p class="contact-role" style="color:var(--accent);font-size:12px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;margin-bottom:16px">${person.role}</p>
              <div style="display:flex;flex-direction:column;gap:8px">
                <a href="mailto:${person.email}" style="color:var(--muted-l);text-decoration:none;font-size:14px">${person.email}</a>
                <a href="tel:${person.phone.replace(/[^0-9+]/g, "")}" style="color:var(--muted-l);text-decoration:none;font-size:14px">${person.phone}</a>
                ${person.note ? `<p style="color:var(--muted);font-size:13px;margin-top:8px">${person.note}</p>` : ""}
              </div>
            </article>
          `
        )
        .join("");
    });
  }

  function renderQuoteChecklist() {
    document.querySelectorAll("[data-quote-list]").forEach(function (node) {
      node.innerHTML = content.quoteChecklist.map((item) => `<li>${item}</li>`).join("");
    });
  }

  function renderCompanyFields() {
    document.querySelectorAll("[data-company-positioning]").forEach((node) => {
      node.textContent = content.company.positioning;
    });
    document.querySelectorAll("[data-company-phone]").forEach((node) => {
      node.textContent = content.company.phone;
      node.setAttribute("href", content.company.phoneHref);
    });
    document.querySelectorAll("[data-company-email]").forEach((node) => {
      node.textContent = content.company.email;
      node.setAttribute("href", content.company.emailHref);
    });
    document.querySelectorAll("[data-company-address]").forEach((node) => {
      node.textContent = content.company.address;
    });
    document.querySelectorAll("[data-company-region]").forEach((node) => {
      node.textContent = content.company.region;
    });
  }

  function renderFormBehavior() {
    const form = document.querySelector("[data-contact-form]");
    const status = document.querySelector("[data-form-status]");

    if (!form || !status) {
      return;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const subject = `Website inquiry from ${formData.get("name") || "website visitor"}`;
      const lines = [
        `Name: ${formData.get("name") || ""}`,
        `Company: ${formData.get("company") || ""}`,
        `Email: ${formData.get("email") || ""}`,
        `Phone: ${formData.get("phone") || ""}`,
        `Service need: ${formData.get("service") || ""}`,
        "",
        "Project details:",
        `${formData.get("message") || ""}`
      ];

      status.textContent =
        "Opening your email app. If nothing happens, send your details directly to salescontact@edindustrial.ca.";

      window.location.href = `mailto:${content.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        lines.join("\n")
      )}`;
    });
  }

  function galleryDragScroll() {
    const scroll = document.getElementById("galleryScroll");
    if (!scroll) {
      return;
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    scroll.addEventListener("mousedown", function (e) {
      isDown = true;
      scroll.style.cursor = "grabbing";
      startX = e.pageX - scroll.offsetLeft;
      scrollLeft = scroll.scrollLeft;
    });
    scroll.addEventListener("mouseleave", function () {
      isDown = false;
      scroll.style.cursor = "grab";
    });
    scroll.addEventListener("mouseup", function () {
      isDown = false;
      scroll.style.cursor = "grab";
    });
    scroll.addEventListener("mousemove", function (e) {
      if (!isDown) {
        return;
      }
      e.preventDefault();
      const x = e.pageX - scroll.offsetLeft;
      scroll.scrollLeft = scrollLeft - (x - startX) * 1.4;
    });
  }

  renderHeader();
  renderFooter();
  renderCompanyFields();
  renderHeroStats();
  renderServiceCards();
  renderServiceDetails();
  renderIndustries();
  renderProofPoints();
  renderHomeAreas();
  renderWorkTypes();
  renderGallery();
  renderAreaSections();
  renderServiceCoverage();
  renderQuoteChecklist();
  renderContacts();
  renderContactBand();
  renderFormBehavior();
  galleryDragScroll();
})();
