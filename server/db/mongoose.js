var mongoose = require('mongoose')

mongoose.Promise = global.Promise;
console.log(process.env.MONGOLAB_URI)
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }).then(() => {
    console.log("Connected to database");
}, (e) => {
    console.log("Failed to connect to MongoDB");
});
module.exports = {mongoose};
