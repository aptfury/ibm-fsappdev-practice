import express from 'express';

const app = new express();

app.use(express.static('static'));

app.listen(3333, () => {
    console.log(`Listening at http://localhost:3333`);
});