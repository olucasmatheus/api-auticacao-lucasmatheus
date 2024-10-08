const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usuarioService = require('./config/db/routes/userRoute');
const autenticado = require('./jwt/userMiddleware');
const sequelize = require("./config/db/connection")

sequelize.authenticate()
.then(() => {
    console.log("Conexão feita com sucesso");
})
.catch(err => {
    console.error("Não foi possivel conectar:", err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', usuarioService);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;