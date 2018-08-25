// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);



//SPOTIFY
//Ajax

var colors = ["blue", "orange", "green", "gold"];

//Color inspired albums. Subject to change!
var blue = "6VhDYmsjHqRxKXd0z7hmXI";
var orange = "392p3shh2jkxUxY2VHvlH8";
var green = "5iS6VDjeV6KuOu66t1P1bn";
var gold = "59ePhOhLFvSOFG4L5FRGzp";

var accessToken = '.env';




$.ajax({
  //Currently hard-coded to blue. How to choose, TBD
  url: 'https://api.spotify.com/v1/albums/' + blue,
  type: 'GET',
  headers: {
      'Authorization' : 'Bearer ' + accessToken
  },
  
  }).then(function(response){
      console.log("artist: " + response.artists[0].name);
      console.log("album: " + response.name);

      $(".artist").append(response.artists[0].name)
      $(".album").append(response.name)


});


//---------------------------------------------------------------

//Survey data
$(document).ready(function() { 

  var person = prompt("Please enter your name", "(John Doe)");

  if (person != null) {
    document.getElementById("welcomeYou").innerHTML =
    "Hello " + person + "! How are you today?";
}

     $("#submitButton").on("click", function(event) {
          event.preventDefault();
          var userData = {
              name: person,
              pic: $("#photo").val(),
              bio: $("#bio").val(),
              scores: [
                  $("#q1").val(),
                  $("#q2").val(),
                  $("#q3").val(),
                  $("#q4").val(),
                  $("#q5").val(),
                  $("#q6").val(),
                  $("#q7").val(),
                  $("#q8").val(),
                  $("#q9").val(),
                  $("#q10").val(),
                  $("#q11").val(),
              ]
          };
     
      $.post("/api/colors/:id", userData, function (data) {
          $("#userName").append(userData.name);
          $("#userPic").append(userData.pic);
          $("#userBio").append(userData.bio);
          $("#scores").append(userData.scores);
      });

      $.post("/api/examples/:id", userData, function (data) {
        $("#userName").append(userData.name);
        $("#userPic").append(userData.pic);
        $("#userBio").append(userData.bio);
        $("#scores").append(userData.scores);
    });
     
      $(".modal").modal();
      $("#name").val("");
      $("#photo").val("");
      $("#q1").val("");
      $("#q2").val("");
      $("#q3").val("");
      $("#q4").val("");
      $("#q5").val("");
      $("#q6").val("");
      $("#q7").val("");
      $("#q8").val("");
      $("#q9").val("");
      $("#q10").val("");
      $("#q11").val("");

      //Show name, answers in modal
      $("#userName").append("Thank you " + userData.name +". You answered: <br>");

      for (i = 0; i < userData.scores.length; i++) {
        $("#userName").append(userData.scores[i], "<br>");
      };


      //Show color in modal
      $("#userName").append("COLOR WILL BE HERE!");
      //Send button (click handler) uses ajax to submit post request to the API that we have written, 
      //the response needs to be a link containing ID of created Item.
  });
});

