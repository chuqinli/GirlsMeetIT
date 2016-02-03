var userObjects = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 3,
    center: {
      lat: defaultLat,
      lng: defaultLng
    }
  });

  infowindow = new google.maps.InfoWindow({
    content: "loading...",
    maxWidth: 400
  });

  // start JSON retrieval here
  $.ajax({
    type: 'GET',
    url: '../data/facebookOutput1.txt',
    dataType: 'json',
    success: function(data) {
      console.log(data);
      console.log(data[0].userName);
      for (var i = 0; i < data.length; i++) {
        var user = {
          posts: []
        };
        user.userName = data[i].userName;
        user.latitude = data[i].latitude;
        user.longtitude = data[i].longitude;
        user.about = data[i].about;
        user.coverpicURL = data[i].coverPicURL;
        for (var j = 0; j < 4; j++) {
          user.posts[j] = data[i].posts[j].message;
        }
        userObjects.push(user);

      }
      // $('#photo').attr("src",userObjects[0].coverpicURL);
      // $('.detail p').text((userObjects[0]).about);
      console.log("success get: ", userObjects[0].coverpicURL);
      addcard(userObjects)
      console.log("success addcard ");
      setMarkers(map);
      console.log("success setMarkers ");
    },
    error: function(err) {
      console.log("error" + err);
    }
  });

  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


};

function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'My location';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    }
  });
}

function getPosition(position) {
  defaultLat = position.coords.latitude;
  defaultLng = position.coords.longitude;
  map.setCenter({
    lat: defaultLat,
    lng: defaultLng
  });
}

function addcard(userObjects) {
  var s1 = '<div class="row card">   <div class="col-md-4">     <div class="image">       <img class="img-responsive img-rounded" src="';
  var s2 = '">     </div>     <div class="iconbar"></div>   </div>   <div class="col-md-8">     <div class="name"><h3> <a href="personal.html">';
  var s3 = '</a> </h3></div>     <div class="content">';
  var s4 = '</div>   </div> </div>';

  var html = '';
  for (var i = 0; i < userObjects.length; i++) {
    html += s1 + userObjects[i].coverpicURL + s2 + userObjects[i].userName + s3 + userObjects[i].about + s4;
  }
  document.getElementById("cardList").innerHTML = html;
}
