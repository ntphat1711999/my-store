require('dotenv').config();
const express = require('express');

const userRoute = require('./routes/user.route');

const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));

// use ejs engine
app.set('view engine', 'ejs');

app.use('/', userRoute);

app.listen(PORT, function(){
    console.log(`Server started on http://localhost:${PORT}`);
});