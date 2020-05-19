const { Model, DataTypes } = require('sequelize');

class Task extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            completed: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
    }
}

module.exports = Task;