const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, 'submittedQueries/');

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true }); 
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); 
  },
  filename: (req, file, cb) => {
    const teamName = req.body.teamName;
    const formattedName = teamName.replace(/\s+/g, '_');
    const originalName = file.originalname;
    console.log('these are values ', teamName, formattedName, originalName, ' extracted from ', req.body);

    cb(null, `${formattedName}_${req.body.dialect}_${originalName}`); // edhi_MySQL_sol1.txt
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

const uploadMiddleware = (req, res, next) => {
  const uploadSingle = upload.single('file');
  uploadSingle(req, res, (err) => {
      if (err) {
          console.log('error multer ', err.message)
          return res.status(400).json({ message: err.message });
      }
      next();
  });
};

module.exports = uploadMiddleware;
