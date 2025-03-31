const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, notificationController.createNotification);
router.get('/my', auth, notificationController.getUserNotifications);
router.patch('/:id/read', auth, notificationController.markAsRead);
router.delete('/:id', auth, notificationController.deleteNotification);
router.patch('/:id/status', auth, notificationController.updateNotificationStatus);
module.exports = router;