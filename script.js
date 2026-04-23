document.addEventListener('DOMContentLoaded', () => {
    // Target date: Next April 25th
    const calculateTargetDate = () => {
        const now = new Date();
        const currentYear = now.getFullYear();
        let targetDate = new Date(currentYear, 3, 25); // Month is 0-indexed (3 = April)

        // If April 25 has already passed this year, set for next year
        if (now.getTime() > targetDate.getTime()) {
            targetDate = new Date(currentYear + 1, 3, 25);
        }

        return targetDate;
    };

    const targetDate = calculateTargetDate();

    // DOM Elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const surpriseBtn = document.getElementById('surpriseButton');

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            // It's the day!
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";

            // Highlight the surprise button and enable it
            surpriseBtn.classList.add('animate-heartbeat');
            surpriseBtn.onclick = null; // Let the link work normally
            return;
        }

        // Prevent clicking the button early
        surpriseBtn.onclick = (e) => {
            e.preventDefault();
            window.location.href = 'https://birthday-site-nine-gamma.vercel.app/';
        };

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    };

    // Initial call
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
});
