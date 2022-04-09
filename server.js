import cors from 'cors';
import express from 'express';
import * as fs from 'fs';
const app = express();
const router = express.Router()
app.use(cors());
app.use(express.json());

import sillameHandler from './routeHandler/sillameHandler.js' ;
import piritaHandler from './piritaHandler.js';
const PORT = process.env.PORT || 5000;



app.get('/', (req, res) => {
    res.status(200).send({
        status: "OK",
        message: `🚀 Server is Running!`,
    });
});


// Application routes
app.use('/pirita', piritaHandler);
app.use('/sillamae', sillameHandler);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});
