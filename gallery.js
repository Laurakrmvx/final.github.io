// Gallery Data
const galleryItems = [
  {
    id: 1,
    src: "https://i.pinimg.com/736x/b1/30/69/b1306917f5609f572cf9836244c21afd.jpg",
    title: "Lipstick Collection",
    category: "makeup",
    alt: "Beautiful lipstick colors",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/736x/3f/8f/8f/3f8f8f65653457ab6bc82cd7a5dcbe95.jpg",
    title: "Foundation Set",
    category: "makeup",
    alt: "Professional foundation set",
  },
  {
    id: 3,
    src: "https://i.pinimg.com/736x/c7/ef/3b/c7ef3b5b366c5cfda389110bcbc521a7.jpg",
    title: "Skin Care Routine",
    category: "skincare",
    alt: "Complete skincare routine products",
  },
  {
    id: 4,
    src: "https://i.pinimg.com/736x/d3/05/5f/d3055fc2af98c20188cd59731e7f135e.jpg",
    title: "Face Serum",
    category: "skincare",
    alt: "Hydrating face serum",
  },
  {
    id: 5,
    src: "https://i.pinimg.com/736x/ba/8c/56/ba8c56273e94ecd13cc331b55c9d9c41.jpg",
    title: "Makeup Brushes",
    category: "accessories",
    alt: "Professional makeup brush set",
  },
  {
    id: 6,
    src: "https://i.pinimg.com/736x/6a/76/34/6a7634b317a1036e7da5ba2e78ebe1fa.jpg",
    title: "Eye Shadow Palette",
    category: "makeup",
    alt: "Vibrant eyeshadow palette",
  },
  {
    id: 7,
    src: "https://i.pinimg.com/originals/58/43/3d/58433dfdd0859f4e56df9ad9e2f4b3c8.gif",
    title: "Beauty Mirror",
    category: "accessories",
    alt: "LED beauty mirror",
  },
  {
    id: 8,
    src: "https://i.pinimg.com/736x/d2/97/2b/d2972ba92fc5671aa2aed8a51ef4051b.jpg",
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
