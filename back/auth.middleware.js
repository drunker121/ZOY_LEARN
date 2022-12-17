const jwt = require('jsonwebtoken')
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET

const auth = async (req, res,next) => {
    let authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(401).json({ msg: 'Invalid authorization'})
    }
    const token = authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({ msg: 'Invalid authorization'})
    }

    try {
        const payload = jwt.verify(token,JWT_ACCESS_SECRET)
        req.user = payload
        next()
    } catch (error) {
        return res.status(401).json({ msg: 'Invalid authorization'})
    }
}

module.exports = auth