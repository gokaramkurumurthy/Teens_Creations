# Teens Creations - Professional Entertainment Website

A modern, responsive website for Teens Creations entertainment production company with interactive features and a working contact form.

## 🚀 Features

- **Interactive Navigation**: Smooth scrolling navigation with working buttons
- **Dynamic Hero Section**: Auto-rotating slides with interactive CTAs
- **Professional Contact Form**: Full backend integration with email notifications
- **Social Media Integration**: Working social media links
- **Responsive Design**: Optimized for all devices
- **Professional Icons**: SVG icons throughout the website
- **Scroll Animations**: Smooth fade-in effects while scrolling

## 📧 Contact Form Setup

The website includes a fully functional contact form with backend integration. Follow these steps to set it up:

### 1. Email Configuration (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and generate a password
   - Copy the 16-character password

### 2. Environment Variables Setup

1. **Create `.env` file** in the root directory:
```bash
cp .env.example .env
```

2. **Fill in your details** in `.env`:
```env
# Email Configuration (Required)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
COMPANY_EMAIL=info@teenscreations.com

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Replace Placeholder Information

Update these details in the code:

**In `src/App.jsx`:**
- Line ~280: Replace email `info@teenscreations.com`
- Line ~290: Replace phone `+91 98765 43210`
- Line ~300: Replace address `Mumbai, Maharashtra, India`
- Lines ~310-330: Update social media URLs with your actual profiles

**In `server.js`:**
- Update company information in email templates
- Modify email addresses and contact details

### 4. Social Media Links

Update the social media URLs in the contact section:
```jsx
// Replace these URLs with your actual social media profiles
<a href="https://facebook.com/teenscreations" target="_blank">
<a href="https://instagram.com/teenscreations" target="_blank">
<a href="https://twitter.com/teenscreations" target="_blank">
<a href="https://youtube.com/teenscreations" target="_blank">
<a href="https://linkedin.com/company/teenscreations" target="_blank">
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Gmail account (for contact form)

### Local Development

1. **Clone and install dependencies**:
```bash
git clone <your-repo>
cd teens-creations
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your email credentials
```

3. **Run the development server**:
```bash
# Run both frontend and backend
npm run dev:full

# Or run separately:
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
npm run server
```

4. **Access the website**:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

### Production Deployment

1. **Build the project**:
```bash
npm run build
```

2. **Set production environment variables**:
```env
NODE_ENV=production
FRONTEND_URL=https://your-domain.com
```

3. **Deploy to your hosting platform** (Vercel, Netlify, Heroku, etc.)

## 📝 Contact Form Features

- **Form Validation**: Client-side and server-side validation
- **Rate Limiting**: Prevents spam (5 submissions per 15 minutes per IP)
- **Email Notifications**: 
  - Company receives detailed submission
  - User receives auto-reply confirmation
- **Professional Templates**: HTML email templates with branding
- **Security**: Helmet.js, CORS, input sanitization
- **Error Handling**: Comprehensive error handling and user feedback

## 🎨 Interactive Features

- **Navigation**: Smooth scroll to sections
- **Hero CTAs**: 
  - "Explore Films" → Portfolio section
  - "View Series" → Services section
  - "Our Events" → About section
  - "Meet Talent" → Contact section
- **Watch Reel**: Opens YouTube video (update URL in code)
- **Social Media**: Direct links to social profiles
- **Contact Form**: Full backend integration

## 🔧 Customization

### Update Company Information
1. **Logo & Branding**: Update in `src/App.jsx`
2. **Contact Details**: Update email, phone, address
3. **Social Media**: Replace URLs with your profiles
4. **Content**: Modify hero slides, services, portfolio items
5. **Colors**: Adjust CSS variables in `src/App.css`

### Email Templates
Customize email templates in `server.js`:
- Company notification email
- User auto-reply email
- Styling and branding

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🚀 Performance

- **Optimized Images**: Pexels CDN integration
- **Smooth Animations**: Hardware-accelerated CSS transitions
- **Lazy Loading**: Intersection Observer for scroll animations
- **Minified Assets**: Production build optimization

## 📞 Support

For technical support or customization requests:
- Email: info@teenscreations.com
- Phone: +91 98765 43210

## 📄 License

This project is proprietary to Teens Creations. All rights reserved.