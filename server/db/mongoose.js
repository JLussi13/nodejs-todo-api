var mongoose = require('mongoose')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }).then(() => {
    console.log("Connected to database");
}, (e) => {
    console.log(e);
});
module.exports = {mongoose};