# Extract individual lesson videos from master footage using lesson_manifest.json

$ffmpeg = "C:\Users\v-rosmurphy\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
$masterVideo = "D:\COURSE_VIDEOS\MASTER_RAW_FOOTAGE.mp4"
$manifest = Get-Content 'lesson_manifest.json' | ConvertFrom-Json

$totalLessons = @($manifest).Count
$current = 0
$successCount = 0

foreach ($lesson in $manifest) {
  $current++
  $courseName = $lesson.course -replace '[^a-zA-Z0-9]', '-'
  $courseFolder = "D:\COURSE_VIDEOS\$courseName"
  
  if (!(Test-Path $courseFolder)) {
    New-Item -ItemType Directory -Force -Path $courseFolder | Out-Null
  }
  
  $outputFile = "$courseFolder\Lesson-$($lesson.lessonNumber)-$($lesson.lessonTitle -replace '[^a-zA-Z0-9-]', '-').mp4"
  $startTime = $lesson.startTimeFormatted
  $duration = $lesson.durationSeconds
  
  Write-Host ("[$current/$totalLessons] Extracting: $($lesson.lessonTitle) (start $startTime, dur $duration sec)...")
  
  & $ffmpeg -ss $startTime -i $masterVideo -t $duration -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart $outputFile -y 2>&1 | Out-Null
  
  if (Test-Path $outputFile) {
    $size = (Get-Item $outputFile).Length / 1MB
    $sizeRounded = [math]::Round($size, 1)
    Write-Host ("  OK: $sizeRounded MB")
    $successCount++
  } else {
    Write-Host ('  FAILED')
  }
}

Write-Host ("`nExtraction complete! $successCount/$totalLessons videos created.")
