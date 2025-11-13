// Form Validation
$(document).ready(function () {
  // Email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Form submission
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();

    // Clear previous error messages
    $(".form-error").text("");

    // Get form values
    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const message = $("#message").val().trim();

    let isValid = true;

    // Validation: Name
    if (name === "") {
      $("#name-error").text("Name is required").fadeIn(300);
      isValid = false;
    } else if (name.length < 2) {
      $("#name-error").text("Name must be at least 2 characters").fadeIn(300);
      isValid = false;
    }

    // Validation: Email
    if (email === "") {
      $("#email-error").text("Email is required").fadeIn(300);
      isValid = false;
    } else if (!emailRegex.test(email)) {
      $("#email-error").text("Please enter a valid email").fadeIn(300);
      isValid = false;
    }

    // Validation: Message
    if (message === "") {
      $("#message-error").text("Message is required").fadeIn(300);
      isValid = false;
    } else if (message.length < 10) {
      $("#message-error")
        .text("Message must be at least 10 characters")
        .fadeIn(300);
      isValid = false;
    }

    // If valid, show success message
    if (isValid) {
      $("#form-message")
        .html(
          '<span class="success-msg">✓ Message sent successfully! We will contact you soon.</span>'
        )
        .fadeIn(300);

      // Clear form
      setTimeout(() => {
        $("#contact-form")[0].reset();
        $("#form-message").fadeOut(300);
      }, 2000);
    }
  });

  // Real-time validation feedback
  $("#name").on("blur", function () {
    const name = $(this).val().trim();
    if (name === "") {
      $("#name-error").text("Name is required");
    } else if (name.length < 2) {
      $("#name-error").text("Name must be at least 2 characters");
    } else {
      $("#name-error").text("");
    }
  });

  $("#email").on("blur", function () {
    const email = $(this).val().trim();
    if (email === "") {
      $("#email-error").text("Email is required");
    } else if (!emailRegex.test(email)) {
      $("#email-error").text("Please enter a valid email");
    } else {
      $("#email-error").text("");
    }
  });

  $("#message").on("blur", function () {
    const message = $(this).val().trim();
    if (message === "") {
      $("#message-error").text("Message is required");
    } else if (message.length < 10) {
      $("#message-error").text("Message must be at least 10 characters");
    } else {
      $("#message-error").text("");
    }
  });
});
