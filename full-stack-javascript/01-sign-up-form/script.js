const form = document.getElementById("form");
const submitBtn = document.getElementById("submit");
const successDiv = document.getElementById("success-div");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitBtn.textContent = "Submitting";
  submitBtn.setAttribute("disabled", true);
  setTimeout(() => {
    successDiv.classList.remove("hidden");
    submitBtn.removeAttribute("disabled");
    submitBtn.textContent = "Submit";
    form.reset();
  }, 1000);
});
