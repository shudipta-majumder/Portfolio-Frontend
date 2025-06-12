/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  // document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
  //   let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
  //   let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
  //   let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

  //   let initIsotope;
  //   imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
  //     initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
  //       itemSelector: '.isotope-item',
  //       layoutMode: layout,
  //       filter: filter,
  //       sortBy: sort
  //     });
  //   });

  //   isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
  //     filters.addEventListener('click', function() {
  //       isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
  //       this.classList.add('filter-active');
  //       initIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //       if (typeof aosInit === 'function') {
  //         aosInit();
  //       }
  //     }, false);
  //   });

  // });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

/**
 * Dynamic Age Calculator
 */
function calculateAge(birthDateString) {
  const today = new Date();
  const birthDate = new Date(birthDateString);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return `${years} years, ${months} months, ${days} days`;
}

window.addEventListener("load", function () {
  const ageElement = document.getElementById("dynamic-age");
  if (ageElement) {
    ageElement.textContent = calculateAge("1997-01-03"); // Your birthday
  }
});

// Set current year in span with id="year"
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();
});

// send email
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading
      document.querySelector(".loading").style.display = "block";
      document.querySelector(".error-message").innerText = "";
      document.querySelector(".sent-message").style.display = "none";

      const data = {
        name: document.getElementById("name-field").value,
        email: document.getElementById("email-field").value,
        subject: document.getElementById("subject-field").value,
        message: document.getElementById("message-field").value,
      };

      fetch("https://shudipta.space/backend/api/send-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          document.querySelector(".loading").style.display = "none";
          if (response.ok) {
            document.querySelector(".sent-message").style.display = "block";
            // alert("✅ Message sent successfully!");
            contactForm.reset();
          } else {
            throw new Error("Failed to send message");
          }
        })
        .catch((error) => {
          document.querySelector(".loading").style.display = "none";
          document.querySelector(".error-message").innerText = error.message;
          alert("❌ Error: " + error.message);
        });
    });
  }
});

