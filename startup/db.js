const mongoose = require('mongoose')
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/blog'
module.exports = function () {
    mongoose.connect(dbURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
    .then(() => console.log('Connected to db'))
    .catch(() => console.log('Failed To connect to db'))
}