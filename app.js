require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const listEndpoints = require('express-list-endpoints');
const cookieParser = require('cookie-parser');

// Database connect
mongoose.connect(
  process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
  },
  function (err) {
    if (err) {
      console.log('Connect mongoDB failed!!' + err);
    } else {
      console.log('Connect mongoDB successfull');
    }
  },
);

// Routes
const indexRoute = require('./routes/index.route');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const authRoute = require('./routes/auth.route');

// Middlewares
const sessionMiddleware = require('./middlewares/session.mdw');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'));

// use ejs engine
app.set('view engine', 'ejs');

// render views
app.use('/', indexRoute);
app.use('/account', authRoute);
app.use('/staff', userRoute);
app.use('/product', productRoute);
console.log(listEndpoints(app));

app.listen(PORT, function () {
  console.log(`Server started on http://localhost:${PORT}`);
});