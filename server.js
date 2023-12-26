const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Папка для хранения загруженных фотографий
const uploadFolder = './uploads/';
app.use(express.static(uploadFolder));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('photo'), (req, res) => {
  res.send('Фотография успешно загружена.');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
