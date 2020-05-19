const authMiddleware = require('../middlewares/auth')
const User = require('../models/User');
const Project = require('../models/Project');

module.exports = {
    async index(req, res) {
        const user_id = req.userId;

        const user = await User.findByPk(user_id, {
            include: { association: 'projects' }
        });

        user.password = undefined;

        return res.json(user);
    },

    async indexAll(req, res) {

        
        const project = await Project.findAll(
            {
                include: { association: 'user' },
            });

        return res.json(project);

    },

    async store(req, res) {
        
        const user_id = req.userId;
        const { title, description } = req.body;
        
        try {

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
    
        const project = await Project.create({
            title,
            description,
            user_id,
        });

        return res.json(project);
            
        } catch (error) {
            res.status(400).json({ error: 'Não foi possível criar um projeto!' })
        }
    }
}

