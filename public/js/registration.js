// var provider = new firebase.auth.GoogleAuthProvider();
//
// function googleSignin() {
//    firebase.auth()
//
//    .signInWithPopup(provider).then(function(result) {
//       var token = result.credential.accessToken;
//       var user = result.user;
//
//       window.navigate("register.html");
//       console.log(token)
//       console.log(user)
//    }).catch(function(error) {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//
//       console.log(error.code)
//       console.log(error.message)
//    });
// }
//
// function googleSignout() {
//    firebase.auth().signOut()
//
//    .then(function() {
//       console.log('Signout Succesfull')
//    }, function(error) {
//       console.log('Signout Failed')
//    });
// }

//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    window.location = 'index.html'; //If User is not logged in, redirect to login page
  }
  // console.log(user);
  document.getElementById("userName").innerText=getPublisherInfo().displayName;

});

// //Account info
// var cuurentUser = firebase.auth().currentUser;
// console.log(currentUser);

$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

function setbg(color)
{
document.getElementById("styled").style.background=color
}
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
  street_Number = document.getElementById('street_number').value;
  street_Name = document.getElementById('route').value;
  txt_City = document.getElementById('locality').value;
  txt_State = document.getElementById('administrative_area_level_1').value;
  txt_Zip = document.getElementById('postal_code').value;
  txt_Country = document.getElementById('country').value;
  pubDate = getCurrentDate();
  pubTime = getCurrentTime();

  jobs.once('value', function(snapshot) {
        if (!snapshot.hasChild(job_id)) {
            jobs.child(job_id).set({
              jobID: job_id,
              jobTitle: job_Title,
              jobDescription: job_Description,
              "address":{ streetNumber: street_Number,
                streetName: street_Name,
                city: txt_City,
                state: txt_State,
                zip: txt_Zip,
                country: txt_Country},
              "publishedDate": pubDate,
              "publishedTime": pubTime,
              "publishedBy": getPublisherInfo().displayName,
              "publisherEmail": getPublisherInfo().email
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
  document.getElementById("job_Description").style.background=color
}

var x;

function functionRetrive1(){
  var coll = document.getElementsByClassName("collapsible");
  ref.child("jobs").orderByChild("jobsID").once("value", function(snapshot) {
    var jobData = snapshot.val();
    var i;
        for (var item in jobData) {
          x = jobData[item];

          var toAdd = document.createDocumentFragment();
          var content_jobID = document.createTextNode("Job ID: " + x.jobID);
          var content_jobTitle = document.createTextNode("Job Title: " + x.jobTitle);
          var content_jobDescription = document.createTextNode("Job Description: " + x.jobDescription);
          var content_location = document.createTextNode("Job Location: " + x.address.city + " " + x.address.state);
          var publishInfo = document.createTextNode("Published By: " + x.publishedBy + " on " + x.publishedDate);
          var parentDiv = document.createElement('button');
          var childDiv = document.createElement('div');
          var grandChildDiv1 = document.createElement('p');
          var grandChildDiv2 = document.createElement('p');
          var grandChildDiv3 = document.createElement('p');
          var grandChildDiv4 = document.createElement('p');

          for(var i=0; i < 2; i++){
            parentDiv.className = 'collapsible';
            parentDiv.appendChild(content_jobID);
            if(content_jobID){
              childDiv.className = 'content';
              grandChildDiv1.appendChild(content_jobTitle);
              grandChildDiv2.appendChild(content_jobDescription);
              grandChildDiv3.appendChild(content_location);
              grandChildDiv4.appendChild(publishInfo);
              childDiv.appendChild(grandChildDiv1);
              childDiv.appendChild(grandChildDiv2);
              childDiv.appendChild(grandChildDiv3);
              childDiv.appendChild(grandChildDiv4);
            }
            parentDiv.appendChild(childDiv);
            toAdd.appendChild(parentDiv);
            toAdd.appendChild(childDiv);
          }
          document.body.appendChild(toAdd);
        }
        for (i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }
  });
}

function getCurrentDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }
  today = mm + '/' + dd + '/' + yyyy;

  return today;
}

function getCurrentTime(){
  var d = new Date();
  var currentTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  return currentTime;
}

function getPublisherInfo(){
  let userInfo = firebase.auth().currentUser;
  return userInfo;
}
