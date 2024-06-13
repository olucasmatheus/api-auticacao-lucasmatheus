const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routesRegister = require('./config/db/routes/registerUsers');
const routesLogin = require('./config/db/routes/loginUsers');
const routesShow = require('./config/db/routes/showUsers');
const routesDelete = require('./config/db/routes/DeleteUsers');
const routesUpdate = require('./config/db/routes/ChangeUsers');
require('./config/db/connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', routesRegister);
app.use('/login', routesLogin);
app.use('/show', routesShow);
app.use('/delete', routesDelete);
app.use('/update', routesUpdate);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;