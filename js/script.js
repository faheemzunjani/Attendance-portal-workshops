var student_count = 1;
document.getElementById('input-boxes').addEventListener('keydown', function(event) {
	if (event.keyCode === 13) {
		if (event.target.nodeName != "INPUT") {
			return false;
		}
		if (event.target.nodeName == 'BUTTON') {
			event.preventDefault();
			return false;
		}
		if (event.target.value.length == 0) {
			return false;
		}
		var newInput = document.createElement('input');
		newInput.setAttribute('class', 'input-field col s2 l2 m2');
		newInput.setAttribute('maxlength', '10');
		newInput.setAttribute('placeholder', 'IIIT*******');
		this.appendChild(newInput);
		newInput.focus();
	}
	else if (event.keyCode === 46) {
		this.removeChild(event.target);
		var myelems = this.getElementsByTagName('input');
		if (myelems.length != 0) {
			myelems[myelems.length-1].focus();
		}
	} 
	if (this.getElementsByTagName('input').length == 0) {
		var newInput = document.createElement('input');
		newInput.setAttribute('class', 'input-field col s2 l2 m2');
		newInput.setAttribute('maxlength', '10');
		this.appendChild(newInput);
		newInput.focus();
	} 
	
	// rename input elements' name
	var students = this.getElementsByTagName('input');
	for (var i = 0; i < students.length; i++) {
		students[i].setAttribute('name', 'student['+i+']');
	}
	student_count = students.length;
});

document.getElementsByTagName('button')[0].addEventListener('click', function() {
	var myform = document.forms[0];
	var username = myform.username.value;
	var password = myform.password.value;
	var wing = myform.wing.value;
	if (username.length < 10 || password.length == 0) {
		alert("Please fill all fields properly");
		return false;
	}
	if (wing <= 0) {
		alert("Please select a wing from the list.");
		return false;
	}

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			if (xmlhttp.responseText == '200') {
				document.forms[0].submit();
			} else if(xmlhttp.responseText == '401'){
				alert("You are not authorized to take attendance. :(");
			} else if(xmlhttp.responseText == '403') {
				alert("Invalid id/password");
			} else {
				alert("Cannot process at the moment. Try again or take some alternatives.");
			}
		}
	}
	xmlhttp.open("GET","logincheck.php?roll="+username+"&pass="+password,true);
	xmlhttp.send();
});


function submitForm() {
 // add other input elements from #inpub-boxes
 // create a url 
	//  var http = new XMLHttpRequest();
	// var url = "get_data.php";
	// var params = "lorem=ipsum&name=binny";
	// http.open("POST", url, true);

	// //Send the proper header information along with the request
	// http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	// http.onreadystatechange = function() {//Call a function when the state changes.
	//     if(http.readyState == 4 && http.status == 200) {
	//         alert(http.responseText);
	//     }
	// }
	// http.send(params);
	document.forms[0].submit();

}