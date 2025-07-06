const express = require('express');
const router = express.Router();
const auth=require("../middleware/authMiddleware")
const notificationController = require('../controllers/notificationController');
// Create a new notification
router.post('/',auth.userVerification, notificationController.createNotification);

// Get all notifications for current user
router.get('/',auth.userVerification, notificationController.getNotifications);

// Mark a notification as read
router.patch('/:id/read', notificationController.markAsRead);

// Delete a notification
router.delete('/:id', notificationController.deleteNotification);

// Update notification status
router.patch('/:id/status', notificationController.updateNotificationStatus);

module.exports = router;
