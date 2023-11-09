const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const indexRoute = require('./routes/index');
const apiRoute = require('./routes/api');
const uploadRoute = require('./routes/uploadRoute');

app.use('/', indexRoute);
app.use('/api', apiRoute);
app.use('/upload', uploadRoute);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({'status': 500, 'message': err.stack});
});

app.listen(port, () => {
    console.log(`Сервер запущен | http://localhost:${port}`);
});
