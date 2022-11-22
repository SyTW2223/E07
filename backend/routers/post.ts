import * as express from 'express';

export const postRouter = express.Router();

postRouter.post('/', (req, res) => {
    res.send('Hello World!');
});