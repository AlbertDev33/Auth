const authMiddleware = require('../middlewares/auth')

module.exports = {
    async index(req, res) {
        res.json({ ok: true, user: req.userId })
    }
}

