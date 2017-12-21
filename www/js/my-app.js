// Initialize app
var myApp = new Framework7();
var storage = window.localStorage;


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.
// Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
})

async function addServer() {
    var formData = myApp.formToData('#addServer-form')
    try {
        let user = await sendUserPOST();
        let server = await sendServerPOST(user);
        return console.log('ready');
    } catch (error) {
        alert(`Error configuring your server! ${error}`)
    }


    function sendUserPOST() {
        return new Promise(resolve => {
            $$.post('https://csmm.herokuapp.com/user', {
                steamId: Math.floor((Math.random() * 1000000) + 1),
                username: formData.username
            }, function success(response, status, xhr) {
                storage.setItem('user', user);
                resolve(JSON.parse(response))
            }, function error(xhr, status) {
                throw new Error(`Error performing request, status: ${status}`)
            })
        })
    }

    function sendServerPOST(user) {
        return new Promise(resolve => {
            $$.post('https://csmm.herokuapp.com/api/sdtdserver/addserver', {
                serverip: formData.serverip,
                telnetport: formData.telnetport,
                telnetpassword: formData.telnetpassword,
                webport: formData.webport,
                ownerid: user.id
            }, function success(response, status, xhr) {
                storage.setItem('server', server)
                resolve(JSON.parse(response))
            }, function error(response, status) {
                throw new Error(`Error performing request, status: ${status}`)
            })
        })
    }

    function sendPlayersGET() {
        let server = storage.getItem('server')
        $$.get("https://csmm.herokuapp.com/api/sdtdserver/players", {
            serverId: server.id
        }, function success(response, status, xhr) {

        }, function error(response, status) {
            
        })
    }





}