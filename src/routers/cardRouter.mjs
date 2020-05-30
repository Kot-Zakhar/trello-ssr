import express from 'express';

export default function(sequelize) {
    const Card = sequelize.models.card;

    const cardRouter = express.Router();
    
    cardRouter.get('/delete', async (req, res) => {
        let id = req.query.card;
        if (id) {
            let amount = await Card.destroy({ where: { id } });
            console.log(amount ? `Deleting card with ${id}.` : `Error, wrong card id: ${id}`);
        }
        res.redirect('/');
    });
    
    cardRouter.get('/hello', async (req, res) => {
        res.send("Hello card router");
    });

    cardRouter.get('/new', async (req, res) => {
        let boardId = req.query.board;
        if (!boardId) {
            res.redirect('/');
            return;
        }

        res.render('index', { root: 'new-card-form', content: {} });
    });

    return cardRouter;
    
}