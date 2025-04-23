const express = require('express');
require('./db/mongoose');
const usuarioRouter = require('./routers/usuario');
const tareaRouter = require('./routers/tarea');

const app = express();
const port = process.env.PORT || 3000;

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word document'));
        }

        cb(undefined, true);
    }
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});

app.use(express.json());
app.use(usuarioRouter);
app.use(tareaRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

