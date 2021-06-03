const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const ApiRoutes = require('./api/routes/api');
const userRoutes = require('./api/routes/user');
const Documentation = require('./api/routes/documentation');

mongoose.connect('mongodb+srv://abhinay:'+process.env.MONGO_ATLAS_PW+'@cluster0.k0uht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-ALlow_Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method=='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/', Documentation);
app.use('/api', ApiRoutes);
app.use('/user', userRoutes);
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status = error.status || 500;
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;