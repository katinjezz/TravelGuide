// ===========================================
// KAMAU FAMILY CHRISTMAS TOUR GUIDE
// LIVE COUNTDOWN
// ===========================================

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

// Stop if this page doesn't have a countdown
if (days && hours && minutes && seconds) {

    const tripDate = new Date("2026-12-17T00:00:00").getTime();

    function updateCountdown() {

        const now = Date.now();

        const distance = tripDate - now;

        if (distance <= 0) {

            days.textContent = "0";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            return;

        }

        days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));

        hours.textContent = String(
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        ).padStart(2, "0");

        minutes.textContent = String(
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        ).padStart(2, "0");

        seconds.textContent = String(
            Math.floor((distance % (1000 * 60)) / 1000)
        ).padStart(2, "0");

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

}