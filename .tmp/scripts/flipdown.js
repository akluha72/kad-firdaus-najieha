"use strict";

// Set the countdown to a target date (Unix timestamp format)
document.addEventListener('DOMContentLoaded', function () {
  // Ensure the date format is compatible across devices
  var targetDate = '2025-10-19T00:00:00Z';
  var countdownEnd = Math.floor(new Date(targetDate).getTime() / 1000);

  // Check if countdownEnd is valid
  if (!isNaN(countdownEnd)) {
    // Initialize FlipDown with valid countdownEnd
    new FlipDown(countdownEnd, {
      theme: 'light'
    }).start().ifEnded(function () {
      console.log('Countdown ended!');
    });
  } else {
    console.error('Invalid countdown date');
  }
});
//# sourceMappingURL=flipdown.js.map