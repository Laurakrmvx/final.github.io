// Gallery Data
const galleryItems = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1599304368850-fbf130b12c6b?w=400&h=300&fit=crop",
    title: "Lipstick Collection",
    category: "makeup",
    alt: "Beautiful lipstick colors",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
    title: "Foundation Set",
    category: "makeup",
    alt: "Professional foundation set",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1620293915637-a5fe5f93fa48?w=400&h=300&fit=crop",
    title: "Skin Care Routine",
    category: "skincare",
    alt: "Complete skincare routine products",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1596462502278-af407f32f4b5?w=400&h=300&fit=crop",
    title: "Face Serum",
    category: "skincare",
    alt: "Hydrating face serum",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1631217216831-e6b2b4cb6c64?w=400&h=300&fit=crop",
    title: "Makeup Brushes",
    category: "accessories",
    alt: "Professional makeup brush set",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0d?w=400&h=300&fit=crop",
    title: "Eye Shadow Palette",
    category: "makeup",
    alt: "Vibrant eyeshadow palette",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5d2?w=400&h=300&fit=crop",
    title: "Beauty Mirror",
    category: "accessories",
    alt: "LED beauty mirror",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
    title: "Moisturizer Cream",
    category: "skincare",
    alt: "Luxury moisturizer cream",
  },
];

let currentImageIndex = 0;
let filteredItems = [...galleryItems];

$(document).ready(function () {
  // Load gallery
  loadGallery(galleryItems);

  // Filter functionality
  $(".filter-btn").on("click", function () {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    const filter = $(this).data("filter");

    if (filter === "all") {
      filteredItems = [...galleryItems];
    } else {
      filteredItems = galleryItems.filter((item) => item.category === filter);
    }

    // Fade out current gallery
    $("#gallery-grid").fadeOut(300, function () {
      loadGallery(filteredItems);
      $(this).fadeIn(300);
    });
  });

  // Lightbox close button
  $(".lightbox-close").on("click", function () {
    closeLightbox();
  });

  // Lightbox navigation
  $(".lightbox-prev").on("click", function () {
    currentImageIndex =
      (currentImageIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightbox();
  });

  $(".lightbox-next").on("click", function () {
    currentImageIndex = (currentImageIndex + 1) % filteredItems.length;
    updateLightbox();
  });

  // Close lightbox on background click
  $("#lightbox").on("click", function (e) {
    if (e.target.id === "lightbox") {
      closeLightbox();
    }
  });

  // Keyboard navigation
  $(document).on("keydown", function (e) {
    if ($("#lightbox").is(":visible")) {
      if (e.key === "ArrowLeft") {
        $(".lightbox-prev").click();
      } else if (e.key === "ArrowRight") {
        $(".lightbox-next").click();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    }
  });
});

function loadGallery(items) {
  const galleryGrid = $("#gallery-grid");
  galleryGrid.empty();

  items.forEach((item, index) => {
    const galleryItem = $(`
      <div class="gallery-item" data-index="${index}" style="opacity: 0; transform: scale(0.8);">
        <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        <div class="gallery-overlay">
          <p>${item.title}</p>
        </div>
      </div>
    `);

    galleryGrid.append(galleryItem);

    // Animate gallery items
    setTimeout(() => {
      galleryItem.animate(
        { opacity: 1 },
        {
          duration: 500,
          step: function (now) {
            $(this).css("transform", `scale(${0.8 + now * 0.2})`);
          },
        }
      );
    }, index * 100);
  });

  // Gallery item click
  $(".gallery-item").on("click", function () {
    currentImageIndex = $(this).data("index");
    openLightbox();
  });
}

function openLightbox() {
  const item = filteredItems[currentImageIndex];
  $(".lightbox-img").attr("src", item.src).attr("alt", item.alt);
  $(".lightbox-caption").text(item.title);
  $("#lightbox").fadeIn(300);
}

function closeLightbox() {
  $("#lightbox").fadeOut(300);
}

function updateLightbox() {
  const item = filteredItems[currentImageIndex];
  $(".lightbox-img").fadeOut(200, function () {
    $(this).attr("src", item.src).attr("alt", item.alt).fadeIn(200);
  });
  $(".lightbox-caption").fadeOut(200, function () {
    $(this).text(item.title).fadeIn(200);
  });
}
