const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('photo'), (req, res) => {
    res.send('File uploaded!');
});

// Обработка GET-запроса для получения списка фотографий
app.get('/photos', (req, res) => {
    const uploadPath = path.join(__dirname, 'public/uploads/');

    fs.readdir(uploadPath, (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Отправляем список файлов клиенту
            res.json({ photos: files });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
