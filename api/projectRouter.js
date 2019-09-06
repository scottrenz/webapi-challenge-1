const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

router.use(express.json());

// GET /api
router.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

// GET /api/projects
router.get('/projects', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => next(error));
});

// POST /api/projects
router.post('/projects', (req, res, next) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => next(error));
});

router.use(errorHandler);

function errorHandler(error, req, res, next) {
  // do something with error before responding
  // like saving it to a database, sending a mail to the admin
  // or using an external logging service
  res.status(500).json(error.message);
}

module.exports = router;
