
// Load environment variables
const dotenv = require('dotenv');
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './env/development.env' });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './env/production.env' });
}

const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('./config/socket');
io.makeSocketServer(http);

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

http.listen(process.env.PORT, () => {
  console.log(`${process.env.APP_NAME} is listening on port ${process.env.PORT}.`);
});
