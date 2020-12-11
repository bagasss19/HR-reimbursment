function err(err,req,res,next) {
    let errors = []
    let errCode = 500

    switch (err.name) {
        case 'JsonWebTokenError':
            errors.push('Unauthorization account!')
            errCode = 401
            break
        case 'SequelizeValidationError':
            err.errors.forEach(x => {
                errors.push(x.message)
            });
            errCode = 400
            break;
        default:
            errors.push(err.msg || 'internal server error')
            errCode= err.code ||500
            break;
    }

    res.status(errCode).json({err : errors})
}

module.exports = err