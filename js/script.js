document.getElementById('input-boxes').addEventListener('keydown', function(event) {
	if (event.keyCode === 13) {
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
	console.log("Form submitted");

}