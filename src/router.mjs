import express from 'express';

import cardRouter from './routers/cardRouter'
import boardRouter from './routers/boardRouter'
import testDataGenerator from './testData'

export default function (sequelize) {
    const Board = sequelize.models.board;
    const Card = sequelize.models.card;

    return express.Router()
        .get('/', async (req, res) => {
            let boards = await Board.findAll({
                include: Card,
                order: [ ['title'] ]
            });
            res.render('index', { root: 'board-list', content: { boards } });
        })
        .get('/generate', async (req, res) => {
            await testDataGenerator(sequelize);    
            res.redirect('/');
        })
        .use('/board', boardRouter(sequelize))
        .use('/card', cardRouter(sequelize))
}