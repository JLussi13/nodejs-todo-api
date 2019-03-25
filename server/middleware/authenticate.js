var {User} = require("./../models/user");

// Checks the current x-auth value in the header. If it matches a user, it will authenticate that user
// anc continue execution of whatever route was selected
var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
}

module.exports = {authenticate};