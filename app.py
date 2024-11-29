from flask import Flask, request, jsonify, session
from cryptography.fernet import Fernet
import json

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Encryption setup
key = Fernet.generate_key()
cipher_suite = Fernet(key)
DATABASE = 'passwords.json'

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    if data['username'] == 'admin' and data['password'] == 'password123':
        session['logged_in'] = True
        return jsonify({'success': True})
    return jsonify({'success': False, 'error': 'Invalid credentials'})

@app.route('/save', methods=['POST'])
def save_password():
    if not session.get('logged_in'):
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.json
    encrypted_password = cipher_suite.encrypt(data['password'].encode()).decode()
    password_entry = {'service': data['service'], 'username': data['username'], 'password': encrypted_password}

    try:
        with open(DATABASE, 'a') as db:
            json.dump(password_entry, db)
            db.write('\n')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
