const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtVerify } = require('../functions/jwt')

async function verifyJWTToken(req, res, next) {
    const isAuth = await jwtVerify(req.cookies.auth)
    if (!isAuth) return res.send({ isAuth: false, message: "Auth expired." })
    next()
}

router.post('/login', async (req, res) => {

    // The Login API 
    // It requires admin to input the unhashed bcrypt secret key to the input field
    // Then the unhash will compare to the hashed password saved from .env
    // If match, then sign a jwt then store to the client's pc
    await new Promise(resolve => {
        bcrypt.compare(req.body.password, process.env.LOGIN_SECRET_KEY, (error, same) => {

            if (!same) return res.send({ error: true, message: 'Incorrect Password.' });
            resolve();
        });
    })

    let cookieValue = await new Promise(resolve => {
        jwt.sign({ hashpass: process.env.LOGIN_SECRET_KEY }, process.env.JWT_SECRET, { expiresIn: '1h' }, function (err, token) {
            resolve(token);
        });
    })

    return res.cookie('auth', cookieValue, { httpOnly: true }).send({ error: false });
})

router.get('/auth', verifyJWTToken, async (req, res) => {
    res.send({ isAuth: true, message: "Authenticated" })
})

module.exports = router;