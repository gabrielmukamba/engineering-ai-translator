import os
from flask import Flask, render_template, request, jsonify
from google import genai

app = Flask(__name__)

# Paste your Google Gemini API Key here
GEMINI_API_KEY = GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

# Initialize the client
client = genai.Client(api_key=GEMINI_API_KEY)

def query_gemini_ai(text, language):
    # Crafting a precise engineering prompt for the AI
    prompt = f"""
    You are an expert engineering translator fluent in English, French, and Swahili.
    Translate the following technical civil/automotive engineering text into {language}.
    Provide ONLY the direct translation. Do not add introductory remarks or conversational filler.
    
    Text to translate: "{text}"
    """
    
    try:
        # Using the standard lightweight, fast model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return response.text.strip()
    except Exception as e:
        return f"Gemini AI Error: {str(e)}"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    
    if not data or 'text' not in data or 'language' not in data:
        return jsonify({"error": "Missing data parameters"}), 400
        
    user_text = data['text']
    target_lang = data['language']
    
    ai_result = query_gemini_ai(user_text, target_lang)
    
    return jsonify({"translation": ai_result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)