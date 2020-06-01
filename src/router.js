const express = require('express');

const cardRouter = require('./routers/cardRouter')
const boardRouter = require('./routers/boardRouter')
const testDataGenerator = require('./testData')

module.exports = function (sequelize) {
    const Board = sequelize.models.board;
    const Card = sequelize.models.card;
    const File = sequelize.models.file;

    return express.Router()
        .get('/', async (req, res) => {
            let boards = await Board.findAll({
                include: [ 
                    {
                        model: Card,
                        include: {
                            model: File,
                            as: 'attachments',
                            through: { attributes: [] }
                        },
                        separate: true,
                        order: [ ['createdAt', 'DESC'] ]
                    },
                    {
                        model: File,
                        as: 'backgroundImage'
                    }
                ],
                order: [ ['title'] ]
            });
            // console.log(JSON.stringify(boards, null, 2));
            res.render('index', { root: 'board-list', content: { boards } });
        })
        .get('/generate', async (req, res) => {
            await testDataGenerator(sequelize);    
            res.redirect('/');
        })
        .use('/board', boardRouter(sequelize))
        .use('/card', cardRouter(sequelize))
}