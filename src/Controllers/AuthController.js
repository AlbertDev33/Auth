const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

const authConfig = require('../config/auth.json')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = {
    async index(req, res) {

        const users = await User.findAll({
            attributes: ['id', 'name', 'email'],
        });

        return res.json(users);
    },

    async store(req, res) {
        const { email } = req.body;        
        try {
            const { name, email, password, passwordresettoken, passwordresetexpires } = req.body;
            const hash = await bcrypt.hash(password, 12);

            const user = await User.create({ name, email, password: hash, passwordresettoken, passwordresetexpires });

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
        const [, hash] = req.headers.authorization.split(' ');
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

        const user = await User.findOne(
            { where: { email } },
        );

        if(!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'User or Password Invalid' });
        }

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        })

        return res.send({ 
            id: user.id,
            name: user.name,
            email: user.email, 
            token: generateToken({ id: user.id }),
        });
    },

    async recovery(req, res) {
        const { email } = req.body;

        try {

            const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            const passwordresettoken = token;
            const passwordresetexpires = String(now);

            await User.update (
            {
                passwordresettoken,
                passwordresetexpires

            },
            {
                where: { id: user.id }
            });

            await mailer.sendMail({
                from: 'rocha@migrar.cloud',
                to: email,
                subject: 'Recovery Password',
                template: 'auth/recoveryPassword',
                context: { token },
            }, (err) => {
                if (err){
                    return res.status(400).send({ error: 'Não foi possível enviar o email de recuperação, por favor, tente novamente!' });
                }

                res.send('Email Enviado!')
            });

            return res.status(200).send({ ok: 'E-mail enviado com sucesso!' });
            
        } catch (error) {
            res.status(401).send({ error: 'Erro ao enviar o e-mail de recuperação de senha!' })
        }
    },

    async reset(req, res) {
        const { email, password, token } = req.body

        const user = await User.findOne({ where: { email } });

        const hash = await bcrypt.hash(password, 12);

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

            if (token !== user.passwordresettoken) {
                return res.status(400).send({ error: 'Token invalid' });
            }

            const now = new Date();

            if (now > user.passwordresetexpires) {
                return res.status(400).send({ error: 'Token expired' });
            }

            // user.password = password;

            await User.update(
                {
                    password: hash,
                },
                {
                    where: { id: user.id },
                }
            )

            
            
            res.send();
    }
}