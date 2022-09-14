const jwt = require('jsonwebtoken');

async function jwtSign() {
	return new Promise((resolve) => {
		jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '30m' }, (err, token) => {
			resolve(token);
		});
	});
}

async function jwtVerify(jwtToken) {
	return new Promise((resolve) => {
		jwt.verify(jwtToken, process.env.JWT_SECRET, (error, decoded) => {
			if (error) {
				return resolve(false);
			}

			return resolve(true);
		});
	});
}

module.exports = { jwtSign, jwtVerify };
