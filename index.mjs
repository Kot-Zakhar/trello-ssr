import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';

import sequelizeConstructor from './src/sequelize';
import appRouter from './src/router'

let sequelize = null;

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/' + process.env.MULTER_SAVE_DESTINATION, express.static(process.env.MULTER_SAVE_DESTINATION));
app.set('view engine', 'ejs');

(async() => {
    sequelize = await sequelizeConstructor(process.env.DB_CONNECTION_STRING);
    app.use('/', appRouter(sequelize));
})()

let port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is listening on port " + port));