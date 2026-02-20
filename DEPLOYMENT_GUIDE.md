# Real Estate Website - Deployment Guide

## Local Testing

### 1. Start Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Test All Pages

**Public Pages:**
- Home: http://localhost:3000
- Properties: http://localhost:3000/properties
- Property Details: http://localhost:3000/properties/[property-id]
- Contact: http://localhost:3000/contact

**Admin Pages:**
- Login: http://localhost:3000/admin/login
- Dashboard: http://localhost:3000/admin
- Properties Management: http://localhost:3000/admin/properties
- Inquiries: http://localhost:3000/admin/inquiries
- Settings: http://localhost:3000/admin/settings

### 3. Test Admin Features

1. Create a user in Supabase Authentication
2. Login with those credentials
3. Add a property with images
4. Test property editing and deletion
5. Test marking properties as sold
6. Submit a contact form and verify inquiry appears in admin

### 4. Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit: Real estate website"
git push origin main
```

### Step 2: Deploy

1. Go to [https://vercel.com](https://vercel.com)
2. Click **Import Project**
3. Select your GitHub repository
4. Click **Import**

### Step 3: Configure Environment Variables

In Vercel, go to **Settings > Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_SECRET=generate-a-strong-random-key
NEXTAUTH_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXT_PUBLIC_WHATSAPP_NUMBER=your_whatsapp_number
NEXT_PUBLIC_PHONE_NUMBER=your_phone_number
NEXT_PUBLIC_EMAIL=your_email
```

Click **Deploy**.

## Alternative Deployments

### Deploy to Netlify

1. Push code to GitHub
2. Go to [https://netlify.com](https://netlify.com)
3. Click **New site from Git**
4. Select your repository
5. Set build command: `npm run build`
6. Set publish directory: `.next`
7. Add environment variables in **Site settings > Build & deploy**
8. Deploy

### Deploy to Self-Hosted Server

1. Build the project:
```bash
npm run build
```

2. Transfer the built project to your server:
```bash
scp -r .next node_modules package.json your_server:/app/
```

3. On the server, install PM2:
```bash
npm install -g pm2
```

4. Start the app:
```bash
pm2 start npm --name "real-estate" -- start
pm2 save
```

5. Setup Nginx as reverse proxy:
```nginx
server {
  listen 80;
  server_name yourdomain.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

6. Restart Nginx:
```bash
sudo systemctl restart nginx
```

## Setup Custom Domain

### For Vercel:
1. In Vercel project settings, go to **Domains**
2. Add your custom domain
3. Update DNS records to point to Vercel's nameservers

### For Netlify:
1. In Netlify site settings, go to **Domain management**
2. Add your domain
3. Update DNS records

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test responsive design on mobile
- [ ] Verify admin login works
- [ ] Test adding/editing properties
- [ ] Test image uploads
- [ ] Verify contact form submissions
- [ ] Check Google PageSpeed Insights
- [ ] Enable SSL/HTTPS
- [ ] Setup email notifications for inquiries
- [ ] Configure domain email
- [ ] Setup Google Search Console
- [ ] Setup Google Analytics
- [ ] Monitor error logs

## Email Notifications (Optional)

To send email notifications when inquiries are received:

1. Use a service like SendGrid or Mailgun
2. Create an API route that sends emails when inquiries are submitted
3. Test email delivery

Example with SendGrid:

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const msg = {
  to: process.env.NEXT_PUBLIC_EMAIL,
  from: 'noreply@realestate.com',
  subject: `New Inquiry from ${inquiry.name}`,
  text: `${inquiry.message}\n\nPhone: ${inquiry.phone}\nEmail: ${inquiry.email}`,
};

await sgMail.send(msg);
```

## Monitoring

### Setup Error Tracking
- Use Sentry for error tracking
- Setup alerts for failed deployments
- Monitor performance metrics

### Analytics
- Enable Google Analytics
- Monitor traffic sources
- Track conversion rates

## Maintenance

### Regular Updates
```bash
npm update
```

### Backup Database
Set up automated backups in Supabase:
- Settings > Backups
- Enable automated daily backups

### Monitor Logs
In Vercel or Netlify, check logs for errors and performance issues.

## Support Resources

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs


Key Security Recommendations
For full security, configure these in your Supabase dashboard:

Row Level Security (RLS) policies:

Only authenticated users with "admin" role can insert/update/delete properties
All users can read non-sold properties
JWT Custom Claims:

Set admin role in user's app_metadata for proper authorization checks
Deploy your changes to make the security fixes live