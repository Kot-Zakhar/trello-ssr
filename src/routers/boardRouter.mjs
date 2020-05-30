import express from 'express';

export default function (sequelize) {
    const Board = sequelize.models.board;

    const boardRouter = express.Router();
    
    boardRouter.get('/delete', async (req, res) => {
        let id = req.query.board;
        if (id) {
            let amount = await Board.destroy({ where: { id } });
            console.log(amount ? `Deleting card with ${id}.` : `Error, wrong card id: ${id}`);
        }
        res.redirect('/');
    });

    boardRouter.get('/new', async (req, res) => {
        res.render('index', { root: 'new-board-form', content: {} })
    })

    return boardRouter;
};