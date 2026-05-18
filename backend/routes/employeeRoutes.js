const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, employeeController.addEmployee);
router.get('/', protect, employeeController.getEmployees);
router.get('/search', protect, employeeController.searchEmployees);

module.exports = router;
