window.addEventListener('DOMContentLoaded', function () {
  var startTime = new Date().getTime(); // Get the current timestamp

  function updateTimer() {
    var currentTime = new Date().getTime(); // Get the current timestamp
    var elapsedTime = currentTime - startTime; // Calculate the elapsed time in milliseconds

    // Convert the elapsed time to hours, minutes, and seconds
    var hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    // Format the time as HH:MM:SS
    var formattedTime = padNumber(hours) + ":" + padNumber(minutes) + ":" + padNumber(seconds);

      // Update the timer element with the formatted time
      var timerElement = document.getElementById("timer");
      if (timerElement) {
        timerElement.textContent = formattedTime;
      }

     // Log the time in the console
    console.log("Current time:", formattedTime);

    // Request the next frame
    requestAnimationFrame(updateTimer);
  }

  // Start the timer
  updateTimer();
});

// Helper function to pad a number with leading zeros (e.g., 1 -> 01)
function padNumber(num) {
  return num.toString().padStart(2, "0");
}