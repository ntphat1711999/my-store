require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

// Database connect
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, function(err){
    if(err){
        console.log("Connect mongoDB failed!!" + err);
    }
    else {
        console.log("Connect mongoDB successfull")
    }
});

// Route
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');

const app = express();
const PORT = process.env.PORT;

app.use(express.static('public'));

// use ejs engine
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('pages/index');
});

app.use('/staff', userRoute);

app.use('/product', productRoute);

app.listen(PORT, function(){
    console.log(`Server started on http://localhost:${PORT}`);
});