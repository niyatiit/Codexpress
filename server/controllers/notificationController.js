const Notification = require('../models/notification.model');
const User = require('../models/user.model');

exports.createNotification = async (req, res) => {
  try {
    const { title, message, recipientType, course, batch } = req.body;
    
    const notification = new Notification({
      title,
      message,
      sender: req.user.id,
      recipientType,
      course,
      batch
    });

    // For demo, we'll just save without complex recipient handling
    await notification.save();

    res.status(201).json({
      success: true,
      data: notification
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { 'recipients.user': req.user.id },
        { recipientType: 'all' },
        { recipientType: req.user.role }
      ]
    }).sort('-createdAt').limit(10);

    res.json({
      success: true,
      data: notifications
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    // Simple mark as read implementation
    const recipient = notification.recipients.find(r => r.user.equals(req.user.id));
    if (recipient) {
      recipient.read = true;
      recipient.readAt = new Date();
      await notification.save();
    }

    res.json({
      success: true,
      data: notification
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.deleteNotification = async (req, res) => {
    try {
      await Notification.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };
  
  exports.updateNotificationStatus = async (req, res) => {
    try {
      const notification = await Notification.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );
      res.json({
        success: true,
        data: notification
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };