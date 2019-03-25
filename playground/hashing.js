const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// })

var hashedPassword = "$2a$10$KO6ornY6216TKkr2hHoY7OJMWpLgQ2j9a6u8OEh.2UM5LlTvb79Ei";
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
})

// var data = {
//     id: 10
// };

// var token = jwt.sign(data, "secret123");

// var decoded = jwt.verify(token, "secret123");
// console.log(decoded);
// var message = "I like bananananana";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// Hashing the data so it is not in plain text, user can't make requests it does not have access to
// Salting to make the hash unique by adding a secret string at the end that the user will not be able to see
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + "somesecret").toString()
// }

// var resultHash = SHA256(JSON.stringify(data) + "somesecret").toString();

// if (resultHash === token.hash) {
//     console.log ("Data was validated");
// } else {
//     console.log("Data was invalid!");
// }