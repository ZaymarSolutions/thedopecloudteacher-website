@echo off
REM Quick Deployment Setup Script for Windows

echo.
echo ========================================
echo  The Dope Cloud Teacher - Deployment
echo ========================================
echo.

echo Choose your deployment platform:
echo 1. Netlify (Recommended - Easiest)
echo 2. GitHub Pages (Free, Simple)
echo 3. Azure Static Web Apps (Enterprise)
echo 4. Railway (Backend Only)
echo 5. Full Stack (Netlify + Railway)
echo.

set /p choice="Enter choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo Setting up Netlify deployment...
    echo.
    echo Steps:
    echo 1. Go to https://app.netlify.com
    echo 2. Click 'Add new site' - 'Import an existing project'
    echo 3. Connect your GitHub repository
    echo 4. Set publish directory: dope-cloud-teacher
    echo 5. Click 'Deploy site'
    echo.
    echo Your site will be live at: https://your-site.netlify.app
    echo.
    start https://app.netlify.com
)

if "%choice%"=="2" (
    echo.
    echo Setting up GitHub Pages...
    echo.
    echo Steps:
    echo 1. Push your code to GitHub
    echo 2. Go to repository Settings - Pages
    echo 3. Source: GitHub Actions
    echo 4. The workflow will auto-deploy
    echo.
    echo Site will be at: https://YOUR_USERNAME.github.io/thedopecloudteacher-website
)

if "%choice%"=="3" (
    echo.
    echo Setting up Azure Static Web Apps...
    echo.
    echo You need to add the Azure deployment token as a GitHub secret:
    echo.
    echo 1. Get token from Azure Portal - Static Web App - Manage deployment token
    echo 2. Go to GitHub repo - Settings - Secrets - Actions
    echo 3. Add secret: AZURE_STATIC_WEB_APPS_API_TOKEN_VICTORIOUS_GRASS_0F362530F
    echo 4. Push to trigger deployment
    echo.
    start https://portal.azure.com
)

if "%choice%"=="4" (
    echo.
    echo Setting up Railway (Backend)...
    echo.
    echo Steps:
    echo 1. Go to https://railway.app
    echo 2. Sign in with GitHub
    echo 3. New Project - Deploy from GitHub repo
    echo 4. Select your repo
    echo 5. Add environment variables from backend/.env.example
    echo 6. Deploy!
    echo.
    start https://railway.app
)

if "%choice%"=="5" (
    echo.
    echo Setting up Full Stack (Netlify + Railway)...
    echo.
    echo Frontend (Netlify):
    echo 1. Go to https://app.netlify.com
    echo 2. Import project from GitHub
    echo 3. Publish directory: dope-cloud-teacher
    echo.
    echo Backend (Railway):
    echo 1. Go to https://railway.app
    echo 2. Deploy from GitHub
    echo 3. Add environment variables
    echo.
    echo Then update the API URL in your frontend!
    echo.
    start https://app.netlify.com
    timeout /t 2 >nul
    start https://railway.app
)

echo.
echo =========================================
echo  For detailed instructions:
echo  See DEPLOYMENT_GUIDE.md
echo =========================================
echo.

set /p push_choice="Would you like to commit and push to GitHub now? (y/n): "

if /i "%push_choice%"=="y" (
    echo.
    echo Committing changes...
    git add .
    git commit -m "Add deployment configurations"
    
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    
    echo.
    echo Done! Check GitHub Actions for deployment status.
    echo.
    start https://github.com/%USERNAME%/thedopecloudteacher-website/actions
)

echo.
echo Setup complete!
pause
