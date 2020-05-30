import Sequelize from 'sequelize';

export const CardAttributes = {
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
}

export const BoardAttributes = {
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
}

