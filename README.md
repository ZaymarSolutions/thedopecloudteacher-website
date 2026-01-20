# The Dope Cloud Teacher 🎓☁️

![Version](https://img.shields.io/badge/version-2.0-blue)
![Status](https://img.shields.io/badge/status-production_ready-green)
![License](https://img.shields.io/badge/license-proprietary-red)

**Professional cloud and technology education platform for career advancement.**

Led by a disabled veteran and cloud architect giving back through education.

---

## 🌟 Features

### For Students
- 📚 **7 Complete Course Pathways** - From fundamentals to advanced specializations
- 🎥 **Curated Video Content** - Hand-picked YouTube videos for each lesson
- 📊 **Progress Tracking** - Monitor your learning journey
- 🏆 **Professional Certificates** - Earn credentials upon completion
- 💯 **Interactive Quizzes** - Test your knowledge after each lesson
- 📱 **Responsive Design** - Learn on any device

### Course Catalog
1. **Cloud Fundamentals 101** - $297 (10 lessons, Beginner)
2. **Cloud Architect Pathway** - $797 (12 lessons, Advanced)
3. **Cloud Security Engineer** - $697 (10 lessons, Intermediate)
4. **DevOps & Automation Mastery** - $597 (12 lessons, Intermediate)
5. **Introduction to AI & ML** - $497 (10 lessons, Beginner)
6. **Cloud Data Engineering** - $697 (11 lessons, Intermediate)
7. **Serverless & Microservices** - $597 (10 lessons, Advanced)

### Pricing Options
- 💎 **Individual Courses** - $297-$797 one-time
- 🎓 **Student Membership** - $47/month (access all courses)
- ⭐ **Pro Membership** - $97/month (+ mentorship)
- 🚀 **Career Accelerator** - $497/month (full support)
- 🏢 **Corporate Training** - Starting at $5,000

---

## 🚀 Quick Start

### Option 1: Automated Setup (Windows)

```powershell
.\start.bat
```

This will:
1. Install all dependencies
2. Set up environment files
3. Initialize the database
4. Start the backend server

Then open a new terminal and run:
```powershell
cd dope-cloud-teacher
python -m http.server 8080
```

Visit http://localhost:8080 in your browser.

### Option 2: Manual Setup

#### 1. Backend Setup
```powershell
cd backend
npm install
cp .env.example .env
# Edit .env with your Stripe keys
npm run init-db
npm start
```

#### 2. Frontend Setup
```powershell
cd dope-cloud-teacher
python -m http.server 8080
# OR use VS Code Live Server extension
```

---

## 📖 Full Documentation

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for:
- Detailed setup instructions
- Stripe configuration
- Deployment guides
- API documentation
- Troubleshooting

---

## 🛠️ Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive design with flexbox/grid
- Font Awesome icons
- jsPDF for certificate generation

### Backend
- Node.js 18+
- Express.js
- SQLite database
- JWT authentication
- Stripe payment processing
- bcrypt password hashing

### Security
- JWT tokens for auth
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- Helmet.js security headers
- SQL injection prevention

---

## 📊 Database

The platform uses SQLite with the following tables:
- `users` - User accounts
- `courses` - Course catalog (7 pathways)
- `purchases` - Purchase history
- `progress` - Learning progress
- `certificates` - Generated certificates

---

## 🎯 Project Structure

```
thedopecloudteacher-website/
├── backend/
│   ├── server.js          # Express API server
│   ├── init-database.js   # Database setup
│   ├── package.json       # Dependencies
│   ├── .env.example       # Environment template
│   └── database.sqlite    # SQLite database
├── dope-cloud-teacher/
│   ├── index.html         # Homepage with demo
│   ├── courses.html       # Course catalog
│   ├── pricing.html       # Pricing page
│   ├── dashboard.html     # Student dashboard
│   ├── lesson.html        # Lesson player
│   ├── certificate.html   # Certificate generator
│   ├── js/
│   │   ├── auth-system.js    # Authentication
│   │   └── course-data.js    # Course curricula
│   └── css/
├── SETUP_GUIDE.md         # Complete setup guide
└── start.bat              # Quick start script
```

---

## 💳 Testing Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Any future date, any CVC

---

## 📞 Support & Contact

- **Platform**: The Dope Cloud Teacher
- **Instructor**: DoGood (Disabled Vet & Cloud Architect)
- **Email**: admin@thedopecloudteacher.org
- **Corporate Training**: corporate@thedopecloudteacher.org

---

**Built with ❤️ by The Dope Cloud Teacher**

*Empowering the next generation of cloud professionals*
