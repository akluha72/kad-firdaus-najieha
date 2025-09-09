const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbybqkKh3mSD5tHNxvX0gEKDTnc7et8pz9GkiLmnaCqJUSE0oNFtjwqbJsP_yv14Jmjn/exec';

function submitWish() {
  const name = document.getElementById('name').value.trim();
  const wish = document.getElementById('wish').value.trim();
  const submitBtn = document.querySelector('.submit-btn');

  if (!name || !wish) {
    replaceModalContent("Please fill in all fields.", "error");
    return;
  }

  // Disable button while submitting
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  fetch(SCRIPT_URL, {
    method: 'POST',
    // headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, wish })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then(data => {
      if (data.status === "success") {
        replaceModalContent("🎉 Successfully submitted! Thank you for your wish 💌", "success");

        // Clear form fields
        // document.getElementById('name').value = "";
        // document.getElementById('wish').value = "";

        // Reload wishes
        loadWishes();
      } else {
        replaceModalContent("❌ Something went wrong. Please try again.", "error");
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      replaceModalContent("❌ Something went wrong. Please try again.", "error");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="far fa-paper-plane"></i> Submit';
    });

}

// Load wishes
function loadWishes() {
  const loader = document.getElementById('loader');
  const list = document.getElementById('wishes');

  // Show loader, clear old wishes
  loader.style.display = 'block';
  list.innerHTML = '';

  fetch(SCRIPT_URL)
    .then(res => res.json())
    .then(data => {
      list.innerHTML = '';

      data.forEach(item => {
        const date = new Date(item.timestamp);
        const formattedDate = date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: '2-digit'
        });

        const wishDiv = document.createElement('div');
        wishDiv.classList.add('wish-container');

        const username = document.createElement('p');
        username.classList.add('wish-username');
        username.textContent = `- ${item.name} -`;

        const wishText = document.createElement('p');
        wishText.classList.add('wish-text');
        wishText.textContent = item.wish;

        const wishDate = document.createElement('p');
        wishDate.classList.add('wish-date');
        wishDate.textContent = `- ${formattedDate} -`;

        wishDiv.appendChild(username);
        wishDiv.appendChild(wishText);
        wishDiv.appendChild(wishDate);

        list.appendChild(wishDiv);
      });
    })
    .finally(() => {
      // Hide loader after loading
      loader.style.display = 'none';
    });
}

window.onload = loadWishes;

// Function to replace modal content
function replaceModalContent(message, type) {
  const modalBody = document.querySelector('#rsvpModal .modal-body');
  modalBody.innerHTML = `
    <div class="modal-message ${type}">
      <p>${message}</p>
    </div>
  `;
}
