const express=require('express')
const router=express.Router()
const { studentDashboard } = require('../controllers/studentController');
const {userVerification}=require('../middleware/authMiddleware')

router.get('/',userVerification,studentDashboard)

module.exports = router;