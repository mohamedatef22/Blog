const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://localhost/blog',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Failed To connect to db'))
}