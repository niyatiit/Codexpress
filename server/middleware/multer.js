// middlewares/multer.js
const multer = require('multer');

// Memory storage: keeps file in buffer, useful for processing before saving
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype.includes('officedocument') ||
    file.mimetype.startsWith('image/')
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, Word, and images allowed.'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
