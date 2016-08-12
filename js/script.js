document.getElementById('input-boxes').addEventListener('keydown', function(event) {
	if (event.keyCode === 13) {
		var newInput = document.createElement('input');
		newInput.setAttribute('class', 'input-field col s2 l2 m2');
		newInput.setAttribute('maxlength', '10');
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