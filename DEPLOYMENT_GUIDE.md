# GitHub Actions Deployment Setup Guide

## Current Status
You have GitHub Actions workflows configured but they need secrets to be set up.

## Option 1: Azure Static Web Apps (Current Setup)

### Step 1: Get Your Azure Deployment Token
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your Static Web App resource
3. Click on "Manage deployment token" in the left menu
4. Copy the deployment token

### Step 2: Add Secret to GitHub
1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/thedopecloudteacher-website`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN_VICTORIOUS_GRASS_0F362530F`
5. Value: Paste your deployment token from Azure
6. Click **Add secret**

### Step 3: Push to Trigger Deployment
```bash
git add .
git commit -m "Update deployment configuration"
git push origin main
```

---

## Option 2: Netlify (Simpler Alternative)

### Step 1: Create Netlify Account
1. Sign up at [Netlify](https://www.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository

### Step 2: Configure Build Settings
- **Base directory:** Leave empty
- **Build command:** Leave empty (static site)
- **Publish directory:** `dope-cloud-teacher`

### Step 3: Deploy
Netlify will automatically deploy on every push to main branch.

---

## Option 3: Vercel (Also Simple)

### Step 1: Create Vercel Account
1. Sign up at [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository

### Step 2: Configure
- **Framework Preset:** Other
- **Root Directory:** `dope-cloud-teacher`
- **Build Command:** Leave empty
- **Output Directory:** Leave empty

### Step 3: Deploy
Vercel will automatically deploy on every push.

---

## Option 4: GitHub Pages (Free)

GitHub Pages is perfect for static sites like yours!

### Automatic Setup:
1. I've created a workflow file for you
2. You just need to:
   - Go to GitHub repository → **Settings** → **Pages**
   - Under "Build and deployment" → Source: **GitHub Actions**
   - Push your code

The workflow will automatically deploy to: `https://YOUR_USERNAME.github.io/thedopecloudteacher-website`

---

## Backend Deployment (Node.js API)

Your backend needs to be deployed separately. Options:

### Option A: Azure App Service
- Best for enterprise/government clients
- Supports Node.js
- ~$10-50/month

### Option B: Heroku
- Easy setup
- Free tier available
- Good for demos

### Option C: Railway
- Modern, simple
- Free tier with $5 credit/month
- Great for Node.js

### Option D: DigitalOcean App Platform
- $5/month
- Simple deployment
- Good for production

---

## Recommended Approach for Your Demo

For PG Parks demo in 2 days:

✅ **Frontend:** Use Netlify or GitHub Pages (free, instant)
✅ **Backend:** Deploy to Railway or Heroku (free tier)

### Quick Netlify Setup (5 minutes):
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import project"
3. Connect GitHub → Select your repo
4. Publish directory: `dope-cloud-teacher`
5. Click "Deploy"
6. Done! You get a URL like `https://thedopecloudteacher.netlify.app`

### Quick Railway Backend Setup (5 minutes):
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Add environment variables from `backend/.env.example`
6. Railway will deploy automatically
7. You get an API URL

---

## What I'm Setting Up For You Now

I'm creating multiple workflow files so you can choose:
1. ✅ GitHub Pages (simplest for frontend)
2. ✅ Azure Static Web Apps (if you already have it)
3. ✅ Backend deployment workflows

Choose the one that works best for your timeline and budget.
