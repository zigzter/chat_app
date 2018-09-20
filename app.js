const express = require('express');
const logger = require('morgan');
const xssFilters = require('xss-filters');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index');
});

server = app.listen(3000);

const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('New user connected');
    socket.username = 'Anonymous';
    socket.on('change_username', data => {
        socket.username = xssFilters.inHTMLData(data.username);
    });
    socket.on('new_message', data => {
        let message = xssFilters.inHTMLData(data.message);
        io.sockets.emit('new_message', { message, username: socket.username })
    });
    socket.on('typing', data => {
        socket.broadcast.emit('typing', { username: socket.username })
    });

    socket.on('clear_typing', data => {
        socket.broadcast.emit('clear_typing');
    });
});