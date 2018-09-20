const express = require('express');
const logger = require('morgan');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.send("ELLO GUVNA");
});

server = app.listen(3000);

const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('New user connected');
});