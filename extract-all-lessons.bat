@echo off
setlocal enabledelayedexpansion

set FFMPEG=C:\Users\v-rosmurphy\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe
set MASTER=D:\COURSE_VIDEOS\MASTER_RAW_FOOTAGE.mp4

REM Lesson 1
echo [1/11] Lesson 1: Cloud Evolution Timeline...
"%FFMPEG%" -ss 00:00:00 -i "%MASTER%" -t 187 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-1-Cloud-Evolution-Timeline.mp4" -y

REM Lesson 2
echo [2/11] Lesson 2: Cloud Service Models...
"%FFMPEG%" -ss 00:03:07 -i "%MASTER%" -t 206 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-2-Cloud-Service-Models-IaaS-PaaS-SaaS.mp4" -y

REM Lesson 3
echo [3/11] Lesson 3: Introduction to AWS...
"%FFMPEG%" -ss 00:06:33 -i "%MASTER%" -t 204 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-3-Introduction-to-AWS.mp4" -y

REM Lesson 4
echo [4/11] Lesson 4: Microsoft Azure Essentials...
"%FFMPEG%" -ss 00:09:57 -i "%MASTER%" -t 197 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-4-Microsoft-Azure-Essentials.mp4" -y

REM Lesson 5
echo [5/11] Lesson 5: Google Cloud Platform Basics...
"%FFMPEG%" -ss 00:13:14 -i "%MASTER%" -t 222 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-5-Google-Cloud-Platform-Basics.mp4" -y

REM Lesson 6
echo [6/11] Lesson 6: Cloud Storage Solutions...
"%FFMPEG%" -ss 00:18:56 -i "%MASTER%" -t 193 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-6-Cloud-Storage-Solutions.mp4" -y

REM Lesson 7
echo [7/11] Lesson 7: Cloud Networking Fundamentals...
"%FFMPEG%" -ss 00:22:29 -i "%MASTER%" -t 200 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-7-Cloud-Networking-Fundamentals.mp4" -y

REM Lesson 8
echo [8/11] Lesson 8: Cloud Security Fundamentals...
"%FFMPEG%" -ss 00:26:49 -i "%MASTER%" -t 185 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-8-Cloud-Security-Fundamentals.mp4" -y

REM Lesson 9
echo [9/11] Lesson 9: Monitoring and Logging...
"%FFMPEG%" -ss 00:30:54 -i "%MASTER%" -t 179 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-9-Monitoring-and-Logging.mp4" -y

REM Lesson 10
echo [10/11] Lesson 10: Cost Optimization...
"%FFMPEG%" -ss 00:34:53 -i "%MASTER%" -t 201 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-10-Cost-Optimization.mp4" -y

REM Lesson 11
echo [11/11] Lesson 11: Your Cloud Career Path...
"%FFMPEG%" -ss 00:39:14 -i "%MASTER%" -t 197 -c:v libx264 -preset medium -crf 23 -c:a aac -q:a 5 -movflags +faststart "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-11-Your-Cloud-Career-Path.mp4" -y

echo.
echo ✓ All 11 lesson videos extracted!
dir "D:\COURSE_VIDEOS\CLOUD-FUNDAMENTALS-101\Lesson-*.mp4" | find /c "Lesson-"
