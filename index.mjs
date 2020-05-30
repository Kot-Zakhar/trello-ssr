import express from 'express';
import dotenv from 'dotenv';
import sequelizeConstructor from './src/sequelize';
import appRouter from './src/router'

dotenv.config();
let sequelize = null;

let app = express();

app.use('/public', express.static('public'));
app.set('view engine', 'ejs');

(async() => {
    sequelize = await sequelizeConstructor(process.env.DB_CONNECTION_STRING);
    app.use('/', appRouter(sequelize));
})()

let port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is listening on port " + port));