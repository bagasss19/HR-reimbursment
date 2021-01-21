const bcrypt = require('bcrypt')

function hashPassword(pass) {
    return bcrypt.hashSync(pass, 10);
}

function compare(pass, hashPass) {
    return bcrypt.compareSync(pass, hashPass)
}

module.exports = { hashPassword, compare}
