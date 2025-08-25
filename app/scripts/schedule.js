document.addEventListener('DOMContentLoaded', () => {
    // Define the schedule with times
    const schedule = [
        { time: '11:00 AM', element: document.querySelectorAll('.program-item')[0] },
        { time: '12:00 AM', element: document.querySelectorAll('.program-item')[1] },
        { time: '12:45 PM', element: document.querySelectorAll('.program-item')[2] },
        { time: '01:15 PM', element: document.querySelectorAll('.program-item')[3] },
        { time: '02:30 PM', element: document.querySelectorAll('.program-item')[4] },
        { time: '03:00 PM', element: document.querySelectorAll('.program-item')[5] },
        { time: '02:45 PM', element: document.querySelectorAll('.program-item')[6] },
        { time: '03:00 PM', element: document.querySelectorAll('.program-item')[7] }
    ];

    // Function to convert 12-hour time format to 24-hour Date object for comparison
    function parseTime(timeString) {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    }

    // Temporarily mock the current time for testing
    // const mockCurrentTime = new Date(); // Set this to a specific date/time for testing
    // mockCurrentTime.setHours(23); // Change hours to 12 for testing (adjust as needed)
    // mockCurrentTime.setMinutes(15); // Change minutes to 15 for testing (adjust as needed)

    // Get the current time
    // const currentTime = mockCurrentTime;
    const currentTime = new Date();
    let highlighted = false; // Track if an item has been highlighted
    console.log(currentTime);

    // Loop through the schedule to find the closest event
    for (let i = 0; i < schedule.length; i++) {
        const eventTime = parseTime(schedule[i].time);
        const nextEventTime = schedule[i + 1] ? parseTime(schedule[i + 1].time) : null;

        // Highlight the event if the current time falls between this event and the next
        if (currentTime >= eventTime && (!nextEventTime || currentTime < nextEventTime)) {
            schedule[i].element.classList.add('current');
            highlighted = true;
            break;
        }
    }

      // If no event is highlighted, highlight the first event (before the schedule starts)
      if (!highlighted) {
        schedule[0].element.classList.add('current');
    }
});
