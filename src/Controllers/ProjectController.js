const authMiddleware = require('../middlewares/auth')
const User = require('../models/User');
const Project = require('../models/Project');

module.exports = {
    async store(req, res) {
        const { user_id } = req.params;
        const { title, description } = req.body;

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
    }
}

