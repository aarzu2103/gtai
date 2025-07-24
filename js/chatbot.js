// AI Chatbot functionality using Google AI API

class AIWebSolutionsChatbot {
    constructor() {
        this.apiKey = '';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        this.chatHistory = [];
        this.isOpen = false;
        this.isTyping = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadChatHistory();
        this.addWelcomeMessage();
    }
    
    bindEvents() {
        const toggleBtn = document.getElementById('chatbotToggle');
        const closeBtn = document.getElementById('chatbotClose');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
            
            input.addEventListener('input', () => {
                this.handleTyping();
            });
        }
    }
    
    toggle() {
        const widget = document.getElementById('chatbotWidget');
        if (widget) {
            this.isOpen = !this.isOpen;
            widget.classList.toggle('active', this.isOpen);
            
            if (this.isOpen) {
                this.focusInput();
            }
        }
    }
    
    close() {
        const widget = document.getElementById('chatbotWidget');
        if (widget) {
            this.isOpen = false;
            widget.classList.remove('active');
        }
    }
    
    focusInput() {
        const input = document.getElementById('chatbotInput');
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }
    
    async sendMessage() {
        const input = document.getElementById('chatbotInput');
        if (!input || !input.value.trim()) return;
        
        const message = input.value.trim();
        input.value = '';
        
        // Add user message to chat
        this.addMessage(message, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.hideTypingIndicator();
            
            // Add bot response to chat
            this.addMessage(response, 'bot');
            
            // Check if user wants to contact via WhatsApp
            if (this.shouldRedirectToWhatsApp(message, response)) {
                this.addWhatsAppOption();
            }
            
        } catch (error) {
            console.error('Chatbot error:', error);
            this.hideTypingIndicator();
            this.addMessage("I apologize, but I'm having trouble responding right now. Please try contacting us directly via WhatsApp for immediate assistance.", 'bot');
            this.addWhatsAppOption();
        }
        
        this.saveChatHistory();
    }
    
    async getAIResponse(message) {
        const context = this.buildContext();
        const prompt = this.buildPrompt(message, context);
        
        const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text || "I'm sorry, I couldn't generate a response. Please contact us directly for assistance.";
    }
    
    buildContext() {
        return `You are an AI assistant for AI Web Solutions, a digital web development company. Our services include:

1. AI Website Builder (₹4,999) - Revolutionary AI-powered website creation
2. Custom Website Development (₹12,999) - Fully customized websites
3. E-commerce Website (₹18,999) - Complete online stores with payment integration
4. Android App Development (₹15,999) - Native Android applications
5. Single Page Website (₹2,999) - Perfect for small businesses and portfolios
6. WhatsApp Bulk Send Tool (₹6,999) - Marketing automation tool
7. Google Extractor Tool (₹8,999) - Web scraping tool for business data
8. Passive Income Website (₹11,999) - Monetization-ready websites
9. Professional Portfolio (₹5,999) - Stunning portfolio websites
10. Ready-Made Templates (₹3,999) - Pre-designed website templates

All services include:
- Free .in domain + hosting (1 year)
- Free Android app
- 1 year free editing
- SEO optimization

Company details:
- Phone/WhatsApp: +91 8734567890
- Response time: Within 2 hours
- 24/7 support available
- 30-day money back guarantee

Be helpful, professional, and encourage users to contact via WhatsApp for detailed discussions.`;
    }
    
    buildPrompt(userMessage, context) {
        return `${context}

User message: "${userMessage}"

Please provide a helpful, professional response about our web development services. Keep responses concise (under 150 words) and always be encouraging about contacting us for more details. If the user asks about pricing, mention our competitive rates and all inclusions. If they ask technical questions, provide helpful information while suggesting a detailed consultation.`;
    }
    
    shouldRedirectToWhatsApp(userMessage, botResponse) {
        const triggers = [
            'contact', 'price', 'cost', 'quote', 'consultation', 
            'call', 'talk', 'discuss', 'interested', 'buy',
            'purchase', 'order', 'start project', 'get started'
        ];
        
        const message = userMessage.toLowerCase();
        return triggers.some(trigger => message.includes(trigger));
    }
    
    addMessage(text, sender) {
        const chatBody = document.getElementById('chatbotBody');
        if (!chatBody) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;
        
        if (sender === 'bot') {
            messageDiv.innerHTML = `<p>${this.formatBotMessage(text)}</p>`;
        } else {
            messageDiv.innerHTML = `<p>${text}</p>`;
        }
        
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // Add message to history
        this.chatHistory.push({ text, sender, timestamp: Date.now() });
    }
    
    formatBotMessage(text) {
        // Format bot messages with basic HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/₹(\d+)/g, '<span style="color: #10b981; font-weight: 600;">₹$1</span>')
            .replace(/\n/g, '<br>');
    }
    
    addWhatsAppOption() {
        const chatBody = document.getElementById('chatbotBody');
        if (!chatBody) return;
        
        const whatsappDiv = document.createElement('div');
        whatsappDiv.className = 'chatbot-message bot-message whatsapp-option';
        whatsappDiv.innerHTML = `
            <p>Would you like to continue this conversation on WhatsApp for faster assistance?</p>
            <button class="whatsapp-redirect-btn" onclick="chatbot.redirectToWhatsApp()">
                <i class="fab fa-whatsapp"></i>
                Continue on WhatsApp
            </button>
        `;
        
        // Add styles for the WhatsApp option
        const style = document.createElement('style');
        style.textContent = `
            .whatsapp-option {
                background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
                color: white;
                margin-top: 8px;
            }
            
            .whatsapp-redirect-btn {
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: 1px solid rgba(255, 255, 255, 0.3);
                padding: 8px 16px;
                border-radius: 20px;
                margin-top: 8px;
                cursor: pointer;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
            }
            
            .whatsapp-redirect-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.05);
            }
        `;
        
        if (!document.querySelector('#whatsapp-option-styles')) {
            style.id = 'whatsapp-option-styles';
            document.head.appendChild(style);
        }
        
        chatBody.appendChild(whatsappDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    redirectToWhatsApp() {
        const chatSummary = this.generateChatSummary();
        const message = `Hi! I was chatting with your AI assistant and would like to continue our conversation.

${chatSummary}

Please provide more details about your services.`;
        
        const whatsappUrl = `https://wa.me/+918734567890?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        
        // Add confirmation message
        this.addMessage("Great! Opening WhatsApp for you. Our team will respond within 2 hours.", 'bot');
    }
    
    generateChatSummary() {
        const recentMessages = this.chatHistory
            .filter(msg => msg.sender === 'user')
            .slice(-3)
            .map(msg => `- ${msg.text}`)
            .join('\n');
        
        return recentMessages ? `*Questions I asked:*\n${recentMessages}` : '*I\'m interested in learning more about your web development services.*';
    }
    
    showTypingIndicator() {
        if (this.isTyping) return;
        
        const chatBody = document.getElementById('chatbotBody');
        if (!chatBody) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        // Add typing indicator styles
        const style = document.createElement('style');
        style.textContent = `
            .typing-indicator {
                opacity: 0.7;
            }
            
            .typing-dots {
                display: flex;
                gap: 4px;
                align-items: center;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #6366f1;
                animation: typing-bounce 1.4s infinite ease-in-out;
            }
            
            .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
            .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
            .typing-dots span:nth-child(3) { animation-delay: 0s; }
            
            @keyframes typing-bounce {
                0%, 80%, 100% {
                    transform: scale(0);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
        
        if (!document.querySelector('#typing-styles')) {
            style.id = 'typing-styles';
            document.head.appendChild(style);
        }
        
        chatBody.appendChild(typingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        this.isTyping = true;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }
    
    handleTyping() {
        // Add typing effects or validation here if needed
        const input = document.getElementById('chatbotInput');
        const sendBtn = document.getElementById('chatbotSend');
        
        if (input && sendBtn) {
            sendBtn.disabled = !input.value.trim();
        }
    }
    
    addWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hello! 👋 I'm your AI assistant from AI Web Solutions. I can help you learn about our web development services, pricing, and answer any questions you have about getting your website built by AI. How can I help you today?", 'bot');
        }, 1000);
    }
    
    loadChatHistory() {
        try {
            const saved = localStorage.getItem('aiwebsolutions_chat_history');
            if (saved) {
                this.chatHistory = JSON.parse(saved);
                // Restore recent messages (last 10)
                const recentMessages = this.chatHistory.slice(-10);
                recentMessages.forEach(msg => {
                    if (msg.sender && msg.text) {
                        this.addMessage(msg.text, msg.sender);
                    }
                });
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            this.chatHistory = [];
        }
    }
    
    saveChatHistory() {
        try {
            // Keep only last 50 messages to avoid storage issues
            const limitedHistory = this.chatHistory.slice(-50);
            localStorage.setItem('aiwebsolutions_chat_history', JSON.stringify(limitedHistory));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }
    
    clearChatHistory() {
        this.chatHistory = [];
        localStorage.removeItem('aiwebsolutions_chat_history');
        
        const chatBody = document.getElementById('chatbotBody');
        if (chatBody) {
            chatBody.innerHTML = '';
            this.addWelcomeMessage();
        }
    }
}

// Initialize chatbot when DOM is ready
let chatbot;

document.addEventListener('DOMContentLoaded', function() {
    chatbot = new AIWebSolutionsChatbot();
    
    // Make chatbot globally available
    window.chatbot = chatbot;
    
    // Add clear chat option (can be triggered by typing "clear" or "/clear")
    const originalSendMessage = chatbot.sendMessage.bind(chatbot);
    chatbot.sendMessage = function() {
        const input = document.getElementById('chatbotInput');
        if (input && (input.value.trim().toLowerCase() === 'clear' || input.value.trim().toLowerCase() === '/clear')) {
            input.value = '';
            this.clearChatHistory();
            this.addMessage("Chat history cleared! How can I help you today?", 'bot');
            return;
        }
        originalSendMessage();
    };
});

// Error handling for API failures
window.addEventListener('online', function() {
    if (chatbot) {
        chatbot.addMessage("Connection restored! I'm back online and ready to help.", 'bot');
    }
});

window.addEventListener('offline', function() {
    if (chatbot) {
        chatbot.addMessage("I seem to be offline right now. Please check your internet connection or contact us directly via WhatsApp.", 'bot');
        chatbot.addWhatsAppOption();
    }
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIWebSolutionsChatbot;
}
