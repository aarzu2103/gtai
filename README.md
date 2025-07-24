# AI Web Solutions - Professional Digital Services Website

A modern, responsive website showcasing AI-powered web development services with integrated chatbot functionality.

## 🚀 Features

- **AI-Powered Chatbot**: Integrated Google AI chatbot for customer support
- **Responsive Design**: Mobile-first approach with professional aesthetics
- **Animated UI**: Smooth animations and micro-interactions
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **WhatsApp Integration**: Direct contact and inquiry forms
- **SEO Optimized**: Complete meta tags and structured data
- **10 Service Offerings**: Detailed product showcase with pricing

## 📋 Services Offered

1. **AI Website Builder** (₹4,999) - AI-powered website creation
2. **Custom Website Development** (₹12,999) - Fully customized solutions
3. **E-commerce Website** (₹18,999) - Complete online stores
4. **Android App Development** (₹15,999) - Native mobile applications
5. **Single Page Website** (₹2,999) - Perfect for small businesses
6. **WhatsApp Bulk Send Tool** (₹6,999) - Marketing automation
7. **Google Extractor Tool** (₹8,999) - Data extraction solutions
8. **Passive Income Website** (₹11,999) - Monetization-ready sites
9. **Professional Portfolio** (₹5,999) - Stunning portfolio websites
10. **Ready-Made Templates** (₹3,999) - Pre-designed solutions

All services include:
- Free .in domain + hosting (1 year)
- Free Android app
- 1 year free editing
- SEO optimization

## 🛠️ Installation & Hosting on Hostinger

### Prerequisites
- Hostinger hosting account
- FTP access or File Manager access

### Step 1: Download Files
1. Download all project files from this repository
2. Ensure you have all the following files and folders:
   ```
   /css/
   /js/
   /assets/
   index.html
   README.md
   ```

### Step 2: Upload to Hostinger

#### Method 1: Using File Manager (Recommended for beginners)
1. Login to your Hostinger control panel (hPanel)
2. Go to "File Manager"
3. Navigate to "public_html" folder
4. Upload all project files to this folder
5. Extract if files are zipped

#### Method 2: Using FTP
1. Use an FTP client like FileZilla
2. Connect using your Hostinger FTP credentials:
   - Host: your-domain.com or IP address
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
3. Upload all files to the root directory (usually public_html)

### Step 3: Configuration
1. The website is ready to use immediately after upload
2. No database setup required (static website)
3. All external dependencies are loaded via CDN

### Step 4: Domain Setup
1. Point your domain to Hostinger's nameservers
2. Wait for DNS propagation (up to 24-48 hours)
3. Access your website via your domain

## 🤖 AI Chatbot Configuration

The chatbot is already configured with your Google AI API key:
- **API Key**: AIzaSyBPrdPNA04A099TFHYr0TuC0WOcGeOH_KQ
- **Model**: Gemini Pro
- **Features**: Context-aware responses, WhatsApp integration, chat history

### Customizing Chatbot Responses
Edit the `buildContext()` function in `js/chatbot.js` to modify:
- Service descriptions
- Pricing information
- Contact details
- Company information

## 📱 WhatsApp Integration

The website includes multiple WhatsApp touchpoints:
- **Header Contact Button**: Direct WhatsApp link
- **Floating WhatsApp Button**: Persistent contact option
- **Contact Form**: Redirects to WhatsApp with form data
- **Chatbot Integration**: Seamless transition to WhatsApp

### WhatsApp Number Configuration
Current number: **+91 8734567890**

To change the WhatsApp number:
1. Edit `js/main.js` - search for `+918734567890`
2. Edit `js/chatbot.js` - search for `+918734567890`
3. Edit `index.html` - search for WhatsApp links
4. Update all instances with your number

## 🎨 Customization

### Colors & Branding
- Edit CSS custom properties in `css/style.css`
- Update logo files in `assets/` folder
- Modify company name and tagline in `index.html`

### Content
- Service descriptions in `index.html`
- Pricing in service cards
- Contact information throughout the site
- Meta tags for SEO

### Images
Replace stock images with your own:
- Service banner images (currently using Pexels URLs)
- Use case images
- Logo and favicon

## 🔧 Technical Details

### File Structure
```
├── css/
│   ├── style.css          # Main styles
│   ├── animations.css     # Animation styles
│   └── responsive.css     # Mobile responsiveness
├── js/
│   ├── main.js           # Core functionality
│   ├── chatbot.js        # AI chatbot integration
│   └── animations.js     # Advanced animations
├── assets/
│   ├── logo.svg          # Company logo
│   └── favicon.svg       # Website icon
└── index.html            # Main HTML file
```

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features
- Optimized images (external CDN)
- Minified CSS/JS ready
- Lazy loading support
- Efficient animations
- Mobile-first approach

## 📈 SEO Features

- Complete meta tags
- Structured data markup
- Fast loading times
- Mobile-friendly design
- Semantic HTML structure
- Alt tags for images
- Proper heading hierarchy

## 🛡️ Security Features

- No server-side code (reduced attack surface)
- External API calls through HTTPS
- Input sanitization in forms
- CSP-friendly code structure

## 📞 Support & Contact

For technical support or customization:
- **WhatsApp**: +91 8734567890
- **Email**: info@aiwebsolutions.com
- **Response Time**: Within 2 hours
- **Availability**: 24/7

## 📝 License

This project is created for AI Web Solutions. All rights reserved.

## 🔄 Updates

Version 1.0 - Initial release
- Complete responsive website
- AI chatbot integration
- WhatsApp connectivity
- 10 service offerings
- Dark/light theme toggle

---

**Note**: This is a production-ready website optimized for Hostinger hosting. All external dependencies are loaded via CDN, making it easy to host and maintain.