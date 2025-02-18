// nouveau
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".m1");

  burger.addEventListener("click", function () {
      menu.classList.toggle("active");
      burger.classList.toggle("active");
  });

  // Fermer le menu lorsqu'on clique sur un lien (optionnel)
  document.querySelectorAll(".m1 a").forEach(link => {
      link.addEventListener("click", function () {
          menu.classList.remove("active");
          burger.classList.remove("active");
      });
  });
});

// Fonction pour gérer le défilement fluide
function scrollToSection(buttonId, sectionId) {
  document.getElementById(buttonId)?.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
  });
}

// Défilement fluide pour les sections
scrollToSection("scrollToProducts", "#products");
scrollToSection("scrollabout", "#llabout");
scrollToSection("scrollcontact", "#contactt");
scrollToSection("scrollpanier", "#cart-total");
scrollToSection("scrollHome", ".selection");
scrollToSection("explore-button", "#message-container");
scrollToSection("products", "#message-container");



document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("search-icon");
  const searchInput = document.getElementById("search-input");

  searchIcon.addEventListener("click", function (event) {
      event.preventDefault();
      searchInput.classList.toggle("active");
      if (searchInput.classList.contains("active")) {
          searchInput.focus();
      }
  });

  // Fermer l'input si on clique en dehors
  document.addEventListener("click", function (event) {
      if (!searchIcon.contains(event.target) && !searchInput.contains(event.target)) {
          searchInput.classList.remove("active");
      }
  });
});


// Effet de transparence sur le menu lors du défilement
const menu = document.getElementById("menu");
window.addEventListener("scroll", () => {
  menu?.classList.toggle("transparent", window.scrollY > 50);
});

// Gestion du panier
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Mise à jour du panier dans l'UI et le stockage local
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";

  let total = cart.reduce((sum, item) => sum + item.price, 0);
  
  cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
          ${item.name} - ${item.price.toFixed(2)}$
          <button onclick="removeFromCart(${index})" style="color: red; border: none; background: none; cursor: pointer;">X</button>
      `;
      cartItems.appendChild(li);
  });

  cartTotal.textContent = `${total.toFixed(2)}$`;
  localStorage.setItem("cart", JSON.stringify(cart)); // Sauvegarde du panier
}

// Ajouter un article au panier
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

// Supprimer un article du panier
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Afficher le panier
function showCart() {
  document.querySelector(".cart").style.display = "block";
}

// Gestion des boutons "Order Now" avec délégation d'événements
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-danger")) {
      const parent = e.target.closest(".card");
      const name = parent.querySelector(".namee")?.textContent;
      const price = parseFloat(parent.querySelector(".price")?.textContent.replace("$", ""));

      if (name && !isNaN(price)) {
          addToCart(name, price);
          showCart();
      }
  }
});


// confirmation de commande : 
document.getElementById("checkout-btn").addEventListener("click", function () {
  const cartTotal = parseFloat(document.getElementById("cart-total").textContent.replace("$", ""));
  const messageContainer = document.getElementById("message-container");

  // Nettoyer les messages existants
  messageContainer.innerHTML = "";

  if (cartTotal > 0) {
      // Afficher le formulaire de confirmation
      showConfirmationForm();
  } else {
      // Afficher un message d'erreur dans la page
      messageContainer.innerHTML = `<p class="error-message">Your basket is empty. Add items before ordering!</p>`;
  }
});

function showConfirmationForm() {
  // Vérifie si le formulaire existe déjà
  if (document.getElementById("confirmation-form")) return;

  const formHTML = `
      <div id="confirmation-form" class="confirmation-container">
          <h2>Order confirmation</h2>
          <label>Full name :</label>
          <input type="text" id="full-name" placeholder="Enter your name" required>
          
          <label>Address :</label>
          <input type="text" id="address" placeholder="Enter your address" required>

          <label>Phone number:</label>
          <input type="tel" id="phone" placeholder="Your number" required>

          <button id="confirm-order">Confirm</button>
          <button id="cancel-order" class="cancel-btn">Cancel</button>
      </div>
  `;

  // Ajouter le formulaire à la page
  document.querySelector(".cart").insertAdjacentHTML("beforeend", formHTML);

  // Gérer les boutons du formulaire
  document.getElementById("confirm-order").addEventListener("click", submitOrder);
  document.getElementById("cancel-order").addEventListener("click", function () {
      document.getElementById("confirmation-form").remove();
  });
}

function submitOrder() {
  const name = document.getElementById("full-name").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const messageContainer = document.getElementById("message-container");

  // Nettoyer les messages existants
  messageContainer.innerHTML = "";

  if (name && address && phone) {
      // Afficher le message de confirmation
      messageContainer.innerHTML = `<p class="success-message">Order confirmed ! Thank you for your purchase.</p>`;

      // Vider le panier après la commande
      localStorage.removeItem("cart");
      updateCart();
      document.getElementById("confirmation-form").remove();
  } else {
      // Afficher un message d'erreur
      messageContainer.innerHTML = `<p class="error-message">Please complete all fields in the form !</p>`;
  }
}

// Charger le panier au démarrage
updateCart();