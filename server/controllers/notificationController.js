const Notification = require('../models/notification.model');
const mongoose = require('mongoose');

exports.createNotification = async (req, res) => {
  try {
    const { title, description, recipientType } = req.body;
    const sender = req.user.id; // Uncommented this line
    // console.log("this is sender",sender)
    // Basic validation
    if (!title || !description || !recipientType) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and recipient type are required'
      });
    }

    const notification = await Notification.create({
      title,
      description,
      sender,
      recipientType
    });

    res.status(201).json({
      success: true,
      data: notification
    });
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification'
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const user = req.user;
    let notifications;

    if (user.role === 'faculty') {
      // Faculty can see all notifications (both faculty and all)
      notifications = await Notification.find()
        .sort({ createdAt: -1 });
    } else {
      // Students can only see notifications meant for 'all'
      notifications = await Notification.find({ recipientType: 'all' })
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      data: notifications
    });
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
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