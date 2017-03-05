function sendInfo(){
	var info=new Object();
	info.heading=document.getElementById("heading").value;
	info.category=document.getElementById("category").value;
	info.description=document.getElementById("description").value;
	info.expDate=document.getElementById("date").value;
    console.log(document.getElementById("date").value);
	// info.time=document.getElementById("time").value;
	info.link=document.getElementById("link").value;	
	info.code=document.getElementById("code").value;
	info.latitude=document.getElementById("Latitude").value;
	info.longitude=document.getElementById("Longitude").value;
	// info.timestamps=document.getElementById("Timestamp").value;
	info.name=document.getElementById("name").value;
	info.number=document.getElementById("number").value;
	info.email=document.getElementById("email").value;
	info.address=document.getElementById("address").value;
	var url = "http://democodefundo.azurewebsites.net/api/v1/coupons";
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    }
    JSON.stringify(info);
    var sendInfo = "";
    for (var key in info) {
      if (info.hasOwnProperty(key)) {
        sendInfo+=key+"="+info[key]+"&"
        // console.log(key + " -> " + p[key]);
      }
    }
    console.log(info);
    // xhr.send('email=person&address=password&latitude=place&number=key');
    xhr.send(sendInfo);
    // alert(info);
    
}