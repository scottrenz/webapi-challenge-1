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

// GET /api/projects/actions/:id
router.get('/projects/actions/:id', (req, res, next) => {
  const id = req.url.substring(req.url.lastIndexOf(":")+1).replace('/api','').replace('/projects','').replace('/actions','').replace('/','')
  Projects.getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
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

// PUT /api/actions
router.put('/projects', (req, res, next) => {
  console.log('project put',req.body)
    Projects.update(req.body.id,req.body)
      .then(project => {
        res.status(201).json(project);
      })
      // .catch(error => console.log(error));
      .catch(error => next(error));
  });
    
// DELETE /api/actions
router.delete('/projects/:id', (req, res) => {
  const id = req.url.substring(req.url.lastIndexOf(":")+1).replace('/api','').replace('/projects','').replace('/','')
  console.log('url',req.url)
  console.log('id',id)
  Projects.get(id)
  .then(response => {
     Projects.remove(id)
     .then(result => {
         // console.log('deleted title '+id)
       res.status(200).json(response);
     })
     .catch(error => next(error));
     
     })
     .catch(error => next(error));
    })


router.use(errorHandler);

function errorHandler(error, req, res, next) {
  // do something with error before responding
  // like saving it to a database, sending a mail to the admin
  // or using an external logging service
  res.status(500).json(error.message);
}

module.exports = router;
