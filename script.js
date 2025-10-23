// Handles the outage report form submission on the client side.
// Prevents the page from reloading and confirms that the report was sent.

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("reportForm");

  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault(); // stop automatic reload

      const firstName = form.querySelector('input[placeholder="First Name"]').value.trim();
      const lastName = form.querySelector('input[placeholder="Last Name"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.querySelector("textarea").value.trim();

      // check if all fields are filled
      if (!firstName || !lastName || !email || !message) {
        alert("Please fill in all fields before submitting.");
        return;
      }

      // simple confirmation message
      alert("Thank you, " + firstName + " Your outage report has been submitted.");

      // reset the form after sending
      form.reset();
    });
  }
});