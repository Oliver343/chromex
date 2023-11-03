const baseURL = "https://bug-free-dollop-94rw6v5767gfg64-3001.app.github.dev/"
let loggedInControl = false

function logginToggle (recievedToken) {
    loggedInControl = !loggedInControl
    document.getElementById("loginBox").style.display = loggedInControl ? "none" : "inherit"
    document.getElementById('tokenBox').value = recievedToken
    localStorage.setItem("token", recievedToken);
}

function submitButtonFunc() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;
    let successCheck = false
    
    if (loggedInControl) {
        logginToggle (" ")
    } else {
        fetch( baseURL + "api/token", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email, password: password}),
        })
        .then((recieved) => {
            console.log(recieved.ok)
            if (recieved.ok) {
                successCheck = true
            } else {
                successCheck = false
            }
            return recieved.json()
        })
        .then((data) => {
            if (successCheck) {
                logginToggle (data["access_token"])
            } else {
                document.getElementById('tokenBox').value = data["message"]
            }
            console.log(loggedInControl)
        })
        .catch((error) => console.log(error))
    }
}

// Getting the login button and assigning function to it.
document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', function() {
      submitButtonFunc();
  });
});


// Olivers code ends here


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