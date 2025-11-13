// Cart functionality
$(document).ready(function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = $("#cart-items");
  const totalPriceElement = $("#total-price");

  // Function to update cart display
  function updateCart() {
    cartItemsContainer.empty();
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      cartItemsContainer.append(`
        <tr>
          <td>${item.name}</td>
          <td>${item.price}</td>
          <td>
            <input type="number" value="${
              item.quantity
            }" min="1" data-index="${index}" class="quantity-input" />
          </td>
          <td>${(item.price * item.quantity).toFixed(2)}</td>
          <td><button class="remove-item" data-index="${index}">Remove</button></td>
        </tr>
      `);
    });

    totalPriceElement.text(total.toFixed(2));
  }

  // Function to remove item from cart
  function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }

  // Function to update item quantity
  function updateQuantity(index, quantity) {
    if (quantity < 1) return;
    cart[index].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }

  // Handle item removal
  $(document).on("click", ".remove-item", function () {
    const index = $(this).data("index");
    removeItem(index);
  });

  // Handle quantity change
  $(document).on("change", ".quantity-input", function () {
    const index = $(this).data("index");
    const quantity = parseInt($(this).val());
    updateQuantity(index, quantity);
  });

  // Clear cart
  $("#clear-cart").click(function () {
    localStorage.removeItem("cart");
    cart = [];
    updateCart();
  });

  // Initialize cart
  updateCart();
});

function updateTotalPrice() {
  let cart = JSON.parse(localStorage.getItem("cart")) || []; // Получаем корзину из localStorage
  let total = 0;

  // Проходим по всем товарам в корзине и считаем общую стоимость
  cart.forEach((item) => {
    total += item.price * item.quantity; // Добавляем стоимость товара с учетом его количества
  });

  // Обновляем отображение общей суммы
  $("#total-price").text(`$${total.toFixed(2)}`); // Форматируем и обновляем элемент с ID total-price
}

// Вызовем эту функцию при загрузке страницы, чтобы инициализировать отображение
$(document).ready(function () {
  updateTotalPrice(); // Обновляем общую сумму при загрузке страницы
});
