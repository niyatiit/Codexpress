const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController') // ✅ matches file name
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');

// Upload Resource (Faculty only)
router.post('/upload', upload.single('file'),authMiddleware.userVerification,resourceController.uploadResource);

router.get(
    '/course/:courseId',
    authMiddleware.userVerification,
    resourceController.getResourcesByCourse
);
router.get(
    '/faculty/:facultyId',
    authMiddleware.userVerification,
    resourceController.getResourcesByFaculty
);
// Get a single resource by ID
router.get(
    '/:resourceId',
    authMiddleware.userVerification,
    resourceController.getResourceById
);

// Delete a resource (Faculty who uploaded it or admin)
router.delete(
    '/:resourceId',
    authMiddleware.userVerification,
    resourceController.deleteResource
);

module.exports = router;  