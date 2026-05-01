const express = require('express');
const router = express.Router();
const { createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/:projectId', createTask);
router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
