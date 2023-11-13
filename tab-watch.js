const baseURL = "https://redesigned-umbrella-gwj6x9rqg9x3wqrx-3001.app.github.dev/"

let url
let secs = 0
let timer
let session = {}
let currentUserId
let currentToken

function sendSession (session) {
    
    // session = {
    //     "total_time" : 1000,
    //     "work_time" : 600,
    //     "fun_time" : 400,
    //     "url" : "http:youtube.com/1234"
    // }

    chrome.storage.local.get(["currentUserId"]).then((result) => {currentUserId = result["currentUserId"]})
    chrome.storage.local.get(["token"]).then((result) => {currentToken = result["token"]})
    console.log("CURRENT USER!")
    console.log(currentUserId)
    console.log(currentToken)


    session["current_user_id"] = currentUserId
    console.log("SESSION IS :")
    console.log(session)
    fetch(baseURL + "api/sessions", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": "Bearer " + currentToken},
        body: JSON.stringify(session),
    }).then((recieved) => {
        return recieved.json()
    }).then((data) => {
        console.log(data)
        // localStorage.setItem("currentSessionId", data.id) // saves session ID to localstorage so we can update the same session later
        return data
    }).catch((error) => {
        console.log(error)
    })
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
    session = {
        "total_time" : secs,
        "work_time" : 0,
        "fun_time" : 0,
        "url" : url
    }
    chrome.storage.local.get(["loggedIn"]).then((result) => {
        console.log(JSON.stringify(result))
        if (result["loggedIn"]) {
            console.log("SEND SESSION")
            console.log(secs)
            console.log(url)
            sendSession(session)
        } else {
            console.log("DONT SEND")
            console.log(secs)
            console.log(url)
        }
      });


    // start new session
    secs = 1
    console.log("START NEW SESSION")
    if (timer) {
        clearInterval(timer)
    }
    
    console.log(activeInfo);
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        console.log(url)
    });
    timer = setInterval(function(){
        secs++;
    }, 1000);

});

