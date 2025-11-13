$(document).ready(function () {
  // Product cards fade-in animation
  $(".card")
    .hide()
    .each(function (index) {
      $(this)
        .delay(200 * index)
        .fadeIn(1000);
    });

  // Dynamic Search Functionality
  $("#search-products").on("keyup", function () {
    const searchTerm = $(this).val().toLowerCase();
    const hasSearchTerm = searchTerm.length > 0;

    if (hasSearchTerm) {
      $("#search-clear").show();
    } else {
      $("#search-clear").hide();
    }

    $(".card").filter(function () {
      const productName = $(this).find("h3").text().toLowerCase();
      const productCategory = $(this).find("p:first").text().toLowerCase();
      const matches =
        productName.includes(searchTerm) ||
        productCategory.includes(searchTerm);

      $(this).slideToggle(300, function () {
        $(this).toggle(matches);
      });
    });
  });

  // Clear search button
  $("#search-clear").on("click", function () {
    $("#search-products").val("");
    $("#search-clear").hide();
    $(".card").slideDown(300);
  });

  // Cart functionality
  $(document).on("click", ".add-to-cart", function () {
    const productId = $(this).data("product-id");
    const productName = $(this).closest(".card").find("h3").text();
    const priceText = $(this).closest(".card").find("strong").text();
    const productPrice = parseFloat(priceText.replace("$", ""));
    const quantity = 1;

    // Debugging log
    console.log("[products.js] Add button clicked", {
      productId,
      productName,
      productPrice,
    });

    if (typeof productId === "undefined") {
      console.warn(
        "[products.js] data-product-id is undefined for this button",
        this
      );
    }

    // Add to cart array in localStorage
    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists in cart
      const existingItem = cart.find((item) => item.id === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("[products.js] Cart saved to localStorage", cart);
    } catch (err) {
      console.error("[products.js] Failed to save cart to localStorage:", err);
    }

    // Animation effect
    $(this).text("Added!").addClass("added");
    setTimeout(() => {
      $(this).text("Add to Cart").removeClass("added");
    }, 2000);
  });

  // Interactive hover effect on cards
  $(".card").hover(
    function () {
      $(this).css({
        transform: "scale(1.05)",
        "box-shadow": "0 8px 16px rgba(0,0,0,0.2)",
      });
    },
    function () {
      $(this).css({
        transform: "scale(1)",
        "box-shadow": "0 4px 8px rgba(0,0,0,0.1)",
      });
    }
  );
});
