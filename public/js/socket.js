// TODO : /chat
document.addEventListener('DOMContentLoaded', function() {
    var socket = io.connect('http://localhost:3000/messages');

    document.querySelector('#new-message').addEventListener('submit', function(e) {
        e.preventDefault();
        var message = document.querySelector('#message').value;
        if (message !== "") {
            socket.emit('/new', {
                message: message
            });
            showMessage(false,message, true);
            document.querySelector('#message').value = "";
        }
    });

    socket.on('/message', function(data) {
        showMessage(true, data.message);
    });

    function showMessage(receive,message, me) {
        me = me || '';
        if( receive ){
            document.querySelector('#msg-receive').innerHTML += '<div class="msg '+ me +'">'+ message +'</div>';
        }else{
            document.querySelector('#msg-send').innerHTML += '<div class="msg '+ me +'">'+ message +'</div>';
        }

    }
});