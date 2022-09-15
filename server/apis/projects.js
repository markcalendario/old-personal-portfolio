const express = require('express');
const router = express.Router();
const { DBConnection } = require('../database/database');
const path = require('path');
const ObjectId = require('mongodb').ObjectId;

// Display all projects
router.get('/list/:projectFilter', async (req, res) => {
	const db = await DBConnection();

	if (req.params.projectFilter === 'all') {
		return db
			.db('portfolio')
			.collection('projects')
			.find({})
			.toArray((error, result) => {
				db.close();
				if (error) {
					return res.sendStatus(500);
				}

				return res.send({ data: result });
			});
	}
	db.db('portfolio')
		.collection('projects')
		.find({ technologies: req.params.projectFilter })
		.toArray((error, result) => {
			db.close();
			if (error) {
				return res.sendStatus(500);
			}

			return res.send({ data: result });
		});
});

router.get('/project-photo/:photoId', (req, res) => {
	return res.sendFile(path.join(__dirname, '../uploads/projects/' + req.params.photoId));
});

// Project Information
router.get('/project-info/:projectId', async (req, res) => {
	if (!ObjectId.isValid(req.params.projectId)) {
		return res.sendStatus(404);
	}

	const db = await DBConnection();
	db.db('portfolio')
		.collection('projects')
		.findOne({ _id: ObjectId(req.params.projectId) }, (error, result) => {
			db.close();
			if (error) {
				return res.sendStatus(500);
			}

			return res.send({ data: result });
		});
});

// Latest Project
router.get('/latest', async (req, res) => {
	const db = await DBConnection();
	db.db('portfolio')
		.collection('projects')
		.find({})
		.sort({ _id: -1 })
		.limit(1)
		.toArray((error, result) => {
			db.close();
			if (error) {
				return res.sendStatus(500);
			}

			if (typeof result[0] === 'undefined') {
				return null
			}

			return res.send({ data: result[0] });
		});
});

// Latest Project
router.get('/featured-projects', async (req, res) => {
	const db = await DBConnection();
	db.db('portfolio')
		.collection('projects')
		.aggregate([
			{
				$match: { isFeatured: true },
			},
			{
				$limit: 5,
			},
			{
				$sort: { _id: -1 },
			},
		])
		.toArray((error, result) => {
			db.close();
			if (error) {
				return res.sendStatus(500);
			}

			return res.send({ data: result });
		});
});

// Technology Options
router.get('/tech-options', async (req, res) => {
	const db = await DBConnection()
	db.db('portfolio')
		.collection('projects')
		.distinct('technologies', (error, result) => {
			db.close()
			if (error) return res.send({ error: true, message: "Couldn't get tech options" })
			return res.send({ error: false, message: "Tech options fetched", techOptions: result })
		})
})

module.exports = router;