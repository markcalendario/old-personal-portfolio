const express = require('express');
const app = express();
const cookies = require('cookie-parser')
const bodyParser = require('body-parser')

require('dotenv').config({ path: './.env.local' });


app.use(cookies());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.listen(process.env.PORT || 7000, async () => {
	console.log('Mark Kenneth Calendario Portfolio');
	console.log('LISTENING ON PORT: ' + process.env.PORT);
});

// Routes
const projects = require('./apis/projects');
const admin = require('./apis/admin');
const emailService = require('./apis/email-service');
app.use('/projects', projects);
app.use('/email-serve', emailService);
app.use('/admin', admin);
