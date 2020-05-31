const Sequelize = require('sequelize');

module.exports.CardAttributes = {
    id : {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.DataTypes.STRING,
    },
    description: {
        type: Sequelize.DataTypes.TEXT
    }
};

module.exports.BoardAttributes = {
    id : {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.DataTypes.STRING,
    },
    description: {
        type: Sequelize.DataTypes.TEXT
    },
};

module.exports.FileAttributes = {
    id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    originalname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    mimetype: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    filename: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    }
};