const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const enquiryForm = document.querySelector("#enquiry-form");
const formNote = document.querySelector("#form-note");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isExpanded);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  }
});

document.querySelectorAll(".choose-equipment").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#equipment-select").value = button.dataset.equipment;
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    document.querySelector("#customer-name").focus({ preventScroll: true });
  });
});

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;

  const enquiry = new FormData(enquiryForm);
  const message = [
    "Hello Brother Mawuli Construction Agency,",
    "",
    "I'd like to enquire about equipment hire.",
    `Name: ${enquiry.get("name")}`,
    `Phone: ${enquiry.get("phone")}`,
    `Equipment: ${enquiry.get("equipment")}`,
    enquiry.get("dates") ? `Planned hire dates: ${enquiry.get("dates")}` : "",
  ].filter(Boolean).join("\n");

  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  formNote.textContent = "Your message draft is ready in WhatsApp. Select Brother Mawuli Construction Agency and send it when you're ready.";
});

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
