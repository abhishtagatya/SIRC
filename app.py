
from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print(request.form['name'])
        return redirect(url_for('index'))
    else:
        return render_template('login.html')

@socketio.on('client_connected')
def handle_connect():
    print('Connected!')

@socketio.on('message')
def handle_message(message):
    emit('echo', message, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")
