const express = require('express');
const router = express.Router();
const { createProject, getProjects, getProjectById, addMember } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All project routes are protected

router.route('/')
  .post(createProject)
  .get(getProjects);

router.route('/:id')
  .get(getProjectById);

router.post('/:projectId/members', addMember);

module.exports = router;
