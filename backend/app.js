const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

// DELETE USER ROUTE
const app = express();

app.use(session({
    secret: 'some secret',
    cookie: {maxAge: 30000 },
    saveUninitialized : false
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const auth = require('./auth');

const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/article', auth, articleRoutes);
app.use('/api/comment', auth, commentRoutes);
app.use('/api/conversation', auth, conversationRoutes);
app.use('/api/message', auth, messageRoutes);
app.use('/api/user', auth, userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;