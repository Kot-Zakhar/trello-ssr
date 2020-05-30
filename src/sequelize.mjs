import Sequelize from 'sequelize';
import { CardAttributes, BoardAttributes } from './sequelizeModelsAttributes.mjs';

export default async function(connectionString) {
    const sequelize = new Sequelize.Sequelize(connectionString);

    const Card = sequelize.define('card', CardAttributes);
    const Board = sequelize.define('board', BoardAttributes);
   
    Board.hasMany(Card, {
        onDelete: 'CASCADE'
    });
    Card.belongsTo(Board);

    await sequelize.authenticate()

    console.log("Connection has been established.");
            
    await sequelize.sync({force: false, alter: true});

    return sequelize
}