// Initialize app
var myApp = new Framework7();


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

function addServer(data) {
    var formData = myApp.formToData('#addServer-form')
    alert(JSON.stringify(formData))

    $$.post('http://localhost:1337/user', {
        steamId: Math.floor((Math.random() * 1000000) + 1),
        username: formData.username
    }, function success(response, status, xhr) {
        console.log('Created a new user')
        alert(response)
        let user = response
        sendServerPOST(user)
    }, function error(xhr, status) {
        alert(status)
    })

    function sendServerPOST(user) {
        alert(user)
        $$.post('http://localhost:1337/api/sdtdserver/addserver', {
            serverip: formData.serverip,
            telnetport: formData.telnetport,
            telnetpassword: formData.telnetpassword,
            webport: formData.webport,
            ownerid: user.id
        }, function success(response, status, xhr) {
            console.log('Added server')
            console.log(response)
            alert(response)
        }, function error(response, status) {
            console.log('error adding server')
            alert(response)
            alert(status)
        })
    }





}