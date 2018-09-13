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

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Create a root reference
var ref = firebase.database().ref();
var storageRef = firebase.storage().ref();
var jobsRef = ref.child("jobs");


var testName = $('testName').text;

function functionSubmit(evt)
{
  testNameValue = document.getElementById('testName').value;
  ref.push({testName: testNameValue});

  jobsRef.set({
    001:{
      jobID: "001",
      jobTitle: "Software Developer"
    }
  });
  console.log("Worked");
}
