from flask import Flask, request, jsonify
from openai import OpenAI

app = Flask(__name__)
OPENAI_API_KEY = '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'
client = OpenAI(api_key=OPENAI_API_KEY)

@app.route('/send-message', methods=['POST'])
def send_message():
    user_input = request.json.get('message')
    bot_response = get_bot_response(user_input)
    return jsonify({'response': bot_response})

def get_bot_response(message):
    try:
        response = client.chat.completions.create(
            model="text-davinci-003",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print('ERROR:', e)
        return "Error occurred during AI response."

if __name__ == '__main__':
    app.run(debug=True)
