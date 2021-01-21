const jwt = require('jsonwebtoken')

function generateToken(param) {
    return jwt.sign(param,"bagasganteng")
}

function verifyToken(param) {
    return jwt.verify(param, "bagasganteng")
}

module.exports = {generateToken, verifyToken}

