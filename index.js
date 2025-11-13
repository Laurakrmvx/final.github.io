// Home Page Functionality
$(document).ready(function () {
  // Load featured products
  loadFeaturedProducts();

  // Newsletter subscription
  $("#newsletter-btn").on("click", function () {
    const email = $("#newsletter-email").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      $("#newsletter-message")
        .html('<span style="color: red;">Please enter an email</span>')
        .fadeIn(300);
      return;
    }

    if (!emailRegex.test(email)) {
      $("#newsletter-message")
        .html(
          '<span style="color: red;">Please enter a valid email address</span>'
        )
        .fadeIn(300);
      return;
    }

    // Success message
    $("#newsletter-message")
      .html(
        '<span style="color: green;">✓ Successfully subscribed! Check your email.</span>'
      )
      .fadeIn(300);

    // Clear input
    setTimeout(() => {
      $("#newsletter-email").val("");
      $("#newsletter-message").fadeOut(300);
    }, 2000);
  });

  // Allow Enter key to submit
  $("#newsletter-email").on("keypress", function (e) {
    if (e.which === 13) {
      $("#newsletter-btn").click();
    }
  });

  // Animate benefits boxes on scroll
  $(".benefit-box").hover(
    function () {
      $(this).animate(
        {
          transform: "translateY(-10px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        },
        300
      );
    },
    function () {
      $(this).animate(
        {
          transform: "translateY(0)",
          boxShadow: "none",
        },
        300
      );
    }
  );
});

function loadFeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Foundation",
      price: "$25.99",
      src: "https://admin.only.kz/storage/product/images6540a8acad5d2.png",
    },
    {
      id: 2,
      name: "Lipstick",
      price: "$18.99",
      src: "https://romandbeauty.com/cdn/shop/files/10_UTJT10_Product.jpg?v=1755804414&width=600",
    },
    {
      id: 3,
      name: "Face Moisturizer",
      price: "$32.99",
      src: "https://us.innisfree.com/cdn/shop/files/1IF_GT-CC_Packshot_2024_1080x1080_01_1_1.jpg?v=1759873358&width=1080",
    },
  ];

  const productsGrid = $("#featured-products");
  productsGrid.empty();

  featuredProducts.forEach((product, index) => {
    const card = $(`
      <div class="card" style="opacity: 0;">
        <img src="${product.src}" alt="${product.name}" loading="lazy" />
        <h3>${product.name}</h3>
        <p>Premium Beauty</p>
        <p><strong>${product.price}</strong></p>
        <button>View</button>
        <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
      </div>
    `);

    productsGrid.append(card);

    // Fade in animation
    setTimeout(() => {
      card.animate({ opacity: 1 }, 800);
    }, index * 200);
  });

  // Add to cart functionality (same as products page)
  $(document).on("click", ".add-to-cart", function () {
    const productId = $(this).data("product-id");
    const productName = $(this).closest(".card").find("h3").text();
    const priceText = $(this).closest(".card").find("strong").text();
    const productPrice = parseFloat(priceText.replace("$", ""));
    const quantity = 1;

    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    } catch (err) {
      console.error("Failed to save cart:", err);
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
}