// Cetagories list
document.addEventListener("DOMContentLoaded", () => {
  const filterList = document.getElementById("category-filters");

  fetch("https://shudipta.space/backend/api/categories/")
    .then((response) => response.json())
    .then((categories) => {
      categories.forEach((category) => {
        const slug = category.name.toLowerCase().replace(/\s+/g, "-");
        const li = document.createElement("li");
        li.setAttribute("data-filter", `.filter-${slug}`);
        li.setAttribute("data-id", category.id); // <- Add this
        li.classList.add("category-tab");
        li.textContent = category.name;
        filterList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
});

// Projects
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".isotope-container");
  const paginationControls = document.getElementById("pagination-controls");
  const filterList = document.getElementById("category-filters");

  let currentPage = 1;
  let currentCategoryId = null;
  const pageSize = 6;

  async function fetchProjects(page = 1, categoryId = null) {
    // Show loading and hide other messages
    document.getElementById("loading").style.display = "block";
    document.getElementById("error-message").style.display = "none";
    document.getElementById("no-projects").style.display = "none";
    container.innerHTML = "";
    paginationControls.innerHTML = "";
    try {
      let url = categoryId
        ? `https://shudipta.space/backend/api/projects/category/${categoryId}/?page=${page}&page_size=${pageSize}`
        : `https://shudipta.space/backend/api/projects/?page=${page}&page_size=${pageSize}`;

      const response = await fetch(url);

      // Handle 404 specifically
      if (response.status === 404) {
        document.getElementById("no-projects").style.display = "block";
        return; // Stop further execution
      }

      // For other failed responses
      if (!response.ok) {
        throw new Error(`Fetch error: ${response.status}`);
      }

      const result = await response.json();
      const { results, count } = result.data;

      if (!results.length) {
        document.getElementById("no-projects").style.display = "block";
      } else {
        renderProjects(results);
        renderPagination(count, page, categoryId);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      document.getElementById("error-message").style.display = "block";
    } finally {
      document.getElementById("loading").style.display = "none";
    }
  }

  function renderProjects(projects) {
    container.innerHTML = "";
    projects.forEach((project) => {
      const image =
        project.images.length > 0
          ? project.images[0].image
          : "assets/img/placeholder.png";
      const category = mapCategoryToFilterClass(project.category_name);

      const html = `
        <div class="col-lg-4 col-md-6 portfolio-item isotope-item ${category}">
          <div class="portfolio-content h-100">
            <img src="${image}" class="img-fluid" alt="${project.title}" />
            <div class="portfolio-info">
              <h4>${project.title}</h4>
              <p>
                ${project.description.split(" ").slice(0, 5).join(" ")}...
              </p>
              <a href="${image}" title="${
        project.title
      }" data-gallery="portfolio-gallery-app" class="glightbox preview-link">
                <i class="bi bi-zoom-in"></i>
              </a>
              <a href="project-details.html?id=${
                project.id
              }" title="More Details" class="details-link">
               <i class="bi bi-link-45deg"></i>
              </a>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", html);
    });

    if (typeof GLightbox !== "undefined") GLightbox({ selector: ".glightbox" });
  }

  function renderPagination(totalItems, activePage, categoryId) {
    paginationControls.innerHTML = "";
    const totalPages = Math.ceil(totalItems / pageSize);

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("btn", "btn-sm", "mx-1");
      button.classList.add(
        i === activePage ? "btn-primary" : "btn-outline-primary"
      );
      button.addEventListener("click", () => {
        currentPage = i;
        fetchProjects(i, categoryId);
      });
      paginationControls.appendChild(button);
    }
  }

  function mapCategoryToFilterClass(categoryName) {
    const map = {
      Web: "filter-app",
      App: "filter-product",
      Desktop: "filter-branding",
      "Machine Learning": "filter-books",
    };
    return map[categoryName] || "";
  }

  // ✅ Add click handler to category filters
  filterList.addEventListener("click", (e) => {
    if (e.target && e.target.matches("li[data-id]")) {
      const categoryId = e.target.getAttribute("data-id");
      currentCategoryId = categoryId;
      currentPage = 1;

      // Remove previous active class
      document
        .querySelectorAll("#category-filters li")
        .forEach((li) => li.classList.remove("filter-active"));

      e.target.classList.add("filter-active");

      fetchProjects(currentPage, categoryId);
    }

    // Handle "All"
    if (e.target && e.target.getAttribute("data-filter") === "*") {
      currentCategoryId = null;
      currentPage = 1;

      document
        .querySelectorAll("#category-filters li")
        .forEach((li) => li.classList.remove("filter-active"));
      e.target.classList.add("filter-active");

      fetchProjects(currentPage);
    }
  });

  // Initial load
  fetchProjects(currentPage);
});

// Project retrive details

document.addEventListener("DOMContentLoaded", () => {
  const projectId = getProjectIdFromURL();
  if (projectId) {
    fetchProjectDetails(projectId);
  }
});

function getProjectIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function fetchProjectDetails(projectId) {
  fetch(`https://shudipta.space/backend/api/projects/${projectId}/`)
    .then((res) => res.json())
    .then((response) => {
      if (response.code === 200) {
        renderProjectDetail(response.data);
      } else {
        console.error("Error fetching project details");
      }
    })
    .catch((err) => console.error("Fetch error:", err));
}

function renderProjectDetail(project) {
  // Swiper slides
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  swiperWrapper.innerHTML = project.images.length
    ? project.images
        .map(
          (img) => `
        <div class="swiper-slide">
          <img src="${img.image}" alt="${project.title}">
        </div>`
        )
        .join("")
    : `<div class="swiper-slide">
         <img src="assets/img/placeholder.png" alt="No image">
       </div>`;

  // Project info
  document.querySelector(".portfolio-info ul").innerHTML = `
    <li><strong>Category</strong>: ${project.category_names.join(", ")}</li>
    <li><strong>Project date</strong>: ${formatDate(project.publish_date)}</li>
    <li><strong>Project URL</strong>: <a href="${
      project.live_link
    }" target="_blank">${project.live_link}</a></li>
    <li><strong>Status</strong>: <span style="color: green;">${
      project.status
    }</span></li>
  `;

  // Populate skills needed
  const skillsContainer = document.querySelector("#skills-needed");
  if (skillsContainer && project.skills_need) {
    const skills = project.skills_need.split(" ");
    skillsContainer.innerHTML = skills
      .map(
        (skill) =>
          `<span class="badge me-1 mb-1" style="background-color: #796EF1; color: white;">${skill}</span>`
      )
      .join("");
  }

  // Populate contributors
  const contributorsContainer = document.querySelector("#contributors");
  if (contributorsContainer && project.contributor.length > 0) {
    contributorsContainer.innerHTML = project.contributor
      .map(
        (user) => `
      <div class="d-flex align-items-center mb-2">
        <img src="${user.profile_pic}" alt="${user.name}" class="rounded-circle me-2" width="40" height="40">
        <div>
          <span>${user.name}</span><br>
          <small class="text-muted">${user.role} (${user?.experience_years} yr)</small>
        </div>
      </div>
    `
      )
      .join("");
  }

  // Project description
  document.querySelector(".portfolio-description h2").textContent =
    project.title;
  const p = document.querySelector(".portfolio-description p");
  p.innerHTML = project.description.replace(/\\n/g, "<br>");
  p.style.textAlign = "justify";

  // Initialize Swiper (in case not auto-initialized)
  if (typeof Swiper !== "undefined") {
    new Swiper(".init-swiper", {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
      },
      slidesPerView: "auto",
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
    });
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
