document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    };

    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuButton.textContent = isOpen ? "×" : "☰";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 900px)").matches) closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById("quoteForm");
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const requestedCategory = params.get("category");
    const categorySelect = document.getElementById("category");
    if (requestedCategory && categorySelect) {
      [...categorySelect.options].forEach((option) => {
        if (option.text.toLowerCase() === requestedCategory.toLowerCase()) {
          categorySelect.value = option.value;
        }
      });
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent("Website Enquiry - " + (data.get("category") || "General"));
      const body = encodeURIComponent(
        "Name: " + data.get("name") +
        "\nCompany: " + data.get("company") +
        "\nEmail: " + data.get("email") +
        "\nPhone: " + data.get("phone") +
        "\nCategory: " + data.get("category") +
        "\n\nRequirement:\n" + data.get("message")
      );
      window.location.href = "mailto:sales@aurexgeneraltrading.com?subject=" + subject + "&body=" + body;
    });
  }
});
