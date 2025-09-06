const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;

    // Dynamically choose folder based on field name
    if (file.fieldname === 'profileImageURL') {
      uploadPath = path.join(__dirname, '../public/uploads/profile');
    } else if (file.fieldname === 'coverImageURL') {
      uploadPath = path.join(__dirname, '../public/uploads/blog');
    } else {
      uploadPath = path.join(__dirname, '../public/uploads');
    }

    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    // const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-'+ file.originalname;
    cb(null, uniqueName);
  }
});

// Create upload middleware
const upload = multer({ storage });

module.exports = upload;
