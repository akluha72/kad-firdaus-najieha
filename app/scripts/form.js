const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzp03InwEWZq9aN-jfvmtloI5dOWzIsHKe4XlcUvbrZbiGZNkW8Ezhdqc2SJgRtw0WA/exec';

// Send new wish
function submitWish() {
  const name = document.getElementById('name').value;
  const wish = document.getElementById('wish').value;

  fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ name, wish })
  })
    .then(res => res.json())
    .then(data => {
      alert('Wish submitted! 🎉');
      loadWishes(); // reload wishes after submit
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
    <div class="message ${type}">
      <p>${message}</p>
    </div>
  `;
}
