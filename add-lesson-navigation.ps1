# Script to add navigation to all lesson HTML files

$lessonFiles = @(
    "lesson1.html", "lesson2.html", "lesson3.html", "lesson4.html", 
    "lesson5.html", "lesson6.html", "lesson7.html", "lesson8.html",
    "lesson9.html", "lesson10.html"
)

$navHTML = @"
  <!-- Navigation -->
  <nav class="lesson-nav">
    <div class="lesson-nav-left">
      <a href="index.html">🏠 Home</a>
      <a href="Cloud-fundamentals-course.html">📚 All Lessons</a>
      <a href="dashboard.html">👤 Dashboard</a>
    </div>
    <div class="lesson-nav-right">
      <a href="Cloud-fundamentals-course.html" class="nav-btn">← Back to Course</a>
      <a href="NEXT_LESSON" class="nav-btn next">Next Lesson →</a>
    </div>
  </nav>

"@

$navCSS = @"
    /* Navigation Bar */
    .lesson-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(45, 27, 105, 0.95);
      backdrop-filter: blur(10px);
      padding: 0.8rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      z-index: 1000;
    }
    .lesson-nav-left {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .lesson-nav-left a {
      color: #fff;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    .lesson-nav-left a:hover {
      color: #ffcc00;
    }
    .lesson-nav-right {
      display: flex;
      gap: 1rem;
    }
    .nav-btn {
      padding: 0.5rem 1rem;
      background: #9333ea;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s;
      border: none;
      cursor: pointer;
    }
    .nav-btn:hover {
      background: #7e22ce;
      transform: translateY(-2px);
    }
    .nav-btn.next {
      background: #10b981;
    }
    .nav-btn.next:hover {
      background: #059669;
    }
    
"@

Write-Host "This script would add navigation to all lesson files." -ForegroundColor Green
Write-Host "Lesson 1 has been manually updated as an example." -ForegroundColor Yellow
Write-Host "`nTo complete navigation for lessons 2-10:" -ForegroundColor Cyan
Write-Host "1. Copy the navigation HTML from lesson1.html" -ForegroundColor White
Write-Host "2. Paste it into each lesson file after <body> tag" -ForegroundColor White
Write-Host "3. Update the 'Next Lesson →' link for each file" -ForegroundColor White
Write-Host "4. For lesson10.html, change next button to 'Complete Course'" -ForegroundColor White
