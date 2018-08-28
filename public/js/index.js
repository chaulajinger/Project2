$(function () {
  const noResult = "(nothing chosen yet!)";
  var result = noResult; //should be reset after choices made
$("#nav-link").on("click",() => {
  if(result !== noResult){
    return $.get({
      url:window.location.href = "/colors/" + color + ".handlebars"
    }); 
  }
});


  // Get references to page elements
  var $colorText = $("#color-text");
  var $colorDescription = $("#color-description");
  var $submitBtn = $("#submit");
  var $colorList = $("#color-list");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveExample: function (color) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/examples",
        data: JSON.stringify(color)
      });
    },
    getExamples: function () {
      return $.ajax({
        url: "api/examples",
        type: "GET"
      });
    },
    deleteExample: function (id) {
      return $.ajax({
        url: "api/examples/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshExamples = function () {
    API.getExamples().then(function (data) {
      var $colors = data.map(function (example) {
        var $a = $("<a>")
          .text(colors.text)
          .attr("href", "/example/" + colors.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": colors.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      $colorList.empty();
      $colorList.append($colors);
    });
  };

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function (event) {
    event.preventDefault();

    var example = {
      text: $exampleText.val().trim(),
      description: $exampleDescription.val().trim()
    };

    if (!(example.text && example.description)) {
      alert("You must enter an example text and description!");
      return;
    }

    API.saveExample(example).then(function () {
      refreshExamples();
    });

    $exampleText.val("");
    $exampleDescription.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteExample(idToDelete).then(function () {
      refreshExamples();
    });
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $colorList.on("click", ".delete", handleDeleteBtnClick);



  //SPOTIFY
  //Ajax

  var colors = ["blue", "orange", "green", "gold"];

  // //Color inspired albums. Subject to change!
  // var blueAlbum = "6VhDYmsjHqRxKXd0z7hmXI";
  // var orangeAlbum = "392p3shh2jkxUxY2VHvlH8";
  // var greenAlbum = "5iS6VDjeV6KuOu66t1P1bn";
  // var goldAlbum = "59ePhOhLFvSOFG4L5FRGzp";

  // var accessToken = '.env';

  // $.ajax({
  //   //Currently hard-coded to blue. How to choose, TBD
  //   url: 'https://api.spotify.com/v1/albums/' + blueAlbum,
  //   type: 'GET',
  //   headers: {
  //     'Authorization': 'Bearer ' + accessToken
  //   },

  // }).then(function (response) {
  //   console.log("artist: " + response.artists[0].name);
  //   console.log("album: " + response.name);

  //   $(".artist").append(response.artists[0].name)
  //   $(".album").append(response.name)
  // });


  // //-----------------------------------------------------------------------------
  // //Survey data
  //$(document).ready(function () {
  //   console.log("page ready");


    var person = prompt("Please enter your name.");

    if (person != null) {
      document.getElementById("welcomeYou").innerHTML =
        "Hello " + person + "! How are you today?";
    }

    $("#submitButton").on("click", function (event) {
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

      // $.post("/api/colors/:id", userData, function (data) {
      //   $("#userName").append(userData.name);
      //   $("#userPic").append(userData.pic);
      //   $("#userBio").append(userData.bio);
      //   $("#scores").append(userData.scores);
      // });
      // $.post("/api/colors", userData, function (data) {
      //   $("#userName").append(userData.name);
      //   $("#userPic").append(userData.pic);
      //   $("#userBio").append(userData.bio);
      //   $("#scores").append(userData.scores);
      // });

      // $.post("/api/examples/:id", userData, function (data) {
      //   $("#userName").append(userData.name);
      //   $("#userPic").append(userData.pic);
      //   $("#userBio").append(userData.bio);
      //   $("#scores").append(userData.scores);
      // });

      $(".modal").modal();

      //Intialize color values
      var blue = 0;
      var orange = 0;
      var green = 0;
      var gold = 0;


      //Store input as variables
      var q1 = $("#q1").val() === "true";
      var q2 = $("#q2").val() === "true";
      var q3 = $("#q3").val() === "true";
      var q4 = $("#q4").val() === "true";
      var q5 = $("#q5").val() === "true";
      var q6 = $("#q6").val() === "true";
      var q7 = $("#q7").val() === "true";
      var q8 = $("#q8").val() === "true";
      var q9 = $("#q9").val() === "true";
      var q10 = $("#q10").val() === "true";
      var q11 = $("#q11").val() === "true";

      //List answers on the modal
      //$("#userName").append("Thank you " + userData.name +". You answered: <br>");
      //for (i = 0; i < userData.scores.length; i++) {
      // $("#userName").append(userData.scores[i], "<br>");        
      //};


      //Show color in modal
      //$("#userName").append("COLOR WILL BE HERE!");
      //Send button (click handler) uses ajax to submit post request to the API that we have written, 
      //the response needs to be a link containing ID of created Item.
      if (q1) {
        blue++;
      }

      if (q2) {
        green++;
      }

      if (q3) {
       gold++;
      }

      if (q4) {
        orange++;
      }

      if (q5) {
        blue++;
      }

      if (q6) {
        green++;
      }

      if (q7) {
        gold++;
      }

      if (q8) {
        orange++;
      }

      if (q9) {
        blue++;
      }

      if (q10) {
        green++;
      }

      if (q11) {
        gold++;
      }

      if (q12) {
        orange++;
      }

      if (q13) {
        blue++;
      }

      if (q14) {
        green++;
      }

      if (q15) {
        gold++;
      }

      if (q16) {
        orange++
      }

      if (q17) {
        blue++;
      }

      if (q18) {
        green++;
      }

      if (q19) {
        gold++;
      }

      if (q20) {
        orange++;
      }

      //Show the name of the color with the highest amount of relevant responses
      var all = [green, blue, orange, gold],
        maxVal = Math.max.apply(Math.max, all);
        choiceNames = ["green", "blue", "orange", "gold"],
        maxValName = choiceNames[all.indexOf(maxVal)];
  
        result = maxValName;
      console.log("the winner is" , result);

      //Show results
      console.log("blueScore:" + blue);
      console.log("orangeScore:" + orange);
      console.log("goldScore:" + gold);
      console.log("greenScore:" + green);

      console.log("Your color is ", result);
      $("#userName").append(`CONGRATULATIONS ${userData.name.toUpperCase()} ${result.toUpperCase()} IS YOUR TRUE COLOR!<br>
      <a href="/colors/${result}"
      id= "#navlink"
      class= "#nav-link btn btn-primary btn-lg active"
      role= "button"
      aria-pressed="true"> Primary link </a>`)
    });
  //});
});