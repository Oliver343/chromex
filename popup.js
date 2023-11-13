const baseURL = "https://redesigned-umbrella-gwj6x9rqg9x3wqrx-3001.app.github.dev/"


if (!localStorage.getItem("loggedIn")){ 
    document.getElementById("hiddenOnStart").hidden = true
    document.getElementById("loginBox").hidden = false
}

function sendSession (session) {

    session["current_user_id"] = localStorage.getItem("currentUserId")
    console.log(session)
    fetch(baseURL + "api/sessions", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token")},
        body: JSON.stringify(session),
    }).then((recieved) => {
        return recieved.json()
    }).then((data) => {
        console.log(data)
        localStorage.setItem("currentSessionId", data.id) // saves session ID to localstorage so we can update the same session later
        return data
    }).catch((error) => {
        console.log(error)
    })
}

function updateSession (session)
 {
    session["current_user_id"] = localStorage.getItem("currentUserId")
    session["id"] = localStorage.getItem("currentSessionId")
    fetch(baseURL + "api/sessions", {
        method: "PUT",
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("token")},
        body: JSON.stringify(session),
    }).then((recieved) => {
        return recieved.json()
    }).then((data) => {
        console.log(data)
        return data
    }).catch((error) => {
        console.log(error)
    })
 }


function userLogin (email, password) {
    if (localStorage.getItem("loggedIn")) { 
        console.log("LOGOUT")
        localStorage.removeItem("loggedIn");
        chrome.storage.local.remove("loggedIn").then((result) => console.log(result + " removed"));
        localStorage.setItem("token", null);
        localStorage.removeItem("currentUserId")
        localStorage.removeItem("currentUserName")
        localStorage.removeItem("currentUserEmail")
        localStorage.removeItem("currentSessionId")
        document.getElementById("hiddenOnStart").hidden = true
        document.getElementById("loginBox").hidden = false
    } else {
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
                    console.log(data)
                    localStorage.setItem("token", data["access_token"]);
                    chrome.storage.local.set({'token': data["access_token"]})
                    localStorage.setItem("loggedIn", true);
                    chrome.storage.local.set({'loggedIn': true})
                    chrome.storage.local.get('loggedIn').then((result) => console.log("Value currently is " + result.key))
                    document.getElementById("hiddenOnStart").hidden = false
                    document.getElementById("loginBox").hidden = true
                    resolve(true)
                    return "Logged in."
                } else {
                    return data["message"]
                }
            })
            .catch((error) => console.log(error))
        })
    }

}

function getUserInfo (email) {
    fetch( baseURL + "api/users", {
        method: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
    })
    .then((recieved) => {
        console.log(recieved)
        return recieved.json()
    })
    .then((data) => {
        console.log(data)
        data.forEach(element => {
            console.log("EMAIL : " + email)
            console.log("ELEMENT EMAIL : " + element["email"])
            if( email == element["email"]) {
                console.log(element)
                localStorage.setItem("currentUserId", element["id"])
                chrome.storage.local.set({'currentUserId': element["id"]})
                localStorage.setItem("currentUserName", element["name"])
                localStorage.setItem("currentUserEmail", element["email"])
            }
        });
        return data
    })
    .catch((error) => console.log(error))
}

async function runFetch(email, password) {
    await userLogin(email, password);
    await getUserInfo(email);
  }  

// Getting the login button and assigning 'runFetch' function to it.
document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', function() {
    runFetch(document.getElementById('emailInput').value, document.getElementById('passwordInput').value)
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

