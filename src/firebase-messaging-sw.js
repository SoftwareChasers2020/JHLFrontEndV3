importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js');


firebase.initializeApp({
  messagingSenderId: "479494143539",
  apiKey: "AIzaSyCJvJ6LU_oC45-3R7YDYtfH7tcl_M7_q3s",
  projectId: "jhldb-a430b",
  appId: "1:479494143539:web:9ddc639c1fec992ae66d46",
});

const messaging = firebase.messaging()

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/jhldelivery/firebase-messaging-sw.js')
    .then(function(registration) {
      console.log("Service Worker Registered", registration);
    })
    .catch(function(err) {
      console.log("Service Worker Failed to Register", err);
    })
}
