#!/bin/bash

# Quick Deployment Setup Script

echo "🚀 The Dope Cloud Teacher - Deployment Setup"
echo "=============================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Initializing..."
    git init
    git add .
    git commit -m "Initial commit"
fi

echo "Choose your deployment platform:"
echo "1. Netlify (Recommended - Easiest)"
echo "2. GitHub Pages (Free, Simple)"
echo "3. Azure Static Web Apps (Enterprise)"
echo "4. Railway (Backend Only)"
echo "5. Full Stack (Netlify + Railway)"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "📦 Setting up Netlify deployment..."
        echo ""
        echo "Steps:"
        echo "1. Go to https://app.netlify.com"
        echo "2. Click 'Add new site' → 'Import an existing project'"
        echo "3. Connect your GitHub repository"
        echo "4. Set publish directory: dope-cloud-teacher"
        echo "5. Click 'Deploy site'"
        echo ""
        echo "✅ Your site will be live at: https://your-site.netlify.app"
        ;;
    2)
        echo ""
        echo "📦 Setting up GitHub Pages..."
        echo ""
        echo "Steps:"
        echo "1. Push your code to GitHub"
        echo "2. Go to repository Settings → Pages"
        echo "3. Source: GitHub Actions"
        echo "4. The workflow will auto-deploy"
        echo ""
        echo "✅ Site will be at: https://YOUR_USERNAME.github.io/thedopecloudteacher-website"
        ;;
    3)
        echo ""
        echo "📦 Setting up Azure Static Web Apps..."
        echo ""
        echo "You need to add the Azure deployment token as a GitHub secret:"
        echo ""
        echo "1. Get token from Azure Portal → Static Web App → Manage deployment token"
        echo "2. Go to GitHub repo → Settings → Secrets → Actions"
        echo "3. Add secret: AZURE_STATIC_WEB_APPS_API_TOKEN_VICTORIOUS_GRASS_0F362530F"
        echo "4. Push to trigger deployment"
        ;;
    4)
        echo ""
        echo "📦 Setting up Railway (Backend)..."
        echo ""
        echo "Steps:"
        echo "1. Go to https://railway.app"
        echo "2. Sign in with GitHub"
        echo "3. New Project → Deploy from GitHub repo"
        echo "4. Select your repo"
        echo "5. Add environment variables from backend/.env.example"
        echo "6. Deploy!"
        ;;
    5)
        echo ""
        echo "📦 Setting up Full Stack (Netlify + Railway)..."
        echo ""
        echo "Frontend (Netlify):"
        echo "1. Go to https://app.netlify.com"
        echo "2. Import project from GitHub"
        echo "3. Publish directory: dope-cloud-teacher"
        echo ""
        echo "Backend (Railway):"
        echo "1. Go to https://railway.app"
        echo "2. Deploy from GitHub"
        echo "3. Add environment variables"
        echo ""
        echo "Then update the API URL in your frontend!"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "Would you like to push your code to GitHub now? (y/n)"
read -p "> " push_choice

if [ "$push_choice" = "y" ]; then
    git add .
    git commit -m "Add deployment configurations"
    
    # Check if remote exists
    if ! git remote | grep -q "origin"; then
        read -p "Enter your GitHub repo URL: " repo_url
        git remote add origin "$repo_url"
    fi
    
    git push -u origin main
    
    echo ""
    echo "✅ Code pushed! Check GitHub Actions for deployment status."
fi

echo ""
echo "🎉 Setup complete! Check the Actions tab on GitHub."
