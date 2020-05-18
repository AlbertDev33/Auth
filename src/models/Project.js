const { Model, DataTypes } = require('sequelize');

class Project extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}

module.exports = Project;