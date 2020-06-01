const express = require('express');
const { fileMulter } = require('../multer');

module.exports = function(sequelize) {
    const Board = sequelize.models.board;
    const Card = sequelize.models.card;
    const File = sequelize.models.file;

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

    cardRouter.get('/new',
        async (req, res) => {
            let boardId = req.query.board;
            if (!boardId) {
                res.redirect('/');
                return;
            }

            res.render('index', { root: 'card/new-card-form', content: { board: boardId } });
        }
    );

    cardRouter.post('/new',
        fileMulter.array('attachments'),
        async (req, res) => {
            let boardId = req.query.board;
            if (!boardId) {
                res.redirect('/');
                return;
            }

            req.body.boardId = boardId;
            let newCard = await Card.create(req.body);
            if (req.files.length) {
                
                req.files.map(file => {
                    file.id = file.filename;
                    return file;
                }).forEach(async file => {
                    let savedFile = await File.create(file);
                    await newCard.addAttachment(savedFile);
                });
            }
            res.redirect('/');
        }
    );

    cardRouter.get('/edit', async (req, res) => {
        if (!req.query.card) {
            res.redirect('/');
            return;
        }

        let card = await Card.findByPk(req.query.card, {
            include: [
                Board,
                { model: File, as: 'attachments', through: { attributes: [] } }
            ]
        });
        console.log(JSON.stringify(card, null, 2));
        res.render('index', { root: 'card/edit-card-form', content: { card } })
    });

    cardRouter.post('/edit',
        fileMulter.array('attachments'),
        async (req, res) => {
            if (!req.query.card) {
                res.redirect('/');
                return;
            }

            let card = await Card.findByPk(req.query.card);

            await card.update(req.body);

            if (req.files.length) {
                
                req.files.map(file => {
                    file.id = file.filename;
                    return file;
                }).forEach(async file => {
                    let savedFile = await File.create(file);
                    await card.addAttachment(savedFile);
                });
            }
            res.redirect('/');
        }
    );

    cardRouter.get('/attach/delete', async (req, res) => {
        if (!req.query.card || !req.query.attach) {
            res.redirect('/');
            return;
        }

        let card = await Card.findByPk(req.query.card, {
            include: [
                Board,
                { model: File, as: 'attachments', through: { attributes: [] } }
            ]
        });

        let files = await card.getAttachments({
            where: {
                id: req.query.attach
            }
        });

        await card.removeAttachments(files);

        res.redirect('../edit?card=' + req.query.card);
    });

    return cardRouter;
    
}