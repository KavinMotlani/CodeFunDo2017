function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

var x = document.getElementById("location");
var latitude;
var longitude;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function onGeoSuccess(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  }
  //console.log("d");

function caldistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // km (change this constant to get miles)
  var dLat = (lat2-lat1) * Math.PI / 180;
  var dLon = (lon2-lon1) * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  if (d>1) return Math.round(d)+" km";
  else if (d<=1) return Math.round(d*1000)+" m";
  return d;
}

function handle_json(data) {
  var news = document.getElementsByClassName("Newsfeed")[0];
  var items = $.parseJSON(data);
  console.log(items);
  for(var i = 0; i < items.length; i++) {
      var card = document.createElement("div");
      card.setAttribute("class", "w3-card-4");
      card.setAttribute("style","width:100% align:center");
      var cardHeader = document.createElement("header");
      cardHeader.setAttribute("class","w3-container w3-light-grey w3-center");
      var cardHeaderHeading = document.createElement("h3");
      cardHeaderHeading.innerHTML = items[i].heading;
      cardHeader.appendChild(cardHeaderHeading);
      var cardBody = document.createElement("div");
      cardBody.setAttribute("class", "w3-container");
      var category = document.createElement("div");
      var distance = document.createElement("div");
      category.setAttribute("style", "float: left;");
      distance.setAttribute("style", "float: right;");
      category.innerHTML = items[i].category;
      distance.innerHTML = caldistance(latitude,longitude,items[i].latitude,items[i].longitude);
      cardBody.appendChild(category);
      cardBody.appendChild(distance);
      var br1 = document.createElement("br");
      var hr = document.createElement("hr");
      cardBody.appendChild(br1);
      cardBody.appendChild(hr);
      var image = document.createElement("img");
      image.setAttribute("src", "img_avatar3.png");
      image.setAttribute("alt", "Avatar");
      image.setAttribute("class", "w3-left w3-circle w3-margin-right");
      image.setAttribute("style", "width:60px");
      cardBody.appendChild(image);
      var description = document.createElement("p");
      description.setAttribute("align","center");
      description.innerHTML = items[i].description;
      var br2 = document.createElement("br");
      description.appendChild(br2);
      cardBody.appendChild(description);
      var details = document.createElement("button");
      details.setAttribute("class", "w3-button w3-block w3-dark-grey");
      details.setAttribute("id", "hideshow");
      var contactInfo = document.createElement("div");
      contactInfo.setAttribute("class", "w3-container");
      contactInfo.setAttribute("id", "content");
      var userName = document.createElement("div");
      userName.setAttribute("class", "row");
      var p1 = document.createElement("p");
      var nameIcon = document.createElement("span");
      nameIcon.setAttribute("class", "glyphicon glyphicon-user");
      p1.appendChild(nameIcon);
      p1.innerHTML = items[i].name;
      userName.appendChild(p1);
      contactInfo.appendChild(userName);
      var phone = document.createElement("div");
      phone.setAttribute("class", "row");
      var p2 = document.createElement("p");
      var phoneIcon = document.createElement("span");
      phoneIcon.setAttribute("class", "glyphicon glyphicon-earphone");
      p2.appendChild(phoneIcon);
      var calllink = document.createElement("a");
      calllink.setAttribute("href", "tel:+91"+items[i].number);
      p2.innerHTML = items[i].number;
      phone.appendChild(p2);
      contactInfo.appendChild(phone);
      details.innerHTML = "Show details";
      var cardFooter = document.createElement("footer");
      cardFooter.setAttribute("class","w3-container w3-blue w3-right");
      var cardFooterHeading = document.createElement("h8");
      cardFooterHeading.innerHTML = "Expiry Date : " + items[i].expDate;
      cardFooter.appendChild(cardFooterHeading);
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      //card.appendChild(details);
      card.appendChild(contactInfo);
      card.appendChild(cardFooter);
      news.appendChild(card);
      var br3 = document.createElement("br");
      news.appendChild(br3);
  }
}
window.onload = httpGetAsync("http://democodefundo.azurewebsites.net/api/v1/coupons", handle_json);
window.onload = getLocation();

