const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    await new Promise(resolve => {
        bcrypt.compare(req.body.password, process.env.HASHED_PASSWORD, (error, same) => {
            if (!same) {
                return res.send({error: true, message: 'Incorrect Password.'});
            }

            resolve();
        });
    })

    let cookieValue = await new Promise(resolve => {
        jwt.sign({ hashpass: process.env.HASHED_PASSWORD }, process.env.JWT_SECRET, { expiresIn: '1h' }, function(err, token) {
            resolve(token);
        });
    })

    return res.cookie('at', cookieValue, { httpOnly: true }).send({ error: false });
})

module.exports = router;