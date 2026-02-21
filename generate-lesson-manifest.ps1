# Parse VIDEO_SCRIPTS_ALL_COURSES.md and generate lesson timing manifest

$file = "VIDEO_SCRIPTS_ALL_COURSES.md"
$lines = Get-Content $file
$course = ""
$lessons = @()
$cumulativeSeconds = 0

for ($i=0; $i -lt $lines.Count; $i++) {
  $line = $lines[$i]
  
  # Match course name
  if ($line -match '^#\s+.*COURSE\s+\d+:\s+(.*)$') {
    $course = $Matches[1].Trim()
    continue
  }
  
  # Match lesson
  if ($line -match '^##\s+LESSON\s+(\d+):\s+(.*)$') {
    $lessonNum = [int]$Matches[1]
    $lessonTitle = $Matches[2].Trim()
    
    # Find script block
    while ($i -lt $lines.Count -and $lines[$i] -notmatch '^===== VIDEO SCRIPT =====') { $i++ }
    if ($i -ge $lines.Count) { break }
    $i++
    
    # Extract script text
    $scriptLines = @()
    while ($i -lt $lines.Count -and $lines[$i] -notmatch '^===== END SCRIPT =====') {
      $scriptLines += $lines[$i]
      $i++
    }
    
    $scriptText = ($scriptLines -join ' ')
    $wordCount = (($scriptText -split '\s+' | Where-Object { $_ -ne '' }).Count)
    
    # Estimate duration: 150 words/minute, convert to seconds
    $estSeconds = [math]::Round(($wordCount / 150) * 60)
    if ($estSeconds -lt 180) { $estSeconds = 180 }  # Minimum 3 min
    if ($estSeconds -gt 300) { $estSeconds = 300 }  # Maximum 5 min
    
    $startTime = $cumulativeSeconds
    $endTime = $startTime + $estSeconds
    $cumulativeSeconds = $endTime
    
    $lessons += [pscustomobject]@{
      course = $course
      lessonNumber = $lessonNum
      lessonTitle = $lessonTitle
      wordCount = $wordCount
      durationSeconds = $estSeconds
      startTime = $startTime
      endTime = $endTime
      startTimeFormatted = [TimeSpan]::FromSeconds($startTime).ToString('hh\:mm\:ss')
      endTimeFormatted = [TimeSpan]::FromSeconds($endTime).ToString('hh\:mm\:ss')
    }
  }
}

$lessons | ConvertTo-Json -Depth 3 | Set-Content 'lesson_manifest.json' -Encoding UTF8
Write-Host ('Generated lesson_manifest.json with ' + $lessons.Count + ' lessons')
$totalDuration = [TimeSpan]::FromSeconds($cumulativeSeconds).ToString('hh\:mm\:ss')
Write-Host ('Total video duration: ' + $totalDuration)
$lessons | Select-Object -First 5 | Format-Table lessonNumber, lessonTitle, durationSeconds, startTimeFormatted, endTimeFormatted
