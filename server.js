require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const app = express();

// const { MongoClient, ServerApiVersion } = require('mongodb');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.log('MongoDB Connection Error:', err));

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(flash());

// Middleware
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('http://localhost:' + PORT);
});

// console.log("MongoDB URI:", process.env.MONGO_URI); // Debugging