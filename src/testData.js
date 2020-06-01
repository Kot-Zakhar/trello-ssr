const loremIpsum = require('lorem-ipsum');

const lorem = new loremIpsum.LoremIpsum({
    sentencesPerParagraph: {
        min: 4,
        max: 8
    },
    wordsPerSentence: {
        min: 5,
        max: 10
    }
});

module.exports = async function(sequelize) {
    const maxCardAmount = 5;
    const minCardAmount = 0;
    const boardAmount = 5;

    const Board = sequelize.models.board;
    const Card = sequelize.models.card;

    // let boards = await Board.findAll();
    // if (boards.length > 0)
    //     return;

    for (let i = 0; i < boardAmount; i ++) {
        let board = await Board.create({
            title: `Board #${i}`,
            description: lorem.generateParagraphs(1)
        });

        let cardsAmount = minCardAmount + Math.round( Math.random() * (maxCardAmount - minCardAmount));

        for (let j = 0; j < cardsAmount; j++) {
            let newCard = await Card.create({
                title: `#${j} ` + lorem.generateWords(3),
                description: lorem.generateSentences(1)
            });
            await board.addCard(newCard);
        }
    }
}