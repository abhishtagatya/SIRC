// <div id="chat-message"><span>Test</span></div>

let socket = io.connect('http://' + document.domain + ':' + location.port);

socket.on('connect', function() {
    socket.emit('client_connected');
});

socket.on('echo', function(message) {
    create_message(message['name'], message['content']);
});

function send_message(name, content)
{
    socket.emit('message', {name: sessionStorage.getItem('name'), content: content});
    document.getElementById('input-send').value = '';
}

function create_message(name, content)
{
    console.log(name);
    let parent = document.getElementById('chat-history');
    parent.insertAdjacentHTML('beforeend', `<div id="chat-message"><span>${name}: ${content}</span></div>`)
    parent.scrollTo(0, parent.scrollHeight);
}

if (sessionStorage.getItem('name') == null)
{
    window.location = 'login';
}
