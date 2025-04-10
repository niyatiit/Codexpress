const Resource = require('../models/resource.model');
const Course = require('../models/course.model');
const { uploadFileToStorage } = require('../utils/fileUpload');
const mongoose = require('mongoose'); // or remove if unnecessary

exports.uploadResource = async (req, res) => {
    try {
        const { title, description, course } = req.body;
        const file = req.file;
        const uploadedBy = req.user.id; // From auth middleware
        
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        // Validate course exists
        const courseExists = await Course.findById(course);
        if (!courseExists) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Upload file to storage (S3, local, etc.)
        const fileUrl = await uploadFileToStorage(file, 'resources');

        const newResource = new Resource({
            title,
            description,
            course,
            fileUrl,
            uploadedBy,
            fileName: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size
        });

        await newResource.save();

        await Course.findByIdAndUpdate(course, {
            $push: { resources: newResource._id }
        });

        res.status(201).json({
            success: true,
            message: 'Resource uploaded successfully',
            data: newResource
        });

    } catch (error) {
        console.error('Error uploading resource:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to upload resource',
            error: error.message
        });
    }
};

// @desc    Get resources by course
// @route   GET /api/resources/course/:courseId
// @access  Private
exports.getResourcesByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const resources = await Resource.find({ course: courseId })
            .populate('uploadedBy', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: resources.length,
            data: resources
        });

    } catch (error) {
        console.error('Error fetching resources:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resources'
        });
    }
};

// @desc    Get resources by faculty
// @route   GET /api/resources/faculty/:facultyId
// @access  Private
exports.getResourcesByFaculty = async (req, res) => {
    try {
        const { facultyId } = req.params;

        const resources = await Resource.find({ uploadedBy: facultyId })
            .populate('course', 'name code')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: resources.length,
            data: resources
        });

    } catch (error) {
        console.error('Error fetching faculty resources:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch faculty resources'
        });
    }
};

// @desc    Get single resource
// @route   GET /api/resources/:resourceId
// @access  Private
exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.resourceId)
            .populate('course', 'name code')
            .populate('uploadedBy', 'name email');

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        res.json({
            success: true,
            data: resource
        });

    } catch (error) {
        console.error('Error fetching resource:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resource'
        });
    }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:resourceId
// @access  Faculty (owner) or Admin
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.resourceId);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        // Check if user is owner or admin
        if (resource.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this resource'
            });
        }

        // Delete file from storage first
        await deleteFileFromStorage(resource.fileUrl);

        await resource.remove();

        res.json({
            success: true,
            message: 'Resource deleted successfully'
        });

    } catch (error) {
        console.error('Error deleting resource:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete resource'
        });
    }
};