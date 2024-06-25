const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usuarioService = require('./config/db/routes/userRoute');
const autenticado = require('./jwt/userMiddleware');

require('./config/db/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', autenticado, usuarioService);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;