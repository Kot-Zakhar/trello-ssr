import Sequelize from 'sequelize';
import { CardAttributes, BoardAttributes, FileAttributes } from './sequelizeModelsAttributes.mjs';

module.exports = async function(connectionString) {
    const sequelize = new Sequelize.Sequelize(connectionString);

    const Card = sequelize.define('card', CardAttributes);
    const Board = sequelize.define('board', BoardAttributes);
    const File = sequelize.define('file', FileAttributes);
   
    Board.hasMany(Card, {
        onDelete: 'CASCADE'
    });
    Card.belongsTo(Board);

    Board.belongsTo(File, {
        as: 'backgroundImage'
    });

    Card.belongsToMany(File, {
        as: 'attachments',
        through: 'card_files'
    });


    await sequelize.authenticate()

    console.log("Connection has been established.");
            
    await sequelize.sync({force: false, alter: true});

    return sequelize
}