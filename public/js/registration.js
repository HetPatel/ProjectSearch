
var types;
$(function() {
    $('#ms').change(function() {
        types = $(this).val();
        console.log(types);
    }).multipleSelect({
        width: '100%'
    });
});
//Handle Account Status
firebase.auth().onAuthStateChanged(user => {
  if(!user) {
    // window.location = 'index.html'; //If User is not logged in, redirect to login page
  }
  document.getElementById("userName").innerText=getPublisherInfo().displayName;

});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

function setbg(color){
  document.getElementById("styled").style.background=color
}

// Create a root reference
var ref = firebase.database().ref();
var storageRef = firebase.storage().ref();
var jobsRef = ref.child("jobs");
// var ref2 = firebase.database().ref("jobs");
var jobs = ref.child("jobs");

var job_id, content_jobTitle, job_Description, street_Number, street_Name, txt_City, txt_State, txt_Zip, txt_Country, txt_Salary;

function functionSubmit(evt){
  assignJobTypesValues();
  job_id = document.getElementById('job_id').value;
  job_Title = document.getElementById('job_Title').value;
  job_Description = document.getElementById('job_Description').value;
  street_Number = document.getElementById('street_number').value;
  street_Name = document.getElementById('route').value;
  txt_City = document.getElementById('locality').value;
  txt_State = document.getElementById('administrative_area_level_1').value;
  txt_Zip = document.getElementById('postal_code').value;
  txt_Country = document.getElementById('country').value;
  txt_Salary = document.getElementById('currency').value;
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
              "salary": txt_Salary,
              "publishedDate": pubDate,
              "publishedTime": pubTime,
              "publishedBy": getPublisherInfo().displayName,
              "publisherEmail": getPublisherInfo().email,
              "jobTypes": assignJobTypesValues()
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

var x;

function functionRetrive1(){
  var container = document.getElementById('container');
  var coll = document.getElementsByClassName("collapsible");
  ref.child("jobs").orderByChild("jobsID").once("value", function(snapshot) {
    var jobData = snapshot.val();
    var i;
        for (var item in jobData) {
          x = jobData[item];

          var toAdd = document.createDocumentFragment();
          var content_jobID = document.createTextNode("Job ID: " + x.jobID);
          content_jobTitle = document.createTextNode("Job Title: " + x.jobTitle);
          var content_jobDescription = document.createTextNode("Job Description: " + x.jobDescription);
          var content_location = document.createTextNode("Job Location: " + x.address.city + " " + x.address.state);
          var salary = document.createTextNode("Salary: $" + x.salary);
          var publishInfo = document.createTextNode("Published By: " + x.publishedBy + " on " + x.publishedDate);
          var jobTypes = document.createTextNode("Job Type: " + x.jobTypes);
          var parentDiv = document.createElement('button');
          var childDiv = document.createElement('div');

          var grandChildDiv1 = document.createElement('p');
          var grandChildDiv2 = document.createElement('p');
          var grandChildDiv3 = document.createElement('p');
          var grandChildDiv4 = document.createElement('p');
          var grandChildDiv5 = document.createElement('p');
          var grandChildDiv6 = document.createElement('p');
          var grandChildDiv6 = document.createElement('p');

          for(var i=0; i < 2; i++){
            parentDiv.className = 'collapsible';
            parentDiv.appendChild(content_jobID);
            if(content_jobID){
              childDiv.className = 'content';
              grandChildDiv1.appendChild(content_jobTitle);
              grandChildDiv2.appendChild(content_jobDescription);
              grandChildDiv3.appendChild(content_location);
              grandChildDiv4.appendChild(salary);
              grandChildDiv5.appendChild(publishInfo);
              grandChildDiv6.appendChild(jobTypes);
              childDiv.appendChild(grandChildDiv1);
              childDiv.appendChild(grandChildDiv2);
              childDiv.appendChild(grandChildDiv3);
              childDiv.appendChild(grandChildDiv4);
              childDiv.appendChild(grandChildDiv5);
              childDiv.appendChild(grandChildDiv6);
            }
            parentDiv.appendChild(childDiv);
            toAdd.appendChild(parentDiv);
            toAdd.appendChild(childDiv);
          }
          // document.body.appendChild(toAdd);
          container.appendChild(toAdd)
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

function functionLoad(){
  jobIDToLoad = document.getElementById('job_id2').value;
  ref.child("jobs").orderByChild("jobID").equalTo(jobIDToLoad).once("value", function(snapshot) {
    var userData = snapshot.val();
    if (userData){
      jobsRef.orderByValue().on("value", function(snapshot) {
        snapshot.forEach(function(data) {
          if(data.val().jobID==jobIDToLoad){
            document.getElementById('job_Title2').value = data.val().jobTitle;
            document.getElementById('job_Description2').value = data.val().jobDescription;
            types = data.val().jobTypes;
            console.log(types);
            for(let i=0; i<types.length; i++){
              document.getElementById('job_Types2').value = data.val().jobTypes;
            }
            document.getElementById('currency2').value = data.val().salary;
            document.getElementById('street_number2').value = data.val().address.streetNumber;
            document.getElementById('route2').value = data.val().address.streetName;
            document.getElementById('locality2').value = data.val().address.city;
            document.getElementById('administrative_area_level_12').value = data.val().address.state;
            document.getElementById('postal_code2').value = data.val().address.zip;
            document.getElementById('country2').value = data.val().address.country;
          }else {
            console.log("Couldn't find a player match, Please try again with a different Job ID");
          }
        });
      });
    }
  });
}

function functionEdit(){
  document.getElementById("job_Title2").disabled = false;
  document.getElementById("job_Description2").disabled = false;
  document.getElementById("job_Types2").disabled = true;
  document.getElementById("currency2").disabled = false;
  document.getElementById("street_number2").disabled = false;
  document.getElementById("route2").disabled = false;
  document.getElementById("locality2").disabled = false;
  document.getElementById("administrative_area_level_12").disabled = false;
  document.getElementById("postal_code2").disabled = false;
  document.getElementById("country2").disabled = false;
}

function functionSubmitEdited(evt){
  job_id = document.getElementById('job_id2').value;
  job_Title = document.getElementById('job_Title2').value;
  job_Description = document.getElementById('job_Description2').value;
  // job_Types = document.getElementById('job_Types2').value;
  street_Number = document.getElementById('street_number2').value;
  street_Name = document.getElementById('route2').value;
  txt_City = document.getElementById('locality2').value;
  txt_State = document.getElementById('administrative_area_level_12').value;
  txt_Zip = document.getElementById('postal_code2').value;
  txt_Country = document.getElementById('country2').value;
  txt_Salary = document.getElementById('currency2').value;

  jobs.once('value', function(snapshot) {
        if (snapshot.hasChild(job_id)) {
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
              "salary": txt_Salary,
              "lastModifiedDate": getCurrentDate(),
              "lastModifiedTime": getCurrentTime(),
              "editedBy": getPublisherInfo().displayName,
              "editedByEmail": getPublisherInfo().email,
              "jobTypes": assignJobTypesValues()
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

function getCurrentDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is
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

function getJobTypes(){
  totalJobTypes = document.getElementsByClassName('select-pure__label')[0].children.length;
  jobTypes = document.getElementsByClassName('select-pure__label')[0].children;
  var types = [];
  for (var i = 0; i < totalJobTypes; i++) {
    types.push(jobTypes[i].innerText);
  }
  return types;
}

function getSelectedValues(){
            var dropDown = document.getElementById('jobTypesSelect'), jobTypesArray = [], i;
            for (i = 0; i < dropDown.options.length ; i ++) {
                if (dropDown.options[i].selected) {
                    jobTypesArray.push( dropDown.options[i].text);
                    //countryArray.push({ Name: dropDown.options[i].text, Value: dropDown.options[i].value });
                }
            }
            return jobTypesArray;
}

function assignJobTypesValues(){
  var mappedValue = [];
  for (var i = 0; i<types.length; i++){
    switch(types[i]){
    case "1":
        mappedValue.push("Full Time");
        break;
    case "2":
        mappedValue.push("Part Time");
        break;
    case "3":
        mappedValue.push("Temporary");
        break;
    case "4":
        mappedValue.push("Contract");
        break;
    case "5":
        mappedValue.push("Internship");
        break;
    case "6":
        mappedValue.push("Volunteer");
        break;
    case "7":
        mappedValue.push("Casual");
        break;
    case "8":
        mappedValue.push("Freelance");
        break;
    case "9":
        mappedValue.push("Permanent");
        break;
      }
  }
  return(mappedValue);
}
