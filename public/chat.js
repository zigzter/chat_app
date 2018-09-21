$(function(){
    let socket = io.connect('http://localhost:3000');

    let message = $('#message');
    let username = $('#username');
    let send_message = $('#send_message');
    let send_username = $('#send_username');
    let chatroom = $('#chatroom');
    let feedback = $('#feedback p i');

    $('html, body').animate({ scrollTop: $('.message').last().offset().top }, 300);

    $(document).keypress(function(event){
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            send_message.click();   
        }
    });

    send_message.click(() => {
        socket.emit('new_message', { message: message.val() });
        socket.emit('clear_typing');
        message.val('');
    });
    
    socket.on('new_message', data => {
        const time = new Date(data.time)
        chatroom.append(`<hr class="my-1"><p class='message mb-0'><small>${time.toLocaleTimeString('en-US')}</small><br><strong>${data.username}</strong>: ${data.message}</p>`);
        $('html, body').animate({ scrollTop: $('.message').last().offset().top }, 400);
    });

    send_username.click(() => {
        socket.emit('change_username', { username: username.val() })
    });

    message.bind('input', () => {
        if(message.val()){
            socket.emit('typing');
        } else {
            socket.emit('clear_typing');
        }
    });

    socket.on('typing', data => {
        feedback.text(`${data.username} is typing a message...`)
    });

    socket.on('clear_typing', data => {
        feedback.text("");
    });
});