var firebaseConfig = {
  apiKey: "AIzaSyCpLtjTHX0IdajdrLQNHB--8jpt_fW6BfQ",
  authDomain: "projectsearch-f5355.firebaseapp.com",
  databaseURL: "https://projectsearch-f5355.firebaseio.com",
  projectId: "projectsearch-f5355",
  storageBucket: "projectsearch-f5355.appspot.com",
  messagingSenderId: "196882104446"
};

//Initialize APP
var initializeApp = firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
   firebase.auth()

   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      window.location.assign("register.html");
      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code)
      console.log(error.message)
   });
}

function googleSignout() {
   firebase.auth().signOut()
   .then(function() {
      window.location.assign("index.html");
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')
   });
}
