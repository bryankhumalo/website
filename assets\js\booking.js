// Christofa's — Reservations Flow (Phase 1 Prototype)
// Features client-side validation, Monday closure check, localStorage persistence,
// party pills, service period toggling, seating area selection, and confirmation ticket rendering.
// 100% XSS-Safe: strictly uses textContent for all user-supplied data.

(() => {
  const form = document.querySelector("[data-booking-form]");
  if (!form) return;

  const steps = Array.from(form.querySelectorAll(".booking-step"));
  const stepIndicators = document.querySelectorAll("[data-step-indicator]");
  let currentStep = 0;

  // Form Fields
  const partyInput = form.querySelector("[name='partySize']");
  const dateInput = form.querySelector("[name='date']");
  const timeInput = form.querySelector("[name='time']");
  const areaInput = form.querySelector("[name='seatingArea']");
  const nameInput = form.querySelector("[name='name']");
  const emailInput = form.querySelector("[name='email']");
  const phoneInput = form.querySelector("[name='phone']");
  const notesInput = form.querySelector("[name='notes']");

  // Step 1: Pre-fill from URL parameters (e.g. from quick book on home page)
  const urlParams = new URLSearchParams(window.location.search);
  const paramGuests = urlParams.get("guests");
  const paramDate = urlParams.get("date");
  const paramTime = urlParams.get("time");

  // Helper to format Date to YYYY-MM-DD
  function formatDateISO(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  // Set min date to today
  if (dateInput) {
    const today = new Date();
    dateInput.min = formatDateISO(today);

    if (paramDate) {
      dateInput.value = paramDate;
    } else {
      // Default to tomorrow (or Tuesday if tomorrow is Monday)
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() + 1);
      if (targetDate.getDay() === 1) { // Monday
        targetDate.setDate(targetDate.getDate() + 1); // shift to Tuesday
      }
      dateInput.value = formatDateISO(targetDate);
    }

    // Clear error on date change and validate Monday closure
    dateInput.addEventListener("change", () => {
      checkMondayClosure(dateInput.value);
    });
  }

  function checkMondayClosure(dateStr) {
    if (!dateStr) return true;
    const [y, m, d] = dateStr.split("-").map(Number);
    const chosen = new Date(y, m - 1, d);
    if (chosen.getDay() === 1) { // 1 = Monday
      setFieldError(dateInput, "Christofa's is closed on Mondays (Market Day). Please choose Tuesday through Sunday.");
      return false;
    }
    setFieldError(dateInput, "");
    return true;
  }

  // Party Size Buttons
  const partyButtons = form.querySelectorAll("[data-party-btn]");
  function setPartySize(size) {
    if (partyInput) partyInput.value = size;
    partyButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-party-btn") === String(size));
    });
  }

  partyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setPartySize(btn.getAttribute("data-party-btn"));
    });
  });

  if (paramGuests) {
    setPartySize(paramGuests);
  } else {
    setPartySize("2");
  }

  // Time Slot Buttons
  const timeButtons = form.querySelectorAll("[data-time-btn]");
  function setTimeSlot(time) {
    if (timeInput) timeInput.value = time;
    timeButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-time-btn") === time);
    });
  }

  timeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeSlot(btn.getAttribute("data-time-btn"));
      setFieldError(timeInput, "");
    });
  });

  if (paramTime) {
    setTimeSlot(paramTime);
  }

  // Seating Area Options
  const areaOptions = form.querySelectorAll("[data-area-opt]");
  areaOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      areaOptions.forEach((o) => o.classList.remove("is-selected"));
      opt.classList.add("is-selected");
      if (areaInput) areaInput.value = opt.getAttribute("data-area-opt");
    });
  });

  // Step Switching
  function showStep(index) {
    steps.forEach((el, i) => el.classList.toggle("is-active", i === index));
    stepIndicators.forEach((el, i) => {
      el.classList.toggle("is-active", i === index);
      el.classList.toggle("is-done", i < index);
    });
    currentStep = index;
    window.scrollTo({ top: form.offsetTop - 100, behavior: "smooth" });
  }

  function setFieldError(field, message) {
    if (!field) return;
    const wrapper = field.closest(".field") || field.parentElement;
    if (!wrapper) return;
    const errorEl = wrapper.querySelector(".form-error");
    wrapper.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message || "";
  }

  // Live input error clearing
  [nameInput, emailInput, phoneInput].forEach((inp) => {
    if (inp) {
      inp.addEventListener("input", () => {
        setFieldError(inp, "");
      });
    }
  });

  function validateStep(index) {
    let valid = true;

    if (index === 0) {
      // Validate date
      if (!dateInput || !dateInput.value) {
        setFieldError(dateInput, "Please choose a reservation date.");
        valid = false;
      } else if (!checkMondayClosure(dateInput.value)) {
        valid = false;
      } else {
        setFieldError(dateInput, "");
      }

      // Validate time
      if (!timeInput || !timeInput.value) {
        setFieldError(timeInput, "Please select an available seating time slot.");
        valid = false;
      } else {
        setFieldError(timeInput, "");
      }
    } else if (index === 1) {
      // Validate name
      if (!nameInput || !nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, "Please enter your full name.");
        valid = false;
      } else {
        setFieldError(nameInput, "");
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        setFieldError(emailInput, "Please enter a valid email address.");
        valid = false;
      } else {
        setFieldError(emailInput, "");
      }

      // Validate phone
      const phoneDigits = (phoneInput ? phoneInput.value : "").replace(/\D/g, "");
      if (phoneDigits.length < 7) {
        setFieldError(phoneInput, "Please enter a valid telephone contact number (at least 7 digits).");
        valid = false;
      } else {
        setFieldError(phoneInput, "");
      }
    }

    return valid;
  }

  function generateRef() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `CHR-${code}`;
  }

  // Next Buttons
  form.querySelectorAll("[data-next]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (validateStep(currentStep)) {
        showStep(currentStep + 1);
      }
    });
  });

  // Back Buttons
  form.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        showStep(currentStep - 1);
      }
    });
  });

  // Form Submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    const booking = {
      ref: generateRef(),
      partySize: partyInput ? partyInput.value : "2",
      date: dateInput ? dateInput.value : "",
      time: timeInput ? timeInput.value : "19:00",
      seatingArea: areaInput ? areaInput.value : "Main Dining Room",
      name: nameInput ? nameInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      phone: phoneInput ? phoneInput.value.trim() : "",
      notes: notesInput ? notesInput.value.trim() : "",
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("christofas_bookings") || "[]");
      existing.push(booking);
      localStorage.setItem("christofas_bookings", JSON.stringify(existing));
    } catch (err) {
      console.warn("Could not save to localStorage", err);
    }

    // Populate confirmation ticket safely using textContent (100% XSS-Safe)
    const refEl = document.querySelector("[data-ticket-ref]");
    const guestEl = document.querySelector("[data-ticket-guests]");
    const dateEl = document.querySelector("[data-ticket-date]");
    const timeEl = document.querySelector("[data-ticket-time]");
    const areaEl = document.querySelector("[data-ticket-area]");
    const nameEl = document.querySelector("[data-ticket-name]");
    const emailEl = document.querySelector("[data-ticket-email]");
    const notesEl = document.querySelector("[data-ticket-notes]");

    if (refEl) refEl.textContent = booking.ref;
    if (guestEl) guestEl.textContent = `${booking.partySize} Guests`;
    if (dateEl && booking.date) {
      const [year, month, day] = booking.date.split("-").map(Number);
      const d = new Date(year, month - 1, day);
      dateEl.textContent = d.toLocaleDateString("en-ZA", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    if (timeEl) timeEl.textContent = booking.time;
    if (areaEl) areaEl.textContent = booking.seatingArea;
    if (nameEl) nameEl.textContent = booking.name;
    if (emailEl) emailEl.textContent = booking.email;
    if (notesEl) {
      notesEl.textContent = booking.notes || "None specified";
    }

    showStep(2);
  });

  // Print Ticket
  const printBtn = document.querySelector("[data-print-ticket]");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  showStep(0);
})();
