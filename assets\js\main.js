// Christofa's — Main JavaScript
// Handles Navigation, Quick Booking redirect, Menu Filtering & Modal Lightbox

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "✕" : "☰";
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!toggle.contains(e.target) && !navList.contains(e.target) && navList.classList.contains("is-open")) {
        navList.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      }
    });
  }

  // 2. Footer Copyright Year
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Quick Booking Widget on Home Page
  const quickBookForm = document.querySelector("[data-quick-book]");
  if (quickBookForm) {
    const quickDateInput = quickBookForm.querySelector("[name='quickDate']");
    if (quickDateInput) {
      const today = new Date();
      // Default to tomorrow (or Tuesday if tomorrow is Monday)
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() + 1);
      if (targetDate.getDay() === 1) { // 1 = Monday
        targetDate.setDate(targetDate.getDate() + 1); // shift to Tuesday
      }
      const yyyy = targetDate.getFullYear();
      const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
      const dd = String(targetDate.getDate()).padStart(2, "0");
      quickDateInput.value = `${yyyy}-${mm}-${dd}`;
      quickDateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    }

    quickBookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const party = quickBookForm.querySelector("[name='quickGuests']").value;
      const date = quickBookForm.querySelector("[name='quickDate']").value;
      const time = quickBookForm.querySelector("[name='quickTime']").value;

      const params = new URLSearchParams();
      if (party) params.set("guests", party);
      if (date) params.set("date", date);
      if (time) params.set("time", time);

      window.location.href = `book.html?${params.toString()}`;
    });
  }

  // 4. Menu Category Filter (menu.html)
  const filterBtns = document.querySelectorAll(".menu-filter-btn");
  const menuCategories = document.querySelectorAll("[data-category]");

  if (filterBtns.length > 0 && menuCategories.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        const target = btn.getAttribute("data-filter");

        menuCategories.forEach((cat) => {
          const catName = cat.getAttribute("data-category");
          if (target === "all") {
            cat.style.display = "block";
          } else if (catName === target) {
            cat.style.display = "block";
          } else {
            cat.style.display = "none";
          }
        });
      });
    });
  }

  // 5. Menu Scans Modal Lightbox (menu.html)
  const modal = document.querySelector("[data-modal]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalClose = document.querySelector("[data-modal-close]");
  const sheetTriggers = document.querySelectorAll("[data-sheet-src]");

  if (modal && modalImg) {
    sheetTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const src = trigger.getAttribute("data-sheet-src");
        const title = trigger.getAttribute("data-sheet-title") || "Printed Menu";
        modalImg.src = src;
        modalImg.alt = title;
        if (modalTitle) modalTitle.textContent = title;
        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });

    const closeModal = () => {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
    };

    if (modalClose) modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }
});
