// utils/fileUpload.js
const path = require('path');
const fs = require('fs');

const uploadFileToStorage = (file, folder = 'resources') => {
  return new Promise((resolve, reject) => {
    const uploadPath = path.join(__dirname, `../uploads/${folder}`);

    // Make sure folder exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const fileName = Date.now() + '-' + file.originalname;
    const fullPath = path.join(uploadPath, fileName);

    // Move file to target folder
    fs.writeFile(fullPath, file.buffer, (err) => {
      if (err) return reject(err);
      // Return relative URL path (can be used in browser)
      resolve(`/uploads/${folder}/${fileName}`);
    });
  });
};

module.exports = { uploadFileToStorage };
