const express = require('express');
const app = express();

require('dotenv').config({ path: './.env.local' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.listen(process.env.PORT || 7000, async () => {
	console.log('Mark Kenneth Calendario Portfolio');
	console.log('LISTENING ON PORT: ' + process.env.PORT);
});

// Routes
const projects = require('./apis/projects');
const admin = require('./apis/admin');
app.use('/projects', projects);
app.use('/admin', admin);
