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


// Create a root reference
var ref = firebase.database().ref();
var storageRef = firebase.storage().ref();
var jobsRef = ref.child("jobs");
// var ref2 = firebase.database().ref("jobs");
var jobs = ref.child("jobs");

var job_id;

function functionSubmit(evt)
{
  job_id = document.getElementById('job_id').value;
  job_Title = document.getElementById('job_Title').value;
  job_Description = document.getElementById('job_Description').value;
  jobs.once('value', function(snapshot) {
        if (!snapshot.hasChild(job_id)) {
            jobs.child(job_id).set({
              jobID: job_id,
              jobTitle: job_Title,
              jobDescription: job_Description
            });
        }
        else {
            alert("That user already exists");
        }
  // jobsRef.push().set({
  //     jobID: "001",
  //     jobTitle: jobTitle
  // });
  console.log("Worked");
});
}

function setbg(color)
{
document.getElementById("styled").style.background=color
}
