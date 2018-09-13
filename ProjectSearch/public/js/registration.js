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
  street_Number = document.getElementById('street_number').value;
  street_Name = document.getElementById('route').value;
  txt_City = document.getElementById('locality').value;
  txt_State = document.getElementById('administrative_area_level_1').value;
  txt_Zip = document.getElementById('postal_code').value;
  txt_Country = document.getElementById('country').value;
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
                country: txt_Country}
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

function functionRetrive(){
  ref.child("jobs").orderByChild("jobsID").once("value", function(snapshot) {
    var jobData = snapshot.val();
    for (var item in jobData) {
      x = jobData[item];

      var toAdd = document.createDocumentFragment();
      var content_jobID = document.createTextNode("Job ID: " + x.jobID);
      var content_jobTitle = document.createTextNode("Job Title: " + x.jobTitle);
      var content_jobDescription = document.createTextNode("Job Description: " + x.jobDescription);
      var parentDiv = document.createElement('button');
      var childDiv = document.createElement('div');
      var grandChildDiv1 = document.createElement('p');
      var grandChildDiv2 = document.createElement('p');

      for(var i=0; i < 2; i++){
        parentDiv.className = 'collapsible';
        parentDiv.appendChild(content_jobID);
        if(content_jobID){
          childDiv.className = 'content';
          grandChildDiv1.appendChild(content_jobTitle);
          grandChildDiv2.appendChild(content_jobDescription);
          childDiv.appendChild(grandChildDiv1);
          childDiv.appendChild(grandChildDiv2);
        }
        parentDiv.appendChild(childDiv);
        toAdd.appendChild(parentDiv);
        toAdd.appendChild(childDiv);
      }
      document.body.appendChild(toAdd);

      /* var content_streetNumber = document.createTextNode(x.address.streetNumber);
      // var content_jobID = document.createTextNode(x.jobID);
      // var content_jobID = document.createTextNode(x.jobID);
      // var content_jobID = document.createTextNode(x.jobID);
      // var content_jobID = document.createTextNode(x.jobID);
      // var content_jobID = document.createTextNode(x.jobID);
      div.appendChild(content_jobID);
      div.appendChild(content_jobTitle);
      div.appendChild(content_jobDescription);

      var jobID_Div = document.getElementById("populateJobID");
      var jobTitle_Div = document.getElementById("populateJobTitle");
      var jobDescription_Div = document.getElementById("populateJobDescription");

      document.body.insertBefore(div, jobID_Div);
      document.body.insertBefore(div, jobTitle_Div);
      document.body.insertBefore(div, jobDescription_Div);*/


      //document.getElementById("retrive_job_id_table").innerHTML=x.jobID;
      //document.getElementById('retrive_job_id').value=x.jobID;
    }
  });
}

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
          var parentDiv = document.createElement('button');
          var childDiv = document.createElement('div');
          var grandChildDiv1 = document.createElement('p');
          var grandChildDiv2 = document.createElement('p');
          var grandChildDiv3 = document.createElement('p');

          for(var i=0; i < 2; i++){
            parentDiv.className = 'collapsible';
            parentDiv.appendChild(content_jobID);
            if(content_jobID){
              childDiv.className = 'content';
              grandChildDiv1.appendChild(content_jobTitle);
              grandChildDiv2.appendChild(content_jobDescription);
              grandChildDiv3.appendChild(content_location);
              childDiv.appendChild(grandChildDiv1);
              childDiv.appendChild(grandChildDiv2);
              childDiv.appendChild(grandChildDiv3);
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
