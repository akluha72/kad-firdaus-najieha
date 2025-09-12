"use strict";

var currentModalId = null;
function openModal(modalId) {
  if (currentModalId && currentModalId !== modalId) {
    closeModal(currentModalId);
  }
  var modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex'; // Show the modal background
    var modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.remove('slide-out');
      modalContent.classList.add('slide-in');
    }
    currentModalId = modalId;
  }
}
function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  if (modal) {
    var modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.remove('slide-in');
      modalContent.classList.add('slide-out');

      // Remove modal display after animation duration
      setTimeout(function () {
        modal.style.display = 'none';
        modalContent.classList.remove('slide-out');
      }, 250); // 600ms to match the animation duration
    }
    currentModalId = null;
  }
}

// Optional: Close modal if clicked outside of modal content
window.onclick = function (event) {
  if (event.target.classList.contains('modal')) {
    closeModal(currentModalId);
  }
};
//# sourceMappingURL=nav.js.map