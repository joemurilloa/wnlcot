# WNL FLOORING - Customization Guide

## 🎨 Quick Customization Steps

### 1. Update Company Information
Edit `src/app/config/company.ts`:

```typescript
export const COMPANY_INFO = {
  name: 'YOUR COMPANY NAME',
  tagline: 'Your Company Tagline',
  email: 'your-email@company.com',
  phone: '(123) 456-7890',
  address: 'Your Company Address',
  // ... other settings
};
```

### 2. Change Login Credentials (IMPORTANT!)
In the same file, update:

```typescript
adminCredentials: {
  username: 'your-username',
  password: 'your-secure-password'
}
```

### 3. Add Your Logo
1. Save your logo as `wnl-logo.png` in `/public/assets/`
2. Update logo references in components if needed
3. Recommended size: 200x100px

### 4. Customize Colors
Update theme colors in the config file:

```typescript
theme: {
  primary: 'your-color-600',
  primaryHover: 'your-color-700',
  // ... other colors
}
```

### 5. Test the Application
1. Run `npm run dev`
2. Test login with your new credentials
3. Create a sample quote
4. Verify PDF generation works correctly

## 📱 Mobile Testing
Test on actual devices:
- iPhone Safari
- Android Chrome
- Desktop browsers

## 🚀 Ready to Deploy
Once customized:
1. Run `npm run build` to test production build
2. Deploy to your preferred hosting platform
3. Update DNS and SSL certificates as needed

## 📧 Contact Information in PDFs
The PDF will automatically include:
- Company name and tagline
- Email and phone from config
- Professional formatting
- Quote validity period

## 🔒 Security Notes
- Change default login credentials immediately
- Use strong passwords
- Consider adding additional security if needed
- Keep the application updated

---

**Your professional quote generator is ready!** 🎉
