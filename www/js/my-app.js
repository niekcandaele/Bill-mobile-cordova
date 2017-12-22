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
$$(document).on('deviceready', function() {
  console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.
// Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function(page) {
  // Do something here for "about" page
});

myApp.onPageInit('serverOverview', function(page) {
  console.log('Loading server overview')
  let server = storage.getItem('server');
  let htmlServerName = `                  <li>
                          <div class="item-content">
                              <div class="item-inner">
                                  <div class="item-title label">${server.name}</div>
                                  <div class="item-inner">
                                      <p>${server.description}</p>
                                  </div>
                              </div>
                          </div>
                      </li>`

  let htmlServerConnectInfo = `                  <li>
                          <div class="item-content">
                              <div class="item-inner">
                                  <div class="item-title label">${server.webPort}</div>
                                  <div class="item-inner">
                                      <p>${server.telnetPort}</p>
                                  </div>
                              </div>
                          </div>
                      </li>`
});

myApp.onPageInit('Players', async function(page) {
  console.log('Players page load')

  try {
    let players = await sendPlayersGET();

  } catch (e) {
    $$('#player-list').append("<p> Error getting players from the server! <br> " + e + " </p>")
  } finally {

  }
});

myApp.onPageInit('config', function(page) {
  console.log('Config page load')
  var formData;
  $$('.addServer-submit').on('click', function() {
    console.log('Clicked button')
    formData = myApp.formToData('#addServer-form');
    addServer(formData)
  });
});

async function addServer(formData) {
  console.log(`Adding server with data: ${formData}`)
  try {
    alert('Got it! Hold on while we configure your server...')
    let user = await sendUserPOST();
    let server = await sendServerPOST(user);
    alert('Your server has been configured!')
  } catch (error) {
    alert(`Error configuring your server! ${error}`)
  }


  function sendUserPOST() {
    return new Promise(resolve => {
      $$.post('https://csmm.herokuapp.com/user', {
          steamId: Math.floor((Math.random() * 1000000) + 1),
          username: formData.username
        }, function success(response, status, xhr) {
          let user = JSON.parse(response)
          storage.setItem('user', user);
          resolve(user)
        },
        function error(xhr, status) {
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
        let server = JSON.parse(response)
        storage.setItem('server', server)
        resolve(server)
      }, function error(response, status) {
        throw new Error(`Error performing request, status: ${status}`)
      })
    })
  }







}

function sendPlayersGET() {
  let server = storage.getItem('server')
  return new Promise(resolve => {
    $$.get("https://csmm.herokuapp.com/api/sdtdserver/players", {
      serverId: server.id
    }, function success(response, status, xhr) {
      resolve(JSON.parse(response));
    }, function error(response, status) {
      throw new Error(`Error performing request, status: ${status}`)
    })
  })
}
