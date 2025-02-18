const express = require('express');
require('./db/mongoose');
const usuarioRouter = require('./routers/usuario');
const tareaRouter = require('./routers/tarea');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(usuarioRouter);
app.use(tareaRouter);



app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

