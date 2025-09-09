"use strict";

var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzp03InwEWZq9aN-jfvmtloI5dOWzIsHKe4XlcUvbrZbiGZNkW8Ezhdqc2SJgRtw0WA/exec';

// Send new wish
function submitWish() {
  var name = document.getElementById('name').value;
  var wish = document.getElementById('wish').value;
  fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      wish: wish
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    alert('Wish submitted! 🎉');
    loadWishes(); // reload wishes after submit
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
    data.forEach(function (item) {
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
  modalBody.innerHTML = "\n    <div class=\"message ".concat(type, "\">\n      <p>").concat(message, "</p>\n    </div>\n  ");
}
//# sourceMappingURL=form.js.map