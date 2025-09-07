
// Set the countdown to a target date (Unix timestamp format)
document.addEventListener('DOMContentLoaded', () => {
    // Ensure the date format is compatible across devices
    const targetDate = '2025-10-19T00:00:00Z';

    const countdownEnd = Math.floor(new Date(targetDate).getTime() / 1000);

    // Check if countdownEnd is valid
    if (!isNaN(countdownEnd)) {
        // Initialize FlipDown with valid countdownEnd
        new FlipDown(countdownEnd, {
            theme: 'light',
        }).start()
            .ifEnded(() => {
                console.log('Countdown ended!');
            });
    } else {
        console.error('Invalid countdown date');
    }
});
