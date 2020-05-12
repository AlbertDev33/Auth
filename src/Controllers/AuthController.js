const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },

    async store(req, res) {
        const { email } = req.body;        
        try {
            const { name, email, password } = req.body;
            const hash = await bcrypt.hash(password, 12);

            const user = await User.create({ name, email, password: hash });

            user.password = undefined;

            return res.send({ 
                user,
                token: generateToken({ id: user.id }),
            });

        } catch (err) {
            if(await User.findOne({ email })) {
                return res.status(400).send({ error: 'Email already registered' });
            } else {
                
                return res.status(400).send({ error: 'Registration failed' });
            }
        }
    },

    async auth(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne(
            { where: { email } },
        );

        if(!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid password' });
        }

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        })

        return res.send({ 
            user, 
            token: generateToken({ id: user.id }),
        });
    }
}