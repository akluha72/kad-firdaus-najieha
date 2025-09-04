"use strict";

var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzp03InwEWZq9aN-jfvmtloI5dOWzIsHKe4XlcUvbrZbiGZNkW8Ezhdqc2SJgRtw0WA/exec";

// Send new wish
function submitWish() {
  var name = document.getElementById("name").value;
  var wish = document.getElementById("wish").value;
  fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify({
      name: name,
      wish: wish
    })
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    alert("Wish submitted! 🎉");
    loadWishes(); // reload wishes after submit
  });
}

// Load wishes
function loadWishes() {
  fetch(SCRIPT_URL).then(function (res) {
    return res.json();
  }).then(function (data) {
    var list = document.getElementById("wishes");
    list.innerHTML = "";
    data.forEach(function (item) {
      // Format the date nicely (optional)
      var date = new Date(item.timestamp);
      var formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit"
      });

      // Create container
      var wishDiv = document.createElement("div");
      wishDiv.classList.add("wish-container");

      // Username
      var username = document.createElement("p");
      username.classList.add("wish-username");
      username.textContent = "- ".concat(item.name, " -");

      // Wish text
      var wishText = document.createElement("p");
      wishText.classList.add("wish-text");
      wishText.textContent = item.wish;

      // Date
      var wishDate = document.createElement("p");
      wishDate.classList.add("wish-date");
      wishDate.textContent = "- ".concat(formattedDate, " -");

      // Append children
      wishDiv.appendChild(username);
      wishDiv.appendChild(wishText);
      wishDiv.appendChild(wishDate);

      // Add to list
      list.appendChild(wishDiv);
    });
  });
}
window.onload = loadWishes;

// Function to replace modal content
function replaceModalContent(message, type) {
  var modalBody = document.querySelector('#rsvpModal .modal-body');
  modalBody.innerHTML = "\n    <div class=\"message ".concat(type, "\">\n      <p>").concat(message, "</p>\n    </div>\n  ");
}
//# sourceMappingURL=form.js.map