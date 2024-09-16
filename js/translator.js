// Function to handle translation
function translateText() {
    const inputText = document.getElementById('input-text').value;
    const targetLanguage = document.getElementById('language-select').value;
    const translationResult = document.getElementById('translation-result');

    // Check if input text is not empty
    if (!inputText.trim()) {
        translationResult.innerHTML = `<p>Please enter text to translate.</p>`;
        return;
    }

    // Static translation results (for demonstration purposes)
    const translations = {
        "Hello, how are you?": {
            "es": "Hola, ¿cómo estás?",
            "fr": "Bonjour, comment ça va?",
            "en": "Hello, how are you?" // Default to English
        }
        // Add more static translations as needed
    };

    // Get translation
    const translatedText = translations[inputText] ? translations[inputText][targetLanguage] : "Translation not available";

    // Display the result
    translationResult.innerHTML = `<strong>Translation:</strong> <p>${translatedText}</p>`;
}
