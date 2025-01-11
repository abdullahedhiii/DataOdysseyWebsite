const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, 'submittedQueries/');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true }); 
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'submittedQueries/'); 
  },
  filename: (req, file, cb) => {
    const teamName = req.body.teamName ;
    const formattedName = teamName.replace(/\s+/g, '_');
    const originalName = file.originalname;
    cb(null, `${formattedName}_${originalName}_${req.body.dialect}`); //if name is edhi then it saves edhi_solA_MySQL
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['.txt','.sql']; 
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedFileTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only .sql and .txt files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5 MB
  },
  fileFilter,
});

module.exports = upload;
