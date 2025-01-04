from urllib.parse import quote as url_quote
from flask import Flask, request, jsonify
from flask_cors import CORS

# Enable CORS for all domains
CORS(app)
import os

app = Flask(__name__)

@app.route('/shorten', methods=['POST'])
def shorten_url():
    data = request.get_json()
    original_url = data.get('url')
    if not original_url:
        return jsonify({"error": "No URL provided"}), 400
    
    # Generate a shortened URL
    shortened_url = f"https://short.ly/{hash(original_url) % 10000}"
    return jsonify({"original_url": original_url, "shortened_url": shortened_url})

if __name__ == '__main__':
    # Use dynamic port or fallback to 5000
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
