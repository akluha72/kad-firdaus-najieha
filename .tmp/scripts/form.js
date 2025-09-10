"use strict";

var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybqkKh3mSD5tHNxvX0gEKDTnc7et8pz9GkiLmnaCqJUSE0oNFtjwqbJsP_yv14Jmjn/exec';
function submitWish() {
  var name = document.getElementById('name').value.trim();
  var wish = document.getElementById('wish').value.trim();
  var submitBtn = document.querySelector('.submit-btn');
  if (!name || !wish) {
    replaceModalContent('Please fill in all fields.', 'error');
    return;
  }

  // Disable button while submitting
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  fetch(SCRIPT_URL, {
    method: 'POST',
    // headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      wish: wish
    })
  }).then(function (res) {
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  }).then(function (data) {
    if (data.status === 'success') {
      replaceModalContent('🎉 Successfully submitted! Thank you for your wish 💌', 'success');

      // Clear form fields
      // document.getElementById('name').value = "";
      // document.getElementById('wish').value = "";

      // Reload wishes
      loadWishes();
    } else {
      replaceModalContent('❌ Something went wrong. Please try again.', 'error');
    }
  }).catch(function (err) {
    console.error('Fetch error:', err);
    replaceModalContent('❌ Something went wrong. Please try again.', 'error');
  }).finally(function () {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="far fa-paper-plane"></i> Submit';
  });
}

// Load wishes
function loadWishes() {
  var loader = document.getElementById('loader');
  var list = document.getElementById('wishes');

  // Show loader, clear old wishes
  loader.style.display = 'block';
  list.innerHTML = '';
  fetch(SCRIPT_URL).then(function (res) {
    return res.json();
  }).then(function (data) {
    list.innerHTML = '';
    data.reverse().forEach(function (item) {
      var date = new Date(item.timestamp);
      var formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
      });
      var wishDiv = document.createElement('div');
      wishDiv.classList.add('wish-container');
      var username = document.createElement('p');
      username.classList.add('wish-username');
      username.textContent = "- ".concat(item.name, " -");
      var wishText = document.createElement('p');
      wishText.classList.add('wish-text');
      wishText.textContent = item.wish;
      var wishDate = document.createElement('p');
      wishDate.classList.add('wish-date');
      wishDate.textContent = "- ".concat(formattedDate, " -");
      wishDiv.appendChild(username);
      wishDiv.appendChild(wishText);
      wishDiv.appendChild(wishDate);
      list.appendChild(wishDiv);
    });
  }).finally(function () {
    // Hide loader after loading
    loader.style.display = 'none';
  });
}
window.onload = loadWishes;

// Function to replace modal content
function replaceModalContent(message, type) {
  var modalBody = document.querySelector('#rsvpModal .modal-body');
  modalBody.innerHTML = "\n    <div class=\"modal-message ".concat(type, "\">\n      <p>").concat(message, "</p>\n    </div>\n  ");
}
//# sourceMappingURL=form.js.map