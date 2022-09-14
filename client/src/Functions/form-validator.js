function isEmpty(value) {
	if (value === '' || value === null || value === undefined) {
		return true;
	}

	return false;
}

function isValidEmail(email) {
	let emailRegex = new RegExp(
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);

	if (emailRegex.test(email)) {
		return true;
	}

	return false;
}

module.exports = { isEmpty, isValidEmail };
