const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const users = require('./routes/api/users');
const courses = require('./routes/api/courses');
const results = require('./routes/api/results');
const centre = require('./routes/api/centre');
const classes = require('./routes/api/classes');
const exams = require('./routes/api/exams');
const mail = require('./routes/api/mail');
const config = require('./config/key');
const path = require('path');

mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', users);
app.use('/api/courses', courses);
app.use('/api/results', results);
app.use('/api/centre', centre);
app.use('/api/classes', classes);
app.use('/api/exams', exams);
app.use('/api/mail', mail);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

if (process.env.NODE_ENV === 'production') {
    app.listen(process.env.PORT, '0.0.0.0');
} else {
    const port = 5000;
    app.listen(port, () => { console.log(`server started at port ${port}`) });
}
