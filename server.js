// Create express app
const express = require('express');

const webapp = express();

const mongoose = require('mongoose');

const path = require('path');

const cors = require('cors');

const cookieParser = require('cookie-parser');

require('dotenv').config();

const source = process.env.ATLAS_CONNECTION;

const groupRoutes = require('./controllers/group.controller');

const userRoutes = require('./controllers/user.controller');

const authRoutes = require('./controllers/auth.controller');

const postRoutes = require('./controllers/post.controller');

const filterRoutes = require('./controllers/filterGroups.controller');

const postFilterRoutes = require('./controllers/filterPosts.controller');


mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('DB connected.');
});

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(cors());

webapp.use(cookieParser());

webapp.use(express.static(path.join(__dirname, './client/build')));

// Start server
const port = process.env.PORT || 8080;
webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

// TODO: define all endpoints as specified in REST API

webapp.use('/api/groups', groupRoutes);

webapp.use('/api/user', userRoutes);

webapp.use('/api/auth', authRoutes);

webapp.use('/api/filter', filterRoutes);

webapp.use('/api/posts', postRoutes);

webapp.use('/api/postFilter', postFilterRoutes);


// Root endpoint
webapp.get('*', (req, res) => {
  const index = path.join(__dirname, 'client/build', 'index.html');
  res.sendFile(index);
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

module.exports = webapp;
