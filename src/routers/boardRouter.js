const express = require('express');
const { imageMulter } = require('../multer');

module.exports = function (sequelize) {
    const Board = sequelize.models.board;
    const File = sequelize.models.file;

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
    });

    boardRouter.post('/new',
        imageMulter.single('backgroundImage'),
        async (req, res) => {
            let newBoard = await Board.create(req.body);
            if (req.file) {
                req.file.id = req.file.filename;
                await newBoard.createBackgroundImage(req.file);
            }
            res.redirect('/');
        }
    );

    boardRouter.get('/edit', async (req, res) => {
        if (!req.query.board){
            res.redirect("/");
            return;
        }

        let board = await Board.findByPk(req.query.board, {
            include : {
                model: File,
                as: 'backgroundImage'
            }
        });

        res.render('index', { root: 'board/edit-board-form', content: { board }});
    });

    boardRouter.post('/edit',
        imageMulter.single('backgroundImage'),
        async (req, res) => {
        if (!req.query.board) {
            res.redirect('/');
            return;
        }

        let board = await Board.findByPk(req.query.board, {
            include: {
                model: File,
                as: 'backgroundImage'
            }
        });

        if (req.file) {
            req.file.id = req.file.filename;
            await board.createBackgroundImage(req.file);
        }

        await board.update(req.body);
        res.redirect('/');
    })

    return boardRouter;
};