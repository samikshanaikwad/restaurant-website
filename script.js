let cart = [];
let cartTotal = 0;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  const favoritesCount = document.getElementById('favoritesCount');

  cartCount.textContent = cart.length;
  cartTotalElement.textContent = cartTotal.toFixed(2);
  favoritesCount.textContent = favorites.length;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Your Cart Is Empty</p>';
  } else {
    cartItems.innerHTML = cart.map((item) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
        </div>
      </div>
    `).join('');
  }
}

function addToCart(name, price, image) {
  cart.push({ name, price: parseFloat(price), image });
  cartTotal += parseFloat(price);
  updateCartUI();
}

function updateFavoritesUI() {
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const name = btn.getAttribute('data-name');
    if (favorites.includes(name)) {
      btn.classList.add('favorited');
    } else {
      btn.classList.remove('favorited');
    }
  });

  // Assuming there's a favorites icon, but it's not in HTML, so commenting out
  // document.getElementById('favoritesIcon').style.color = favorites.length > 0 ? 'red' : '#666';
}

function updateFavoritesModal() {
  const favoritesList = document.getElementById('favoritesList');
  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No favorites yet. Add some dishes to your favorites!</p>';
  } else {
    favoritesList.innerHTML = favorites.map((name) => {
      // Find the dish card to get image and price
      const dishCard = document.querySelector(`.favorite-btn[data-name="${name}"]`);
      const image = dishCard ? dishCard.closest('.dish-card').querySelector('img').src : '';
      const price = dishCard ? dishCard.closest('.dish-card').querySelector('.dish-price').textContent : '';
      return `
        <div class="favorite-item">
          <img src="${image}" alt="${name}" loading="lazy">
          <div class="favorite-item-details">
            <div class="favorite-item-name">${name}</div>
            <div class="favorite-item-price">${price}</div>
          </div>
        </div>
      `;
    }).join('');
  }
}

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(function (el) {
      el.classList.add('visible');
    });
  }, 300);
});

function toggleFavorite(name) {
  if (favorites.includes(name)) {
    favorites = favorites.filter(item => item !== name);
    alert(`${name} removed from favorites!`);
  } else {
    favorites.push(name);
    alert(`${name} added to favorites!`);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesUI();
  updateCartUI(); // To update the favorites count
}

// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', function () {
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(function (link) {
  link.addEventListener('click', function () {
    navMenu.classList.remove('active');
  });
});

// Modal Functions
function openModal(modalID) {
  const modal = document.getElementById(modalID);
  modal.style.display = 'block';
  setTimeout(() => modal.classList.add('modal-active'), 10);
}

function closeModal(modalID) {
  const modal = document.getElementById(modalID);
  modal.classList.remove('modal-active');
  setTimeout(() => modal.style.display = 'none', 300);
}

// Close modal when clicking outside or on close button
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.classList.contains('close')) {
      closeModal(modal.id);
    }
  });
});

// Login Modal
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');

loginBtn.addEventListener('click', () => {
  openModal('loginModal');
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  alert(`Login successful, Welcome ${email}!`);
  closeModal('loginModal');
  loginBtn.textContent = `Welcome, ${email}`;
  loginBtn.style.background = '#27ae60';
});

// Reservation Modal
const openReservationModal = document.getElementById('openReservationModal');
const reservationModal = document.getElementById('reservationModal');
const reservationForm = document.getElementById('ReservationForm'); // Note: HTML has capital R

openReservationModal.addEventListener('click', () => {
  openModal('reservationModal');
  // Focus on the first input field after modal opens
  setTimeout(() => {
    const firstInput = reservationForm.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
});

// Contact Modal
const openContactModal = document.getElementById('openContactModal');
const contactModal = document.getElementById('contactModal');
const contactForm = document.getElementById('contactForm');

openContactModal.addEventListener('click', () => {
  openModal('contactModal');
  // Focus on the first input field after modal opens
  setTimeout(() => {
    const firstInput = contactForm.querySelector('input');
    if (firstInput) {
      firstInput.focus();
    }
  }, 100);
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent. Thank you!');
  contactForm.reset();
  closeModal('contactModal');
});

reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Reservation booked. Thank you!');
  reservationForm.reset();
  closeModal('reservationModal');
});

// Favorites Modal
const favoritesIcon = document.getElementById('favoritesIcon');
const favoritesModal = document.getElementById('favoritesModal');

favoritesIcon.addEventListener('click', () => {
  updateFavoritesModal();
  openModal('favoritesModal');
});

// Cart Sidebar
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.querySelector('.cart-close');

cartIcon.addEventListener('click', () => {
  cartSidebar.classList.toggle('active');
});

cartClose.addEventListener('click', () => {
  cartSidebar.classList.remove('active');
});

// Add to Cart Buttons
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const name = this.getAttribute('data-name');
    const price = this.getAttribute('data-price').replace('₹', '');
    const image = this.closest('.dish-card').querySelector('img').src;
    addToCart(name, price, image);
    this.textContent = 'Added!';
    this.classList.add('added');
    setTimeout(() => {
      this.textContent = 'Add to Cart';
      this.classList.remove('added');
    }, 2000);
  });
});

// Favorite Buttons
document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const name = this.getAttribute('data-name');
    toggleFavorite(name);
  });
});

// Dish Navigation
const prevDish = document.getElementById('prev-dish');
const nextDish = document.getElementById('next-dish');
const dishesContainer = document.getElementById('dishes-container');
let currentDishIndex = 0;

if (prevDish && nextDish) {
  prevDish.addEventListener('click', () => {
    const dishes = document.querySelectorAll('.dish-card');
    const totalDishes = dishes.length;
    if (currentDishIndex === 0) {
      currentDishIndex = totalDishes - 1;
    } else {
      currentDishIndex--;
    }
    dishesContainer.style.transform = `translateX(-${currentDishIndex * (280 + 32)}px)`; // 280px width + 32px gap
  });

  nextDish.addEventListener('click', () => {
    const dishes = document.querySelectorAll('.dish-card');
    const totalDishes = dishes.length;
    if (currentDishIndex === totalDishes - 1) {
      currentDishIndex = 0;
    } else {
      currentDishIndex++;
    }
    dishesContainer.style.transform = `translateX(-${currentDishIndex * (280 + 32)}px)`; // 280px width + 32px gap
  });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  });
}

// Initialize
updateCartUI();
updateFavoritesUI();
