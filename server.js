'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const { success, info, warning, error, fatal, bold } = require('./logger');

const config = require('./config');


let app = express();


// Set up Pug for rendering
app.set('view engine', 'pug');
app.set('views', './views');

// Disable Express headers
app.disable('x-powered-by');

// Required by Pug to use absolute paths
app.locals.basedir = path.resolve(app.get('views'));


// Log all requests
app.use((req, res, next) => {
  info(`${req.ip} ${req.method} ${req.url}`);
  next();
});


// Check if file is a valid view
app.use((req, res, next) => {
  let url = req.url;

  // Append index to folders
  if (url.endsWith('/')) {
    url += 'index';
  }

  // Check if file exists
  let file_path = path.join(app.locals.basedir, url + '.pug');

  fs.access(file_path, (err) => {
    if (! err) {
      // If the view exists, render it
      res.render(file_path, { pathname: req.url });
    } else {
      // Otherwise, skip it
      next();
    }
  });
});


app.use('/', express.static('./static', {
  extensions: ['html']
}));


app.listen(config.port, () => {
  success(`Started server on port ${bold(config.port)}`);
});
