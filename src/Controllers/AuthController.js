const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

            return res.send({ user });

        } catch (err) {
            if(await User.findOne({ email })) {
                return res.status(400).send({ error: 'Email already registered' });
            } else {
                
                return res.status(400).send({ error: 'Registration failed' });
            }
        }
    }
}