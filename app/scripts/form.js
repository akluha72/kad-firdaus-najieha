document.getElementById('rsvp_form').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    nama: document.getElementById('nama').value,
    telefon: document.getElementById('telefon').value,
    dewasa: document.getElementById('dewasa').value,
    kanak: document.getElementById('kanak').value,
  };

  fetch('https://script.google.com/macros/s/AKfycbzPF1JMQ6K1ODMhe6r80Q_CxSyAVtDvAV_Krdb96rnQYimT1DaAL0JK_fMDcDCsPcl2/exec', { // Replace with your Web app URL
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    replaceModalContent('Terima kasih! rsvp anda telah berjaya dihantar.', 'success');
  })
  .catch(error => {
    replaceModalContent('Maaf, terdapat masalah semasa menghantar maklumat anda. Sila cuba lagi.', 'error');
  });
});

// Function to replace modal content
function replaceModalContent(message, type) {
  const modalBody = document.querySelector('#rsvpModal .modal-body');
  modalBody.innerHTML = `
    <div class="message ${type}">
      <p>${message}</p>
    </div>
  `;
}

function increment(id) {
  const input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
}

function decrement(id) {
  const input = document.getElementById(id);
  if (parseInt(input.value) > 0) {
    input.value = parseInt(input.value) - 1;
  }
}
 