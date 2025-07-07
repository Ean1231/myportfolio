# Contact Form Email Setup Instructions

## Overview
Your portfolio now includes a fully functional contact form that sends emails using EmailJS - a service that lets you send emails directly from your website without needing a backend server.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create an Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID** (you'll need this)

### 3. Create an Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{user_name}}
Email: {{user_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

### 4. Get Your Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section

### 5. Update Your Website Code
Open `script.js` and replace these placeholders:

```javascript
// Replace this line:
emailjs.init("YOUR_PUBLIC_KEY");
// With:
emailjs.init("your_actual_public_key");

// Replace this line:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
// With:
emailjs.send('your_service_id', 'your_template_id', templateParams)
```

### 6. Test Your Form
1. Fill out the contact form on your website
2. Submit it
3. Check your email to see if you received the message
4. Check the browser console for any error messages

## Free Plan Limits
- 200 emails per month
- EmailJS branding in emails
- Basic features

## Pro Plan Benefits
- Up to 50,000 emails per month
- No EmailJS branding
- Advanced features
- Priority support

## Troubleshooting

### Common Issues:
1. **403 Forbidden Error**: Check that your domain is added to the allowed origins in EmailJS settings
2. **Template Not Found**: Verify your template ID is correct
3. **Service Not Found**: Verify your service ID is correct
4. **Public Key Error**: Make sure you've initialized EmailJS with the correct public key

### Testing:
- Use browser developer tools to check for JavaScript errors
- Test the form on different devices and browsers
- Make sure all form fields are filled out (they're required)

## Security Notes
- Your EmailJS public key is safe to use in frontend code
- Never expose your private key in client-side code
- EmailJS handles all email authentication securely

## Support
If you need help:
1. Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Contact EmailJS support
3. Check browser console for error messages

Your contact form is now ready to receive messages from potential clients and collaborators! 