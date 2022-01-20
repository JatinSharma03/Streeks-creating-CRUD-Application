import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import connection from './connection/db.js';
import route from './route/routes.js';

const app = express();
const PORT = 3005;

app.use(bodyParser.json({ extended:true }));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors());

app.use('/streeks',route);

connection();

app.listen(PORT,()=>{
    console.log(`Port is running at port ----> ${PORT}`);
})