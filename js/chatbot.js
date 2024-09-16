const responses = {
    greeting: "Hello! I'm your Fruit.ai chatbot. Ask me about any fruit, and I'll provide details.",
    fruits: {
        apple: {
            description: "Apples are rich in antioxidants and dietary fiber. They are great for heart health.",
            image: "images/apple.png",
            facts: [
                "An apple a day keeps the doctor away.",
                "Apples contain over 4,000 different varieties.",
                "The apple tree is a member of the rose family.",
                "Apples are 25% air, which is why they float in water.",
                "The largest apple ever picked weighed 3 pounds."
            ]
        },
        banana: {
            description: "Bananas are high in potassium and vitamins. They provide a quick energy boost.",
            image: "images/banana.png",
            facts: [
                "Bananas are berries, but strawberries aren't.",
                "A banana contains about 105 calories.",
                "The banana plant is actually an herb.",
                "Bananas float in water due to their low density.",
                "There are about 1,000 different types of bananas in the world."
            ]
        },
        orange: {
            description: "Oranges are packed with vitamin C and antioxidants. They are great for boosting immunity.",
            image: "images/orange.png",
            facts: [
                "Oranges are a hybrid of pomelo and mandarin.",
                "They were first cultivated in China.",
                "There are more than 600 varieties of oranges.",
                "The world’s largest orange-producing country is Brazil.",
                "One orange provides over 100% of your daily vitamin C requirement."
            ]
        },
        strawberry: {
            description: "Strawberries are rich in vitamin C and antioxidants. They are great for skin health and immune support.",
            image: "images/strawberry.png",
            facts: [
                "Strawberries are the only fruit with seeds on the outside.",
                "There are about 200 seeds on an average strawberry.",
                "Strawberries belong to the rose family.",
                "The largest strawberry ever recorded weighed 8.82 ounces.",
                "Strawberries can help improve heart health."
            ]
        },
        grape: {
            description: "Grapes are high in vitamins and antioxidants. They are great for heart health and energy.",
            image: "images/grape.png",
            facts: [
                "Grapes come in various colors: red, green, black, and purple.",
                "The world’s largest grape producer is Italy.",
                "Grapes can be used to make wine, raisins, and grape juice.",
                "Grapes are high in antioxidants which help prevent cancer.",
                "There are over 8,000 different varieties of grapes."
            ]
        }
    },
    default: "I'm not sure about that. Try asking me about apples, bananas, oranges, strawberries, or grapes."
};

let isVoiceInput = false;  // Flag to determine if input was from voice recognition

// Function to handle sending messages
function sendMessage() {
    const input = document.getElementById('user-input').value.toLowerCase();
    const chatArea = document.querySelector('.chat-area');
    
    if (input) {
        // Add user message to chat
        const userMessage = document.createElement('div');
        userMessage.classList.add('chat-message', 'user-message');
        userMessage.textContent = input;
        chatArea.appendChild(userMessage);
        
        // Clear input field
        document.getElementById('user-input').value = '';
        
        // Determine bot response based on user input
        let botReply = responses.default;
        let richContent = '';

        if (input.includes('hello') || input.includes('hi')) {
            botReply = responses.greeting;
        } else if (input.includes('apple') || input.includes('banana') || input.includes('orange') || input.includes('strawberry') || input.includes('grape')) {
            const fruit = input.split(' ')[0];
            const fruitData = responses.fruits[fruit.toLowerCase()];
            if (fruitData) {
                botReply = fruitData.description;
                richContent = `
                    <div class="rich-response">
                        <img src="${fruitData.image}" alt="${fruit}">
                        <button class="button" onclick="showFruitDetails('${fruit}')">More Details</button>
                    </div>
                    <div class="fruit-facts">
                        ${fruitData.facts.map(fact => `<p>${fact}</p>`).join('')}
                    </div>
                `;
            }
        }

        // Simulate bot response after a delay
        setTimeout(() => {
            // Add bot message to chat
            const botMessage = document.createElement('div');
            botMessage.classList.add('chat-message', 'bot-message');
            botMessage.innerHTML = `${botReply} ${richContent}`;
            chatArea.appendChild(botMessage);
            
            // Scroll chat to the bottom
            chatArea.scrollTop = chatArea.scrollHeight;
        }, 1000);

        // Reset voice input flag
        isVoiceInput = false;
    }
}

// Function to handle showing fruit details
function showFruitDetails(fruitName) {
    const fruitDetails = document.getElementById('fruit-details');
    let details = `You selected: <strong>${fruitName}</strong>.`;

    switch(fruitName.toLowerCase()) {
        case 'apple':
            details += " Apples are rich in antioxidants and dietary fiber.";
            break;
        case 'banana':
            details += " Bananas are high in potassium and vitamins.";
            break;
        case 'orange':
            details += " Oranges are packed with vitamin C and antioxidants.";
            break;
        case 'strawberry':
            details += " Strawberries are rich in vitamin C and antioxidants.";
            break;
        case 'grape':
            details += " Grapes are high in vitamins and antioxidants.";
            break;
        default:
            details += " Details are not available.";
            break;
    }
    
    fruitDetails.innerHTML = details;
}

// Function to start voice recognition
function startVoiceRecognition() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        recognition.onstart = function() {
            console.log('Voice recognition started.');
        };
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('user-input').value = transcript;
            isVoiceInput = true;  // Flag indicating voice input
            sendMessage();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };
        
        recognition.onend = function() {
            console.log('Voice recognition ended.');
        };
        
        recognition.start();
    } else {
        console.error('Speech recognition not supported.');
    }
}
