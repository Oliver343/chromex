const baseURL = "https://bug-free-dollop-94rw6v5767gfg64-3001.app.github.dev/"

function userLogin (email, password) {
    return new Promise((resolve) => {
        let successCheck = false
        fetch(baseURL + "api/token", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email, password: password}),
        })
        .then((recieved) => {
            if (recieved.ok) {
                successCheck = true
            } else {
                successCheck = false
            }
            return recieved.json()
        })
        .then((data) => {
            if (successCheck) {
                localStorage.setItem("token", data["access_token"]);
                resolve(true)
                return "Logged in."
            } else {
                return data["message"]
            }
        })
        .catch((error) => console.log(error))
    })
}

function getUserInfo (email) {
    fetch( baseURL + "api/users", {
        method: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
    })
    .then((recieved) => {
        return recieved.json()
    })
    .then((data) => {
        let theUser = {}
        data.forEach(element => {
            if( email == element["email"]) {
                theUser = element
                localStorage.setItem("currentUser", theUser)
            }
        });
        return data
    })
    .catch((error) => console.log(error))
}

async function runFetch(email, password) {
    const promiseResult = userLogin(email, password);
    if (promiseResult) {
        getUserInfo(email)
    }
  }  

// Getting the login button and assigning 'runFetch' function to it.
document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', function() {
    runFetch(document.getElementById('emailInput').value, document.getElementById('passwordInput').value);
  });
});

// In order to login the function 'runFetch' can be called with the arguments 'email' and 'password'
// If successful the token will be stored in local storage under 'token' and the user as an object under 'currentUser'


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