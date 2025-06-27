# WNL FLOORING - Quote Generator

A professional web application for generating PDF quotes for tile and bathroom remodeling jobs. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Secure Admin Login** - Simple authentication system
- **Professional PDF Generation** - High-quality quotes with company branding
- **Mobile Responsive** - Works perfectly on iPhone and desktop
- **No Database Required** - Quotes are generated and downloaded locally
- **Easy Customization** - Company info and branding easily configurable
- **US Market Ready** - English content, no tax calculations

## 📱 Usage

### Login Credentials
- **Username:** `wnl`
- **Password:** `wnl2025`

*Change these in `src/app/config/company.ts` for security*

### Creating a Quote
1. Login with admin credentials
2. Fill in customer information
3. Add project description
4. Add items with quantities and prices
5. Click "Generate PDF Quote" to download

## 🛠️ Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## ⚙️ Customization

### Company Information
Edit `src/app/config/company.ts` to update:
- Company name and contact info
- Login credentials
- Theme colors
- Quote validity period

### Logo
1. Add your logo to `/public/assets/`
2. Update the logo reference in components
3. Recommended size: 200x100px

### Colors & Styling
- Modify theme colors in `src/app/config/company.ts`
- Update Tailwind classes throughout components
- Customize PDF styling in the `generatePDF` function

## 📄 PDF Quote Features

- Company header with logo and contact info
- Quote number and date
- Customer information section
- Project description
- Itemized pricing table
- Professional footer

## 🔧 Technical Details

- **Framework:** Next.js 15.3.4
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **PDF Generation:** jsPDF
- **Forms:** react-hook-form
- **Icons:** Lucide React

## 📱 Mobile Support

Fully responsive design optimized for:
- iPhone (iOS Safari)
- Android browsers
- Desktop browsers
- Tablet devices

## 🚀 Deployment

### Build for production:
```bash
npm run build
npm start
```

### Deploy to hosting platforms:
- Vercel (recommended)
- Netlify
- Any Node.js hosting service

## 📋 To-Do for Customization

1. **Replace placeholder logo** in `/public/assets/`
2. **Update company information** in config file
3. **Change login credentials** for security
4. **Test on target devices** (iPhone, laptop)
5. **Customize colors** to match brand

## 🆘 Support

For customization or technical support, refer to the component files:
- `LoginForm.tsx` - Authentication
- `QuoteGenerator.tsx` - Main application
- `company.ts` - Configuration

---

**Developed for WNL FLOORING** 🏠✨
