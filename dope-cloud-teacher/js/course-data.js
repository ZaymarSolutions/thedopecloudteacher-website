// Complete Course Curricula Data with Full Learning Materials
const COURSE_PATHWAYS = {
  'cloud-fundamentals-101': {
    id: 'cloud-fundamentals-101',
    title: 'Cloud Fundamentals 101',
    subtitle: 'Your First Step Into Cloud Computing',
    description: 'Master the essentials of cloud computing across AWS, Azure, and GCP. Perfect for absolute beginners.',
    price: 297,
    duration: '15 hours',
    level: 'Beginner',
    category: 'Cloud Basics',
    color: '#9333ea',
    icon: '☁️',
    skills: ['Cloud Computing Basics', 'AWS Core Services', 'Azure Fundamentals', 'GCP Essentials', 'Cloud Security'],
    
    // Lab Environment Setup Instructions
    labSetup: {
      title: 'Getting Your Lab Environment Ready',
      description: 'You\'ll need access to cloud platforms to complete hands-on labs. Here are your options:',
      options: [
        {
          name: 'AWS Free Tier (Recommended for Beginners)',
          steps: [
            'Visit https://aws.amazon.com/free/',
            'Click "Create a Free Account"',
            'Provide email, password, and AWS account name',
            'Enter payment information (required but won\'t be charged for free tier usage)',
            'Verify your phone number',
            'Choose "Basic Support - Free" plan',
            'Sign in to AWS Console at https://console.aws.amazon.com/',
            '⚠️ Set up billing alerts to avoid unexpected charges: CloudWatch > Billing > Create Alarm'
          ],
          duration: '10-15 minutes',
          cost: 'Free for 12 months (with usage limits)',
          url: 'https://aws.amazon.com/free/'
        },
        {
          name: 'Azure Free Account',
          steps: [
            'Visit https://azure.microsoft.com/free/',
            'Click "Start free"',
            'Sign in with Microsoft account (or create one)',
            'Enter personal information and phone verification',
            'Add credit card for identity verification ($200 credit provided)',
            'Complete identity verification',
            'Access Azure Portal at https://portal.azure.com/',
            '💡 Tip: Use Azure Cost Management to track your spending'
          ],
          duration: '10-15 minutes',
          cost: '$200 credit for 30 days + 12 months of free services',
          url: 'https://azure.microsoft.com/free/'
        },
        {
          name: 'Google Cloud Free Tier',
          steps: [
            'Visit https://cloud.google.com/free/',
            'Click "Get started for free"',
            'Sign in with Google account',
            'Enter billing information ($300 credit for 90 days)',
            'Select country and accept terms',
            'Access GCP Console at https://console.cloud.google.com/',
            'Create your first project',
            '📊 Enable billing alerts in Billing > Budgets & Alerts'
          ],
          duration: '10 minutes',
          cost: '$300 credit for 90 days + Always Free tier',
          url: 'https://cloud.google.com/free/'
        },
        {
          name: 'Use Your Existing Cloud Account',
          steps: [
            '✅ If you already have AWS/Azure/GCP access through work or school, you can use that',
            'Ensure you have permissions to create: VMs, storage, networks, and basic services',
            'Check with your organization about cost allocation tags or budget limits',
            'Use a separate resource group/project for course labs to keep things organized',
            '🏷️ Tag all resources with "Course: Cloud Fundamentals 101" for easy cleanup'
          ],
          duration: '5 minutes',
          cost: 'Depends on your organization\'s arrangement'
        },
        {
          name: 'Cloud Sandboxes & Practice Environments (No Credit Card Required)',
          steps: [
            '🧪 A Cloud Guru Sandbox: https://acloudguru.com/platform/cloud-sandbox-playgrounds',
            '🎮 AWS CloudQuest (gamified learning): https://aws.amazon.com/training/digital/aws-cloud-quest/',
            '🔬 Azure Learn Sandbox: Built into Microsoft Learn modules (https://learn.microsoft.com/training/azure/)',
            '🧑‍🔬 Qwiklabs for GCP: https://www.cloudskillsboost.google/ (free labs available)',
            '💻 Instruqt Interactive Labs: https://play.instruqt.com/public',
            'These are temporary environments (1-4 hours) - perfect for trying things without commitment'
          ],
          duration: 'Instant access',
          cost: 'Free (time-limited sessions)'
        }
      ],
      recommendations: [
        '🎯 Beginners: Start with free sandboxes (A Cloud Guru, Qwiklabs) to explore without risk',
        '💳 Ready to commit: Sign up for all three free tiers (AWS, Azure, GCP) for maximum learning',
        '🏢 Corporate learners: Check if your employer provides Azure/AWS subscriptions',
        '🎓 Students: Look for GitHub Student Developer Pack (includes Azure credits)',
        '⏰ Budget-conscious: Use sandboxes for practice, your own account only for capstone projects'
      ]
    },
    
    // Coding Prerequisites
    codingPrerequisites: {
      required: false,
      description: 'While not required for this course, basic scripting knowledge enhances your cloud journey.',
      languages: [
        {
          name: 'Python',
          why: 'Most popular for cloud automation, AWS Lambda, data processing, and AI/ML',
          skillLevel: 'Basic syntax and functions',
          learningResources: [
            { title: 'Python for Beginners - Microsoft', url: 'https://learn.microsoft.com/training/paths/beginner-python/', duration: '8 hours', type: 'free' },
            { title: 'Python Tutorial - W3Schools', url: 'https://www.w3schools.com/python/', duration: 'Self-paced', type: 'free' },
            { title: 'Learn Python - Codecademy', url: 'https://www.codecademy.com/learn/learn-python-3', duration: '25 hours', type: 'freemium' },
            { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', duration: 'Book + Videos', type: 'free' }
          ],
          quickStart: [
            'Install Python: https://www.python.org/downloads/',
            'Try it online: https://repl.it/languages/python3',
            'Learn basics: variables, functions, loops, lists (2-3 hours)',
            'Practice: Write a script to calculate cloud costs'
          ]
        },
        {
          name: 'PowerShell',
          why: 'Essential for Azure administration and Windows automation',
          skillLevel: 'Basic cmdlets and scripting',
          learningResources: [
            { title: 'PowerShell 101 - Microsoft', url: 'https://learn.microsoft.com/powershell/scripting/learn/ps101/00-introduction', duration: '5 hours', type: 'free' },
            { title: 'PowerShell Tutorial - TutorialsPoint', url: 'https://www.tutorialspoint.com/powershell/index.htm', duration: 'Self-paced', type: 'free' },
            { title: 'Introduction to PowerShell - Pluralsight', url: 'https://www.pluralsight.com/courses/powershell-intro', duration: '3 hours', type: 'paid' },
            { title: 'Learn PowerShell in a Month of Lunches', url: 'https://www.manning.com/books/learn-powershell-in-a-month-of-lunches', duration: 'Book', type: 'paid' }
          ],
          quickStart: [
            'Already installed on Windows! Open "Windows PowerShell"',
            'Mac/Linux: Install PowerShell Core from https://github.com/PowerShell/PowerShell',
            'Learn basics: cmdlets (Get-, Set-, New-), variables, pipelines (2 hours)',
            'Practice: Get-AzVM, Get-Service, basic automation'
          ]
        },
        {
          name: 'Bash/Shell Scripting',
          why: 'Useful for Linux VMs, automation, and AWS CLI',
          skillLevel: 'Basic commands and scripts',
          learningResources: [
            { title: 'Bash Scripting Tutorial', url: 'https://linuxconfig.org/bash-scripting-tutorial', duration: '4 hours', type: 'free' },
            { title: 'Shell Scripting - Linux Journey', url: 'https://linuxjourney.com/lesson/the-shell', duration: 'Self-paced', type: 'free' },
            { title: 'Bash Guide for Beginners', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', duration: 'Reference', type: 'free' }
          ],
          quickStart: [
            'Mac/Linux: Already have it! Open Terminal',
            'Windows: Use Git Bash (https://gitforwindows.org/) or WSL',
            'Learn basics: ls, cd, grep, pipes, variables (1-2 hours)',
            'Practice: Write a script to backup files'
          ]
        }
      ],
      recommendation: '💡 You can start the course today and learn coding alongside. Most lessons have step-by-step instructions that teach you as you go!'
    },
    
    // Certification Exam Preparation
    certifications: [
      { name: 'AWS Certified Cloud Practitioner', provider: 'AWS', code: 'CLF-C02' },
      { name: 'Microsoft Azure Fundamentals', provider: 'Microsoft', code: 'AZ-900' },
      { name: 'Google Cloud Digital Leader', provider: 'Google Cloud', code: 'Cloud Digital Leader' }
    ],
    
    // Career Paths & Job Roles
    careerPaths: [
      { role: 'Cloud Support Specialist', avgSalary: '$55,000 - $75,000', demand: 'High' },
      { role: 'Junior Cloud Engineer', avgSalary: '$65,000 - $85,000', demand: 'Very High' },
      { role: 'Cloud Operations Analyst', avgSalary: '$60,000 - $80,000', demand: 'High' },
      { role: 'IT Administrator (Cloud)', avgSalary: '$55,000 - $75,000', demand: 'High' }
    ],
    
    // Detailed Syllabus
    syllabus: {
      overview: 'This comprehensive course provides a solid foundation in cloud computing across the three major cloud platforms. You\'ll gain hands-on experience with AWS, Azure, and GCP while learning industry best practices.',
      prerequisites: 'Basic computer literacy, No prior cloud experience required',
      outcomes: [
        'Understand cloud computing concepts and service models',
        'Navigate AWS, Azure, and GCP consoles confidently',
        'Deploy and manage basic cloud resources',
        'Implement cloud security best practices',
        'Optimize cloud costs effectively',
        'Prepare for entry-level cloud certifications'
      ],
      weekByWeek: [
        { week: 1, topics: ['Cloud Evolution & Service Models', 'Introduction to AWS'], labs: 2 },
        { week: 2, topics: ['Microsoft Azure Essentials', 'Google Cloud Platform Basics'], labs: 2 },
        { week: 3, topics: ['Cloud Storage Solutions', 'Cloud Networking Fundamentals'], labs: 2 },
        { week: 4, topics: ['Cloud Security Basics', 'Cost Management', 'Capstone Project'], labs: 4 }
      ]
    },
    
    // Downloadable Resources
    resources: [
      { title: 'Cloud Fundamentals Study Guide (PDF)', type: 'pdf', size: '5 MB' },
      { title: 'AWS CLI Cheat Sheet', type: 'pdf', size: '2 MB' },
      { title: 'Azure PowerShell Commands Reference', type: 'pdf', size: '2 MB' },
      { title: 'GCP gcloud Command Line Guide', type: 'pdf', size: '2 MB' },
      { title: 'Cloud Security Checklist', type: 'pdf', size: '1 MB' },
      { title: 'Cost Optimization Best Practices', type: 'pdf', size: '3 MB' },
      { title: 'Capstone Project Template', type: 'zip', size: '10 MB' }
    ],
    
    lessons: [
      {
        id: 'lesson1',
        title: 'Cloud Evolution Timeline',
        duration: '45 min',
        video: 'https://www.youtube.com/embed/2LaAJq1lB1Q',
        topics: ['History of Cloud', 'Mainframes to Modern Cloud', 'Key Innovations'],
        description: 'Understand how cloud computing evolved from mainframes to today\'s cloud platforms.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'NIST Cloud Computing Definition (Official)', 
            duration: '15 min',
            url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf',
            description: 'The official NIST definition of cloud computing - essential reading'
          },
          { 
            type: 'interactive', 
            title: 'AWS Cloud Quest - Cloud Practitioner', 
            duration: '30 min',
            url: 'https://aws.amazon.com/training/digital/aws-cloud-quest/',
            description: 'Gamified learning environment to explore AWS basics (free, no credit card)'
          },
          { 
            type: 'video', 
            title: 'Cloud Computing Explained by IBM', 
            duration: '10 min',
            url: 'https://www.youtube.com/watch?v=RWgW-CgdIk0',
            description: 'Excellent overview of cloud evolution and concepts'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What was the primary limitation of mainframe computing that led to cloud computing?',
              options: ['High cost and limited scalability', 'Poor security', 'Slow processing', 'Limited storage'],
              correctAnswer: 0
            },
            {
              question: 'Which company is credited with launching the first major public cloud service (EC2) in 2006?',
              options: ['Microsoft', 'Google', 'Amazon', 'IBM'],
              correctAnswer: 2
            },
            {
              question: 'What does "elasticity" mean in cloud computing?',
              options: ['Security', 'Ability to scale resources up or down automatically', 'Fast processing', 'Data replication'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Explore Cloud Provider Timelines',
          duration: '20 min',
          tasks: [
            'Research and document key milestones for AWS, Azure, and GCP',
            'Create a comparison chart of service launch dates',
            'Identify which provider pioneered specific cloud services'
          ]
        }
      },
      {
        id: 'lesson2',
        title: 'Cloud Service Models: IaaS, PaaS, SaaS',
        duration: '60 min',
        video: 'https://www.youtube.com/embed/36zducUX16w',
        topics: ['IaaS Deep Dive', 'PaaS Use Cases', 'SaaS Examples', 'Choosing the Right Model'],
        description: 'Learn the three fundamental cloud service models and when to use each.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'NIST Cloud Service Models - Official Definition', 
            duration: '20 min',
            url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf',
            description: 'Pages 2-3 cover IaaS, PaaS, and SaaS definitions'
          },
          { 
            type: 'interactive', 
            title: 'Azure Learn: IaaS vs PaaS vs SaaS', 
            duration: '25 min',
            url: 'https://learn.microsoft.com/training/modules/azure-compute-fundamentals/',
            description: 'Hands-on Azure sandbox lab - no account needed, runs in browser'
          },
          { 
            type: 'case-study', 
            title: 'Real Companies Using IaaS/PaaS/SaaS', 
            duration: '15 min',
            url: 'https://aws.amazon.com/solutions/case-studies/',
            description: 'Browse case studies to see how Netflix (IaaS), Spotify (PaaS), etc. use cloud'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'Which service model gives you the MOST control over the underlying infrastructure?',
              options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
              correctAnswer: 2
            },
            {
              question: 'Gmail and Office 365 are examples of which service model?',
              options: ['IaaS', 'PaaS', 'SaaS', 'DaaS'],
              correctAnswer: 2
            },
            {
              question: 'Which service model is best for developers who want to focus on code without managing servers?',
              options: ['IaaS', 'PaaS', 'SaaS', 'BaaS'],
              correctAnswer: 1
            },
            {
              question: 'In which model are you responsible for patching the operating system?',
              options: ['SaaS', 'PaaS', 'IaaS', 'None of the above'],
              correctAnswer: 2
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Service Model Hands-On Comparison',
          duration: '30 min',
          tasks: [
            'Deploy a virtual machine on AWS EC2 (IaaS)',
            'Deploy an application on Heroku or Azure App Service (PaaS)',
            'Use a SaaS tool like Google Workspace or Salesforce',
            'Document the differences in setup time and control level'
          ]
        }
      },
      {
        id: 'lesson3',
        title: 'Introduction to AWS',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/JIbIYCM48to',
        topics: ['AWS Console', 'EC2 Instances', 'S3 Storage', 'IAM Basics'],
        description: 'Get hands-on with Amazon Web Services and its core offerings.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'AWS Global Infrastructure Overview', 
            duration: '25 min',
            url: 'https://aws.amazon.com/about-aws/global-infrastructure/',
            description: 'Official AWS documentation on regions, availability zones, and edge locations'
          },
          { 
            type: 'video', 
            title: 'AWS Free Tier Navigation Guide', 
            duration: '15 min',
            url: 'https://www.youtube.com/watch?v=Vq3d7uMYnRM',
            description: 'Complete walkthrough of AWS Free Tier services and how to avoid charges'
          },
          { 
            type: 'documentation', 
            title: 'EC2 Instance Types Reference', 
            duration: '20 min',
            url: 'https://aws.amazon.com/ec2/instance-types/',
            description: 'Comprehensive guide to choosing the right EC2 instance type for your workload'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What does EC2 stand for?',
              options: ['Elastic Cloud Computing', 'Elastic Compute Cloud', 'Easy Cloud Computing', 'Enterprise Compute Cloud'],
              correctAnswer: 1
            },
            {
              question: 'Which AWS service is used for object storage?',
              options: ['EBS', 'S3', 'EFS', 'Glacier'],
              correctAnswer: 1
            },
            {
              question: 'What is IAM primarily used for in AWS?',
              options: ['Storage', 'Identity and Access Management', 'Networking', 'Monitoring'],
              correctAnswer: 1
            },
            {
              question: 'What is an AWS Region?',
              options: ['A data center', 'A geographic area with multiple availability zones', 'A single server', 'A VPC'],
              correctAnswer: 1
            },
            {
              question: 'Which of the following is NOT an EC2 instance purchasing option?',
              options: ['On-Demand', 'Reserved', 'Spot', 'Premium'],
              correctAnswer: 3
            }
          ],
          passingScore: 80
        },
        lab: {
          title: 'Launch Your First EC2 Instance',
          duration: '45 min',
          tasks: [
            'Create an AWS Free Tier account',
            'Launch a t2.micro EC2 instance with Amazon Linux',
            'Create an S3 bucket and upload a file',
            'Set up IAM user with limited permissions',
            'Access EC2 instance via SSH',
            'Document all security group rules created'
          ]
        }
      },
      {
        id: 'lesson4',
        title: 'Microsoft Azure Essentials',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/3gnLwFGLfvM',
        topics: ['Azure Portal', 'Virtual Machines', 'Storage Accounts', 'Resource Groups'],
        description: 'Explore Microsoft Azure\'s cloud platform and key services.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Azure Architecture Center', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/azure/architecture/',
            description: 'Microsoft\'s comprehensive resource for cloud architecture best practices and patterns'
          },
          { 
            type: 'interactive', 
            title: 'Azure Portal Walkthrough', 
            duration: '20 min',
            url: 'https://learn.microsoft.com/training/modules/tour-azure-portal/',
            description: 'Hands-on Microsoft Learn module with browser-based Azure sandbox (no account needed)'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is an Azure Resource Group?',
              options: ['A type of VM', 'A logical container for Azure resources', 'A storage account', 'A network'],
              correctAnswer: 1
            },
            {
              question: 'Which Azure service is equivalent to AWS S3?',
              options: ['Azure Files', 'Azure Disk', 'Azure Blob Storage', 'Azure Queue'],
              correctAnswer: 2
            },
            {
              question: 'What is the Azure equivalent of AWS IAM?',
              options: ['Azure AD', 'Azure RBAC', 'Azure Active Directory + RBAC', 'Azure Policy'],
              correctAnswer: 2
            },
            {
              question: 'What is an Azure Subscription?',
              options: ['A monthly fee', 'A logical unit of Azure services with billing', 'A service plan', 'A resource group'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Deploy Azure Resources',
          duration: '45 min',
          tasks: [
            'Create an Azure free account',
            'Create a Resource Group',
            'Deploy a Windows VM in Azure',
            'Create a Storage Account and container',
            'Configure RBAC permissions',
            'Explore Azure Cost Management tools'
          ]
        }
      },
      {
        id: 'lesson5',
        title: 'Google Cloud Platform Basics',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/4D3X6Xl5c_Y',
        topics: ['GCP Console', 'Compute Engine', 'Cloud Storage', 'Projects & Billing'],
        description: 'Navigate Google Cloud Platform and understand its unique offerings.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'GCP Solutions Architecture', 
            duration: '25 min',
            url: 'https://cloud.google.com/architecture',
            description: 'Google Cloud architecture framework with reference architectures and best practices'
          },
          { 
            type: 'documentation', 
            title: 'gcloud CLI Quickstart', 
            duration: '15 min',
            url: 'https://cloud.google.com/sdk/gcloud',
            description: 'Complete guide to installing and using the gcloud command-line tool'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a GCP Project?',
              options: ['A VM instance', 'An organizational unit for managing resources and billing', 'A storage bucket', 'A network'],
              correctAnswer: 1
            },
            {
              question: 'Which GCP service is equivalent to AWS EC2?',
              options: ['App Engine', 'Compute Engine', 'Cloud Functions', 'Kubernetes Engine'],
              correctAnswer: 1
            },
            {
              question: 'What is Cloud Storage in GCP primarily used for?',
              options: ['Block storage', 'Object storage', 'File storage', 'Database storage'],
              correctAnswer: 1
            },
            {
              question: 'What command-line tool is used to interact with GCP?',
              options: ['aws-cli', 'az', 'gcloud', 'kubectl'],
              correctAnswer: 2
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'GCP Hands-On Setup',
          duration: '45 min',
          tasks: [
            'Create a GCP account with $300 free credit',
            'Set up your first GCP project',
            'Launch a Compute Engine VM',
            'Create a Cloud Storage bucket',
            'Install and configure gcloud CLI',
            'Set up billing alerts'
          ]
        }
      },
      {
        id: 'lesson6',
        title: 'Cloud Storage Solutions',
        duration: '60 min',
        video: 'https://www.youtube.com/embed/OJiYsNPymHE',
        topics: ['Object Storage', 'Block Storage', 'File Storage', 'Backup Strategies'],
        description: 'Master different storage types and best practices for data management.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Cloud Storage Types Comparison', 
            duration: '20 min',
            url: 'https://aws.amazon.com/products/storage/',
            description: 'Detailed comparison of object, block, and file storage with use cases'
          },
          { 
            type: 'case-study', 
            title: 'Storage Architecture Patterns', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/architecture/guide/technology-choices/data-store-overview',
            description: 'Real-world storage architecture patterns and decision guide'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'Which storage type is best for unstructured data like images and videos?',
              options: ['Block', 'Object', 'File', 'Database'],
              correctAnswer: 1
            },
            {
              question: 'What is the primary use case for block storage?',
              options: ['Static websites', 'VM boot disks and databases', 'Shared files', 'Archive storage'],
              correctAnswer: 1
            },
            {
              question: 'Which storage class offers the lowest cost for infrequently accessed data?',
              options: ['Standard', 'Infrequent Access', 'Glacier/Archive', 'Intelligent Tiering'],
              correctAnswer: 2
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Implement Multi-Cloud Storage',
          duration: '40 min',
          tasks: [
            'Create object storage in all three clouds (S3, Azure Blob, Cloud Storage)',
            'Upload the same file to each and compare',
            'Set up versioning and lifecycle policies',
            'Create a block storage volume and attach to a VM',
            'Implement a simple backup strategy'
          ]
        }
      },
      {
        id: 'lesson7',
        title: 'Cloud Networking Fundamentals',
        duration: '75 min',
        video: 'https://www.youtube.com/embed/hiKPPy584Mg',
        topics: ['Virtual Networks', 'Subnets', 'Load Balancers', 'CDN'],
        description: 'Understand cloud networking concepts and how to connect resources.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'VPC Design Best Practices', 
            duration: '25 min',
            url: 'https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-design.html',
            description: 'AWS VPC design patterns including subnets, routing, and security best practices'
          },
          { 
            type: 'diagram', 
            title: 'Network Architecture Patterns', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/architecture/reference-architectures/hybrid-networking/',
            description: 'Visual reference architectures for cloud networking with detailed diagrams'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a VPC (Virtual Private Cloud)?',
              options: ['A VM', 'An isolated network in the cloud', 'A storage service', 'A security group'],
              correctAnswer: 1
            },
            {
              question: 'What is the purpose of a subnet?',
              options: ['Store data', 'Divide a VPC into smaller network segments', 'Run applications', 'Monitor resources'],
              correctAnswer: 1
            },
            {
              question: 'What does a load balancer do?',
              options: ['Store files', 'Distribute traffic across multiple servers', 'Monitor performance', 'Encrypt data'],
              correctAnswer: 1
            },
            {
              question: 'What is a CDN (Content Delivery Network) used for?',
              options: ['Database storage', 'Delivering content from edge locations closer to users', 'VM orchestration', 'Security'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Build a Multi-Tier Network Architecture',
          duration: '60 min',
          tasks: [
            'Create a VPC with public and private subnets',
            'Deploy VMs in different subnets',
            'Configure routing tables and internet gateway',
            'Set up a load balancer with multiple targets',
            'Test connectivity and traffic distribution'
          ]
        }
      },
      {
        id: 'lesson8',
        title: 'Cloud Security Basics',
        duration: '75 min',
        video: 'https://www.youtube.com/embed/dxDg-aGh0Nc',
        topics: ['Identity & Access Management', 'Encryption', 'Firewalls', 'Best Practices'],
        description: 'Learn essential cloud security concepts to protect your infrastructure.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Cloud Security Best Practices Guide', 
            duration: '30 min',
            url: 'https://aws.amazon.com/architecture/security-identity-compliance/',
            description: 'AWS security best practices covering IAM, encryption, monitoring, and compliance'
          },
          { 
            type: 'checklist', 
            title: 'Security Audit Checklist', 
            duration: '10 min',
            url: 'https://www.cisecurity.org/benchmark/amazon_web_services',
            description: 'CIS Security Benchmark for cloud platforms - industry-standard security checklist'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What principle should you follow when assigning permissions?',
              options: ['Maximum privilege', 'Least privilege', 'All or nothing', 'Role-based only'],
              correctAnswer: 1
            },
            {
              question: 'What is MFA (Multi-Factor Authentication)?',
              options: ['Multiple firewalls', 'Requiring two or more verification factors', 'Multiple accounts', 'Multiple regions'],
              correctAnswer: 1
            },
            {
              question: 'What is encryption at rest?',
              options: ['Encrypting data while stored', 'Encrypting data in transit', 'Both', 'Neither'],
              correctAnswer: 0
            },
            {
              question: 'What is a Security Group in cloud computing?',
              options: ['A team of security engineers', 'A virtual firewall for controlling traffic', 'An encryption method', 'A compliance framework'],
              correctAnswer: 1
            }
          ],
          passingScore: 80
        },
        lab: {
          title: 'Implement Cloud Security Controls',
          duration: '50 min',
          tasks: [
            'Enable MFA on your cloud account',
            'Create IAM users with least-privilege permissions',
            'Configure security groups to restrict traffic',
            'Enable encryption on storage buckets',
            'Set up logging and monitoring for security events',
            'Perform a security audit using cloud-native tools'
          ]
        }
      },
      {
        id: 'lesson9',
        title: 'Cloud Cost Management',
        duration: '60 min',
        video: 'https://www.youtube.com/embed/CpWw-LYlDc0',
        topics: ['Pricing Models', 'Cost Optimization', 'Budgeting Tools', 'Resource Tagging'],
        description: 'Control and optimize your cloud spending with proven strategies.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Cloud Cost Optimization Strategies', 
            duration: '20 min',
            url: 'https://aws.amazon.com/aws-cost-management/cost-optimization/',
            description: 'Proven strategies for reducing cloud costs including right-sizing and reserved instances'
          },
          { 
            type: 'calculator', 
            title: 'Cloud Pricing Calculator Tutorial', 
            duration: '15 min',
            url: 'https://calculator.aws/',
            description: 'Interactive AWS Pricing Calculator to estimate costs before deploying resources'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'Which purchasing option offers the largest discount for predictable workloads?',
              options: ['On-Demand', 'Reserved Instances', 'Spot Instances', 'Savings Plans'],
              correctAnswer: 1
            },
            {
              question: 'What is the purpose of resource tagging?',
              options: ['Security', 'Cost allocation and tracking', 'Performance', 'Networking'],
              correctAnswer: 1
            },
            {
              question: 'What is the benefit of auto-scaling?',
              options: ['Fixed costs', 'Paying only for resources you need when you need them', 'Faster processing', 'Better security'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Optimize Cloud Costs',
          duration: '45 min',
          tasks: [
            'Set up billing alerts and budgets',
            'Analyze current resource usage with cost explorer',
            'Identify and delete unused resources',
            'Implement resource tagging strategy',
            'Right-size over-provisioned instances',
            'Create a cost optimization report'
          ]
        }
      },
      {
        id: 'lesson10',
        title: 'Capstone Project: Deploy Your First Application',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Full Stack Deployment', 'CI/CD Basics', 'Monitoring', 'Troubleshooting'],
        description: 'Put everything together by deploying a real application to the cloud.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Application Architecture Best Practices', 
            duration: '25 min',
            url: 'https://aws.amazon.com/architecture/well-architected/',
            description: 'AWS Well-Architected Framework covering operational excellence, security, and reliability'
          },
          { 
            type: 'template', 
            title: 'Deployment Checklist', 
            duration: '10 min',
            url: 'https://learn.microsoft.com/azure/architecture/checklist/dev-ops',
            description: 'Production deployment checklist covering testing, monitoring, and rollback procedures'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What are the key components of a 3-tier application architecture?',
              options: ['Frontend, Backend, Database', 'VM, Storage, Network', 'Dev, Test, Prod', 'Web, App, Data'],
              correctAnswer: 0
            },
            {
              question: 'What is CI/CD?',
              options: ['Cloud Infrastructure / Cloud Deployment', 'Continuous Integration / Continuous Deployment', 'Cost Integration / Cost Deployment', 'Central Integration / Central Deployment'],
              correctAnswer: 1
            },
            {
              question: 'Why is monitoring important?',
              options: ['To increase costs', 'To detect and resolve issues quickly', 'To slow down applications', 'To delete resources'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Full Application Deployment',
          duration: '120 min',
          tasks: [
            'Deploy a 3-tier web application (frontend, backend, database)',
            'Configure load balancing and auto-scaling',
            'Set up monitoring and logging',
            'Implement basic CI/CD pipeline',
            'Configure backups and disaster recovery',
            'Document the entire architecture',
            'Present your project for review'
          ]
        }
      }
    ]
  },

  'cloud-architect-pathway': {
    id: 'cloud-architect-pathway',
    title: 'Cloud Architect Professional Pathway',
    subtitle: 'Design Enterprise-Grade Cloud Solutions',
    description: 'Comprehensive training to become a certified cloud architect with hands-on architecture design.',
    price: 797,
    duration: '40 hours',
    level: 'Advanced',
    category: 'Architecture',
    color: '#0ea5e9',
    icon: '🏗️',
    skills: ['Solution Architecture', 'Multi-Cloud Design', 'High Availability', 'Disaster Recovery', 'Cost Optimization'],
    
    // Lab Environment Setup Instructions
    labSetup: {
      title: 'Getting Your Lab Environment Ready',
      description: 'You\'ll need access to cloud platforms to complete hands-on labs. Here are your options:',
      options: [
        {
          name: 'AWS Free Tier (Recommended for Beginners)',
          steps: [
            'Visit https://aws.amazon.com/free/',
            'Click "Create a Free Account"',
            'Provide email, password, and AWS account name',
            'Enter payment information (required but won\'t be charged for free tier usage)',
            'Verify your phone number',
            'Choose "Basic Support - Free" plan',
            'Sign in to AWS Console at https://console.aws.amazon.com/',
            '⚠️ Set up billing alerts to avoid unexpected charges: CloudWatch > Billing > Create Alarm'
          ],
          duration: '10-15 minutes',
          cost: 'Free for 12 months (with usage limits)',
          url: 'https://aws.amazon.com/free/'
        },
        {
          name: 'Azure Free Account',
          steps: [
            'Visit https://azure.microsoft.com/free/',
            'Click "Start free"',
            'Sign in with Microsoft account (or create one)',
            'Enter personal information and phone verification',
            'Add credit card for identity verification ($200 credit provided)',
            'Complete identity verification',
            'Access Azure Portal at https://portal.azure.com/',
            '💡 Tip: Use Azure Cost Management to track your spending'
          ],
          duration: '10-15 minutes',
          cost: '$200 credit for 30 days + 12 months of free services',
          url: 'https://azure.microsoft.com/free/'
        },
        {
          name: 'Google Cloud Free Tier',
          steps: [
            'Visit https://cloud.google.com/free/',
            'Click "Get started for free"',
            'Sign in with Google account',
            'Enter billing information ($300 credit for 90 days)',
            'Select country and accept terms',
            'Access GCP Console at https://console.cloud.google.com/',
            'Create your first project',
            '📊 Enable billing alerts in Billing > Budgets & Alerts'
          ],
          duration: '10 minutes',
          cost: '$300 credit for 90 days + Always Free tier',
          url: 'https://cloud.google.com/free/'
        },
        {
          name: 'Use Your Existing Cloud Account',
          steps: [
            '✅ If you already have AWS/Azure/GCP access through work or school, you can use that',
            'Ensure you have permissions to create: VMs, storage, networks, and basic services',
            'Check with your organization about cost allocation tags or budget limits',
            'Use a separate resource group/project for course labs to keep things organized',
            '🏷️ Tag all resources with "Course: Cloud Architect Pathway" for easy cleanup'
          ],
          duration: '5 minutes',
          cost: 'Depends on your organization\'s arrangement'
        },
        {
          name: 'Cloud Sandboxes & Practice Environments (No Credit Card Required)',
          steps: [
            '🧪 A Cloud Guru Sandbox: https://acloudguru.com/platform/cloud-sandbox-playgrounds',
            '🎮 AWS CloudQuest (gamified learning): https://aws.amazon.com/training/digital/aws-cloud-quest/',
            '🔬 Azure Learn Sandbox: Built into Microsoft Learn modules (https://learn.microsoft.com/training/azure/)',
            '🧑‍🔬 Qwiklabs for GCP: https://www.cloudskillsboost.google/ (free labs available)',
            '💻 Instruqt Interactive Labs: https://play.instruqt.com/public',
            'These are temporary environments (1-4 hours) - perfect for trying things without commitment'
          ],
          duration: 'Instant access',
          cost: 'Free (time-limited sessions)'
        }
      ],
      recommendations: [
        '🏢 Enterprise learners: This course requires production-level access for architecture labs',
        '💳 Recommended: Sign up for all three cloud platforms (AWS, Azure, GCP) for multi-cloud experience',
        '💰 Budget tip: Most architecture labs use minimal resources; set $50-100/month budgets',
        '🎓 Advanced users: Consider dedicated sandbox subscriptions for complex architecture designs',
        '⏰ Time management: Some labs require resources to run for hours to demonstrate patterns'
      ]
    },
    
    // Coding Prerequisites
    codingPrerequisites: {
      required: false,
      description: 'While not strictly required, scripting knowledge is helpful for automation and infrastructure as code.',
      languages: [
        {
          name: 'Python',
          why: 'Useful for cloud automation scripts and infrastructure management',
          skillLevel: 'Basic syntax and functions',
          learningResources: [
            { title: 'Python for Beginners - Microsoft', url: 'https://learn.microsoft.com/training/paths/beginner-python/', duration: '8 hours', type: 'free' },
            { title: 'Python Tutorial - W3Schools', url: 'https://www.w3schools.com/python/', duration: 'Self-paced', type: 'free' },
            { title: 'Learn Python - Codecademy', url: 'https://www.codecademy.com/learn/learn-python-3', duration: '25 hours', type: 'freemium' },
            { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', duration: 'Book + Videos', type: 'free' }
          ],
          quickStart: [
            'Install Python: https://www.python.org/downloads/',
            'Try it online: https://repl.it/languages/python3',
            'Learn basics: variables, functions, loops, lists (2-3 hours)',
            'Practice: Write a script to calculate cloud costs'
          ]
        },
        {
          name: 'PowerShell',
          why: 'Essential for Azure administration and Windows automation',
          skillLevel: 'Basic cmdlets and scripting',
          learningResources: [
            { title: 'PowerShell 101 - Microsoft', url: 'https://learn.microsoft.com/powershell/scripting/learn/ps101/00-introduction', duration: '5 hours', type: 'free' },
            { title: 'PowerShell Tutorial - TutorialsPoint', url: 'https://www.tutorialspoint.com/powershell/index.htm', duration: 'Self-paced', type: 'free' },
            { title: 'Introduction to PowerShell - Pluralsight', url: 'https://www.pluralsight.com/courses/powershell-intro', duration: '3 hours', type: 'paid' },
            { title: 'Learn PowerShell in a Month of Lunches', url: 'https://www.manning.com/books/learn-powershell-in-a-month-of-lunches', duration: 'Book', type: 'paid' }
          ],
          quickStart: [
            'Already installed on Windows! Open "Windows PowerShell"',
            'Mac/Linux: Install PowerShell Core from https://github.com/PowerShell/PowerShell',
            'Learn basics: cmdlets (Get-, Set-, New-), variables, pipelines (2 hours)',
            'Practice: Get-AzVM, Get-Service, basic automation'
          ]
        },
        {
          name: 'Bash/Shell Scripting',
          why: 'Useful for Linux VMs, automation, and AWS CLI',
          skillLevel: 'Basic commands and scripts',
          learningResources: [
            { title: 'Bash Scripting Tutorial', url: 'https://linuxconfig.org/bash-scripting-tutorial', duration: '4 hours', type: 'free' },
            { title: 'Shell Scripting - Linux Journey', url: 'https://linuxjourney.com/lesson/the-shell', duration: 'Self-paced', type: 'free' },
            { title: 'Bash Guide for Beginners', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', duration: 'Reference', type: 'free' }
          ],
          quickStart: [
            'Mac/Linux: Already have it! Open Terminal',
            'Windows: Use Git Bash (https://gitforwindows.org/) or WSL',
            'Learn basics: ls, cd, grep, pipes, variables (1-2 hours)',
            'Practice: Write a script to backup files'
          ]
        }
      ],
      recommendation: '💡 As an architect, you\'ll read and review code more than write it. Focus on understanding patterns over syntax.'
    },
    
    // Certification Exam Preparation
    certifications: [
      { name: 'AWS Certified Solutions Architect - Professional', provider: 'AWS', code: 'SAP-C02' },
      { name: 'Microsoft Azure Solutions Architect Expert', provider: 'Microsoft', code: 'AZ-305' },
      { name: 'Google Professional Cloud Architect', provider: 'Google Cloud', code: 'PCA' }
    ],
    
    // Career Paths & Job Roles
    careerPaths: [
      { role: 'Cloud Solutions Architect', avgSalary: '$140,000 - $180,000', demand: 'Very High' },
      { role: 'Enterprise Architect', avgSalary: '$150,000 - $200,000', demand: 'High' },
      { role: 'Technical Architect', avgSalary: '$135,000 - $175,000', demand: 'Very High' },
      { role: 'Cloud Infrastructure Architect', avgSalary: '$130,000 - $170,000', demand: 'High' }
    ],
    
    // Detailed Syllabus
    syllabus: {
      overview: 'This advanced course transforms experienced cloud practitioners into certified cloud architects. You\'ll master enterprise architecture design patterns, multi-cloud strategies, and lead complex cloud transformation projects.',
      prerequisites: 'Cloud Fundamentals knowledge, 2+ years experience with cloud platforms, Basic networking and security understanding',
      outcomes: [
        'Design scalable, highly available enterprise architectures',
        'Lead cloud migration and transformation projects',
        'Optimize costs for large-scale cloud deployments',
        'Implement disaster recovery and business continuity plans',
        'Create architecture documentation and communicate with stakeholders',
        'Pass professional-level cloud architecture certifications'
      ],
      weekByWeek: [
        { week: 1, topics: ['Architecture Principles', 'Multi-Tier Design'], labs: 2 },
        { week: 2, topics: ['High Availability', 'Disaster Recovery'], labs: 2 },
        { week: 3, topics: ['Enterprise Identity', 'Network Architecture'], labs: 2 },
        { week: 4, topics: ['Data Architecture', 'Cloud Migration'], labs: 2 },
        { week: 5, topics: ['Cost Optimization', 'Governance'], labs: 2 },
        { week: 6, topics: ['Performance', 'Capstone Project'], labs: 2 }
      ]
    },
    
    // Downloadable Resources
    resources: [
      { title: 'Cloud Architecture Patterns Library (PDF)', type: 'pdf', size: '12 MB' },
      { title: 'Well-Architected Framework Checklists', type: 'pdf', size: '4 MB' },
      { title: 'Architecture Diagram Templates (Visio)', type: 'zip', size: '8 MB' },
      { title: 'Migration Strategy Playbook', type: 'pdf', size: '6 MB' },
      { title: 'Cost Optimization Calculator', type: 'xlsx', size: '2 MB' },
      { title: 'DR Planning Template', type: 'docx', size: '3 MB' },
      { title: 'Enterprise Architecture Case Studies', type: 'pdf', size: '15 MB' }
    ],
    
    lessons: [
      {
        id: 'lesson1',
        title: 'Cloud Architecture Principles',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/cKnuf-3fN9k',
        topics: ['Well-Architected Framework', 'Design Patterns', 'Trade-offs', 'Best Practices'],
        description: 'Master the fundamental principles of designing scalable cloud architectures.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'AWS Well-Architected Framework Guide', 
            duration: '30 min',
            url: 'https://aws.amazon.com/architecture/well-architected/',
            description: 'Complete guide to the five pillars: operational excellence, security, reliability, performance, cost optimization'
          },
          { 
            type: 'reading', 
            title: 'Azure Architecture Center Overview', 
            duration: '25 min',
            url: 'https://learn.microsoft.com/azure/architecture/framework/',
            description: 'Microsoft Azure Well-Architected Framework with design patterns and best practices'
          },
          { 
            type: 'case-study', 
            title: 'Netflix Architecture Analysis', 
            duration: '20 min',
            url: 'https://netflixtechblog.com/tagged/cloud',
            description: 'Netflix Tech Blog - learn how they architect for scale with AWS'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'Which pillar is NOT part of the AWS Well-Architected Framework?',
              options: ['Security', 'Performance Efficiency', 'Automation', 'Cost Optimization'],
              correctAnswer: 2
            },
            {
              question: 'What is the purpose of designing for failure?',
              options: ['To save costs', 'To build resilient systems that can recover automatically', 'To simplify architecture', 'To reduce complexity'],
              correctAnswer: 1
            },
            {
              question: 'What does "loose coupling" mean in architecture?',
              options: ['Services are tightly integrated', 'Components can operate independently with minimal dependencies', 'Everything is in one server', 'Direct database connections'],
              correctAnswer: 1
            },
            {
              question: 'What is the CAP theorem about?',
              options: ['Consistency, Availability, Partition tolerance trade-offs', 'Cost, Architecture, Performance', 'Cloud, Applications, Platforms', 'Compute, Analytics, Processing'],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Architecture Review Workshop',
          duration: '60 min',
          tasks: [
            'Review a sample architecture diagram for weaknesses',
            'Apply Well-Architected Framework pillars to assess design',
            'Identify single points of failure',
            'Propose improvements for scalability and resilience',
            'Document trade-offs in architectural decisions',
            'Create an improved architecture diagram'
          ]
        }
      },
      {
        id: 'lesson2',
        title: 'Multi-Tier Application Design',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Sfo8xaTVYyw',
        topics: ['3-Tier Architecture', 'Microservices', 'Serverless', 'Hybrid Approaches'],
        description: 'Design complex applications with multiple tiers and components.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Microservices Architecture Patterns', 
            duration: '35 min',
            url: 'https://microservices.io/patterns/index.html',
            description: 'Comprehensive catalog of microservices patterns from Martin Fowler\'s team'
          },
          { 
            type: 'video', 
            title: 'When to Use Serverless vs Containers', 
            duration: '20 min',
            url: 'https://www.youtube.com/watch?v=W_VV2Fx32_Y',
            description: 'AWS re:Invent talk comparing serverless and container architectures with real examples'
          },
          { 
            type: 'interactive', 
            title: 'Application Architecture Decision Tree', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/architecture/guide/technology-choices/compute-decision-tree',
            description: 'Interactive decision tree to help choose the right compute service'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'In a 3-tier architecture, what are the three main tiers?',
              options: ['Dev, Test, Prod', 'Presentation, Application, Data', 'Web, Cache, Database', 'Frontend, API, Backend'],
              correctAnswer: 1
            },
            {
              question: 'What is the main advantage of microservices over monolithic architecture?',
              options: ['Simpler to build', 'Independent scaling and deployment of services', 'Lower costs', 'Faster performance'],
              correctAnswer: 1
            },
            {
              question: 'When is serverless architecture most appropriate?',
              options: ['Long-running processes', 'Event-driven, short-duration tasks with variable load', 'Stateful applications', 'Real-time gaming'],
              correctAnswer: 1
            },
            {
              question: 'What is service decomposition?',
              options: ['Breaking down a monolith into smaller services', 'Deleting old services', 'Merging services', 'Service optimization'],
              correctAnswer: 0
            },
            {
              question: 'What is the "strangler pattern" in migration?',
              options: ['Stopping all services', 'Gradually replacing parts of a monolith with microservices', 'Deleting legacy code', 'Compressing services'],
              correctAnswer: 1
            }
          ],
          passingScore: 80
        },
        lab: {
          title: 'Design Multi-Tier E-Commerce Architecture',
          duration: '90 min',
          tasks: [
            'Analyze requirements for a high-traffic e-commerce platform',
            'Design presentation tier with load balancing and CDN',
            'Design application tier with microservices for cart, orders, payments',
            'Design data tier with appropriate database choices',
            'Add caching layer for performance',
            'Document service boundaries and communication patterns'
          ]
        }
      },
      {
        id: 'lesson3',
        title: 'High Availability & Fault Tolerance',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/xK6zkvWDqyc',
        topics: ['Redundancy', 'Auto-scaling', 'Load Balancing', 'Failover Strategies'],
        description: 'Build systems that stay online even when components fail.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'High Availability Design Patterns', 
            duration: '30 min',
            url: 'https://docs.aws.amazon.com/whitepapers/latest/real-time-communication-on-aws/high-availability-and-scalability-on-aws.html',
            description: 'AWS whitepaper on designing highly available and fault-tolerant systems'
          },
          { 
            type: 'case-study', 
            title: 'AWS Multi-AZ Architectures', 
            duration: '25 min',
            url: 'https://aws.amazon.com/solutions/case-studies/',
            description: 'Real-world case studies showing multi-AZ deployments and disaster recovery'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the difference between high availability and fault tolerance?',
              options: ['No difference', 'HA minimizes downtime, FT continues without interruption', 'FT is cheaper', 'HA is automatic'],
              correctAnswer: 1
            },
            {
              question: 'What is an Availability Zone?',
              options: ['A region', 'An isolated data center within a region', 'A server', 'A network'],
              correctAnswer: 1
            },
            {
              question: 'What does auto-scaling help achieve?',
              options: ['Lower costs only', 'Automatic adjustment of resources based on demand', 'Faster deployment', 'Better security'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Implement Multi-AZ High Availability',
          duration: '90 min',
          tasks: [
            'Deploy application across multiple availability zones',
            'Configure application load balancer with health checks',
            'Set up auto-scaling groups with scaling policies',
            'Simulate AZ failure and verify failover',
            'Monitor recovery time and traffic distribution'
          ]
        }
      },
      {
        id: 'lesson4',
        title: 'Disaster Recovery Planning',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/e41_1P0KaY4',
        topics: ['Backup Strategies', 'RTO & RPO', 'Multi-Region Design', 'Recovery Testing'],
        description: 'Create comprehensive disaster recovery plans for critical systems.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Disaster Recovery Strategies Guide', 
            duration: '30 min',
            url: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html',
            description: 'AWS whitepaper covering backup/restore, pilot light, warm standby, and multi-site strategies'
          },
          { 
            type: 'template', 
            title: 'DR Plan Template', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/reliability/disaster-recovery-overview',
            description: 'Azure disaster recovery planning guide with templates and RTO/RPO calculations'
          },
          { 
            type: 'case-study', 
            title: 'Real-World DR Scenarios', 
            duration: '20 min',
            url: 'https://aws.amazon.com/disaster-recovery/',
            description: 'Case studies of organizations recovering from disasters using cloud DR solutions'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What does RTO stand for?',
              options: ['Recovery Time Objective', 'Real Time Operation', 'Recovery Test Outcome', 'Restore Time Operation'],
              correctAnswer: 0
            },
            {
              question: 'What does RPO stand for?',
              options: ['Recovery Point Objective', 'Real Processing Overhead', 'Restore Point Operation', 'Recovery Process Objective'],
              correctAnswer: 0
            },
            {
              question: 'Which DR strategy provides the fastest recovery?',
              options: ['Backup and Restore', 'Pilot Light', 'Warm Standby', 'Multi-Site Active/Active'],
              correctAnswer: 3
            },
            {
              question: 'How often should DR plans be tested?',
              options: ['Never', 'Once a year', 'Regularly (quarterly or semi-annually)', 'Only after incidents'],
              correctAnswer: 2
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Design and Test DR Strategy',
          duration: '120 min',
          tasks: [
            'Define RTO and RPO requirements for a sample application',
            'Design backup strategy for databases and file storage',
            'Implement cross-region replication',
            'Create DR runbook with step-by-step procedures',
            'Simulate disaster and execute recovery',
            'Document lessons learned and recovery time achieved'
          ]
        }
      },
      {
        id: 'lesson5',
        title: 'Enterprise Identity & Access Management',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Q3B-96KcL58',
        topics: ['Active Directory', 'SSO', 'MFA', 'RBAC', 'Zero Trust'],
        description: 'Implement enterprise-grade identity and access management.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Zero Trust Architecture Guide', 
            duration: '30 min',
            url: 'https://www.nist.gov/publications/zero-trust-architecture',
            description: 'NIST official publication on Zero Trust architecture principles (SP 800-207)'
          },
          { 
            type: 'documentation', 
            title: 'Azure AD and AWS IAM Integration', 
            duration: '25 min',
            url: 'https://learn.microsoft.com/azure/active-directory/saas-apps/aws-single-sign-on-tutorial',
            description: 'Step-by-step guide to integrate Azure AD with AWS using SAML federation'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is Single Sign-On (SSO)?',
              options: ['Single server operation', 'One login for multiple applications', 'Single security option', 'One user per system'],
              correctAnswer: 1
            },
            {
              question: 'What is the principle of Zero Trust?',
              options: ['Trust everyone', 'Never trust, always verify', 'Trust internal networks', 'No authentication needed'],
              correctAnswer: 1
            },
            {
              question: 'What does RBAC stand for?',
              options: ['Role-Based Access Control', 'Rule-Based Access Control', 'Random Based Access Control', 'Resource Based Access Control'],
              correctAnswer: 0
            },
            {
              question: 'Why is MFA important?',
              options: ['It\'s faster', 'Adds additional layer of security beyond passwords', 'It\'s cheaper', 'It\'s optional'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Implement Enterprise IAM',
          duration: '90 min',
          tasks: [
            'Set up Azure AD or AWS IAM Identity Center',
            'Configure SSO for multiple cloud services',
            'Implement MFA for all users',
            'Create role-based access control policies',
            'Set up conditional access based on location and device',
            'Test access scenarios and verify least privilege'
          ]
        }
      },
      {
        id: 'lesson6',
        title: 'Network Architecture & Security',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/hiKPPy584Mg',
        topics: ['VPN', 'VPC Peering', 'Transit Gateway', 'Firewall Rules', 'Network Segmentation'],
        description: 'Design secure, efficient network architectures in the cloud.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Enterprise Network Design Best Practices', 
            duration: '35 min',
            url: 'https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/introduction.html',
            description: 'AWS whitepaper on VPC connectivity options including Transit Gateway and VPN'
          },
          { 
            type: 'diagram', 
            title: 'Hub-and-Spoke Network Patterns', 
            duration: '20 min',
            url: 'https://learn.microsoft.com/azure/architecture/reference-architectures/hybrid-networking/hub-spoke',
            description: 'Azure hub-spoke network topology with detailed architecture diagrams'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is VPC Peering?',
              options: ['Viewing VPCs', 'Connecting two VPCs to route traffic privately', 'VPC monitoring', 'VPC backup'],
              correctAnswer: 1
            },
            {
              question: 'What is the purpose of a Transit Gateway?',
              options: ['Store data', 'Centralized hub for connecting multiple VPCs and on-premises networks', 'Run applications', 'Backup gateway'],
              correctAnswer: 1
            },
            {
              question: 'What is network segmentation?',
              options: ['Dividing network into isolated segments for security', 'Making network faster', 'Network backup', 'Deleting networks'],
              correctAnswer: 0
            },
            {
              question: 'What is a site-to-site VPN used for?',
              options: ['User access', 'Securely connecting on-premises network to cloud', 'Public access', 'Storage'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Build Enterprise Network Architecture',
          duration: '120 min',
          tasks: [
            'Design hub-and-spoke network topology with Transit Gateway',
            'Implement VPC peering between production and shared services',
            'Configure network ACLs and security groups for segmentation',
            'Set up site-to-site VPN for hybrid connectivity',
            'Implement network firewall for traffic inspection',
            'Test connectivity and verify traffic routing'
          ]
        }
      },
      {
        id: 'lesson7',
        title: 'Data Architecture & Analytics',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/jOAHOSkWOrM',
        topics: ['Data Lakes', 'Warehousing', 'ETL Pipelines', 'Analytics Services'],
        description: 'Architect scalable data solutions for enterprise analytics.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Data Lake vs Data Warehouse Architecture', 
            duration: '30 min',
            url: 'https://aws.amazon.com/big-data/datalakes-and-analytics/',
            description: 'AWS guide on modern data architecture with lakes, warehouses, and analytics'
          },
          { 
            type: 'case-study', 
            title: 'Enterprise Data Platform Design', 
            duration: '25 min',
            url: 'https://learn.microsoft.com/azure/architecture/data-guide/',
            description: 'Azure data architecture guide with real-world reference architectures'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the main difference between a data lake and a data warehouse?',
              options: ['No difference', 'Data lake stores raw data, warehouse stores structured data', 'Data lake is smaller', 'Warehouse is newer'],
              correctAnswer: 1
            },
            {
              question: 'What does ETL stand for?',
              options: ['Extract, Transform, Load', 'Extract, Transfer, Load', 'Export, Transform, Load', 'Extract, Test, Load'],
              correctAnswer: 0
            },
            {
              question: 'Which storage format is most efficient for analytics?',
              options: ['CSV', 'JSON', 'Parquet or ORC (columnar formats)', 'XML'],
              correctAnswer: 2
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Design Enterprise Data Platform',
          duration: '120 min',
          tasks: [
            'Design data lake architecture for raw data ingestion',
            'Set up data warehouse for analytics workloads',
            'Implement ETL pipeline for data transformation',
            'Configure data catalog and governance',
            'Create sample analytics dashboard',
            'Document data flow and security controls'
          ]
        }
      },
      {
        id: 'lesson8',
        title: 'Cloud Migration Strategies',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Y33TviLMaek',
        topics: ['6 Rs of Migration', 'Assessment Tools', 'Migration Patterns', 'Cutover Planning'],
        description: 'Plan and execute successful cloud migration projects.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'AWS Migration Strategies (6 Rs)', 
            duration: '30 min',
            url: 'https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-readiness/migration-strategies.html',
            description: 'Official AWS guide to the 6 Rs: Rehost, Replatform, Repurchase, Refactor, Retire, Retain'
          },
          { 
            type: 'template', 
            title: 'Migration Project Plan Template', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/cloud-adoption-framework/migrate/',
            description: 'Azure Cloud Adoption Framework with migration templates and checklists'
          },
          { 
            type: 'case-study', 
            title: 'Large-Scale Migration Case Study', 
            duration: '25 min',
            url: 'https://aws.amazon.com/solutions/case-studies/enterprise-migration/',
            description: 'Real-world enterprise migration case studies with lessons learned'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What are the 6 Rs of cloud migration?',
              options: ['Rehost, Replatform, Repurchase, Refactor, Retire, Retain', 'Run, Review, Restore, Rebuild, Retire, Retain', 'Rehost, Review, Rebuild, Restore, Remove, Retain', 'Replace, Restore, Retire, Rebuild, Review, Retain'],
              correctAnswer: 0
            },
            {
              question: 'What is "lift and shift"?',
              options: ['Rehosting applications to cloud with minimal changes', 'Rebuilding applications', 'Retiring applications', 'Repurchasing software'],
              correctAnswer: 0
            },
            {
              question: 'When should you consider "retire" strategy?',
              options: ['For all applications', 'For critical applications', 'For applications no longer needed or used', 'For new applications'],
              correctAnswer: 2
            },
            {
              question: 'What is a migration wave?',
              options: ['A network protocol', 'A group of applications migrated together in a phase', 'A storage method', 'A security feature'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Plan Application Migration',
          duration: '120 min',
          tasks: [
            'Perform discovery and assessment of sample applications',
            'Categorize applications using the 6 Rs framework',
            'Create migration wave plan with dependencies',
            'Design network connectivity for migration',
            'Develop rollback plan for each wave',
            'Document risks and mitigation strategies'
          ]
        }
      },
      {
        id: 'lesson9',
        title: 'Cost Optimization at Scale',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/1Z4BfRj2FiU',
        topics: ['Reserved Instances', 'Spot Instances', 'Right-sizing', 'Cost Allocation'],
        description: 'Optimize cloud costs for large-scale deployments.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'FinOps Best Practices Guide', 
            duration: '25 min',
            url: 'https://www.finops.org/framework/',
            description: 'FinOps Foundation framework for cloud financial management and optimization'
          },
          { 
            type: 'calculator', 
            title: 'TCO Calculator Workshop', 
            duration: '20 min',
            url: 'https://aws.amazon.com/tco-calculator/',
            description: 'AWS Total Cost of Ownership calculator to compare cloud vs on-premises costs'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What can provide up to 72% discount for predictable workloads?',
              options: ['Spot Instances', 'Reserved Instances or Savings Plans', 'On-Demand', 'Free Tier'],
              correctAnswer: 1
            },
            {
              question: 'What is right-sizing?',
              options: ['Buying more resources', 'Matching resource sizes to actual usage', 'Deleting resources', 'Adding storage'],
              correctAnswer: 1
            },
            {
              question: 'What is FinOps?',
              options: ['Financial Operations - cloud cost management practice', 'Financing options', 'Final operations', 'File operations'],
              correctAnswer: 0
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Enterprise Cost Optimization',
          duration: '120 min',
          tasks: [
            'Analyze cost and usage reports for optimization opportunities',
            'Identify and eliminate idle resources',
            'Right-size over-provisioned instances',
            'Implement Reserved Instance or Savings Plan strategy',
            'Set up cost allocation tags and budgets',
            'Create executive cost optimization report'
          ]
        }
      },
      {
        id: 'lesson10',
        title: 'Governance & Compliance',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/Gw7qrTq-m50',
        topics: ['Policies', 'Compliance Frameworks', 'Auditing', 'Documentation'],
        description: 'Implement governance and meet compliance requirements.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Cloud Governance Framework Guide', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/azure/cloud-adoption-framework/govern/',
            description: 'Azure Cloud Adoption Framework governance methodology with policies and guardrails'
          },
          { 
            type: 'checklist', 
            title: 'Compliance Requirements Checklist', 
            duration: '15 min',
            url: 'https://aws.amazon.com/compliance/programs/',
            description: 'AWS compliance programs list covering HIPAA, PCI-DSS, SOC 2, and more'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is cloud governance?',
              options: ['Government cloud', 'Policies and controls for cloud resource management', 'Cloud security only', 'Cloud costs'],
              correctAnswer: 1
            },
            {
              question: 'What is the purpose of tagging policies?',
              options: ['Security', 'Resource organization and cost allocation', 'Performance', 'Backup'],
              correctAnswer: 1
            },
            {
              question: 'What is a Service Control Policy (SCP)?',
              options: ['A security group', 'Organization-level permission boundaries', 'A network policy', 'A backup policy'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Implement Cloud Governance',
          duration: '90 min',
          tasks: [
            'Set up organizational structure with accounts/subscriptions',
            'Implement Service Control Policies or Azure Policy',
            'Configure mandatory tagging policies',
            'Set up CloudTrail/Activity Log for audit trails',
            'Implement automated compliance checks',
            'Create governance dashboard and reporting'
          ]
        }
      },
      {
        id: 'lesson11',
        title: 'Performance Optimization',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/hSMSwnfYh00',
        topics: ['Caching', 'CDN', 'Database Optimization', 'Monitoring'],
        description: 'Optimize application performance in cloud environments.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Performance Optimization Patterns', 
            duration: '25 min',
            url: 'https://aws.amazon.com/architecture/performance-efficiency/',
            description: 'AWS performance efficiency pillar with optimization patterns and caching strategies'
          },
          { 
            type: 'case-study', 
            title: 'High-Performance Architecture Examples', 
            duration: '20 min',
            url: 'https://learn.microsoft.com/azure/architecture/framework/scalability/performance-efficiency',
            description: 'Azure performance architecture examples with CDN, caching, and database optimization'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a CDN used for?',
              options: ['Storage', 'Delivering content from edge locations closer to users', 'Computing', 'Security'],
              correctAnswer: 1
            },
            {
              question: 'What type of caching reduces database load?',
              options: ['Browser caching', 'In-memory caching (Redis, Memcached)', 'Disk caching', 'No caching'],
              correctAnswer: 1
            },
            {
              question: 'What is database read replica used for?',
              options: ['Backup', 'Offloading read traffic from primary database', 'Increasing storage', 'Security'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Performance Optimization Workshop',
          duration: '120 min',
          tasks: [
            'Implement CDN for static content delivery',
            'Set up Redis cache for frequently accessed data',
            'Configure database read replicas',
            'Implement query optimization and indexing',
            'Set up performance monitoring and alerting',
            'Conduct load testing and measure improvements'
          ]
        }
      },
      {
        id: 'lesson12',
        title: 'Capstone: Enterprise Architecture Design',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Requirements Gathering', 'Solution Design', 'Documentation', 'Presentation'],
        description: 'Design a complete enterprise cloud architecture from scratch.',
        learningMaterials: [
          { 
            type: 'template', 
            title: 'Architecture Design Document Template', 
            duration: '20 min',
            url: 'https://c4model.com/',
            description: 'C4 model for software architecture documentation with templates and examples'
          },
          { 
            type: 'checklist', 
            title: 'Architecture Review Checklist', 
            duration: '15 min',
            url: 'https://aws.amazon.com/architecture/well-architected/review/',
            description: 'AWS Well-Architected Tool for conducting architecture reviews'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What should be the first step in architecture design?',
              options: ['Choose cloud provider', 'Understand requirements and constraints', 'Draw diagrams', 'Estimate costs'],
              correctAnswer: 1
            },
            {
              question: 'What is an architecture decision record (ADR)?',
              options: ['A diagram', 'Documentation of key decisions and rationale', 'A cost report', 'A security scan'],
              correctAnswer: 1
            },
            {
              question: 'Why is architecture documentation important?',
              options: ['It\'s optional', 'Enables communication, maintenance, and knowledge transfer', 'Just for compliance', 'Only for audits'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Complete Enterprise Architecture Project',
          duration: '180 min',
          tasks: [
            'Analyze enterprise requirements and constraints',
            'Design multi-tier, multi-region architecture',
            'Create detailed architecture diagrams',
            'Document all design decisions and trade-offs',
            'Calculate cost estimates and TCO',
            'Present architecture to stakeholders',
            'Address review feedback and iterate'
          ]
        }
      }
    ]
  },

  'cloud-security-engineer': {
    id: 'cloud-security-engineer',
    title: 'Cloud Security Engineer Track',
    subtitle: 'Secure the Cloud, Protect the Future',
    description: 'Master cloud security best practices, compliance frameworks, and threat mitigation strategies.',
    price: 697,
    duration: '35 hours',
    level: 'Intermediate',
    category: 'Security',
    color: '#ef4444',
    icon: '🔐',
    skills: ['Cloud Security', 'Threat Detection', 'Compliance', 'Incident Response', 'Zero Trust'],
    
    // Lab Environment Setup Instructions
    labSetup: {
      title: 'Getting Your Lab Environment Ready',
      description: 'You\'ll need access to cloud platforms to complete hands-on labs. Here are your options:',
      options: [
        {
          name: 'AWS Free Tier (Recommended for Beginners)',
          steps: [
            'Visit https://aws.amazon.com/free/',
            'Click "Create a Free Account"',
            'Provide email, password, and AWS account name',
            'Enter payment information (required but won\'t be charged for free tier usage)',
            'Verify your phone number',
            'Choose "Basic Support - Free" plan',
            'Sign in to AWS Console at https://console.aws.amazon.com/',
            '⚠️ Set up billing alerts to avoid unexpected charges: CloudWatch > Billing > Create Alarm'
          ],
          duration: '10-15 minutes',
          cost: 'Free for 12 months (with usage limits)',
          url: 'https://aws.amazon.com/free/'
        },
        {
          name: 'Azure Free Account',
          steps: [
            'Visit https://azure.microsoft.com/free/',
            'Click "Start free"',
            'Sign in with Microsoft account (or create one)',
            'Enter personal information and phone verification',
            'Add credit card for identity verification ($200 credit provided)',
            'Complete identity verification',
            'Access Azure Portal at https://portal.azure.com/',
            '💡 Tip: Use Azure Cost Management to track your spending'
          ],
          duration: '10-15 minutes',
          cost: '$200 credit for 30 days + 12 months of free services',
          url: 'https://azure.microsoft.com/free/'
        },
        {
          name: 'Google Cloud Free Tier',
          steps: [
            'Visit https://cloud.google.com/free/',
            'Click "Get started for free"',
            'Sign in with Google account',
            'Enter billing information ($300 credit for 90 days)',
            'Select country and accept terms',
            'Access GCP Console at https://console.cloud.google.com/',
            'Create your first project',
            '📊 Enable billing alerts in Billing > Budgets & Alerts'
          ],
          duration: '10 minutes',
          cost: '$300 credit for 90 days + Always Free tier',
          url: 'https://cloud.google.com/free/'
        },
        {
          name: 'Use Your Existing Cloud Account',
          steps: [
            '✅ If you already have AWS/Azure/GCP access through work or school, you can use that',
            'Ensure you have permissions to create: VMs, storage, networks, and basic services',
            'Check with your organization about cost allocation tags or budget limits',
            'Use a separate resource group/project for course labs to keep things organized',
            '🏷️ Tag all resources with "Course: Cloud Security Engineer" for easy cleanup'
          ],
          duration: '5 minutes',
          cost: 'Depends on your organization\'s arrangement'
        },
        {
          name: 'Cloud Sandboxes & Practice Environments (No Credit Card Required)',
          steps: [
            '🧪 A Cloud Guru Sandbox: https://acloudguru.com/platform/cloud-sandbox-playgrounds',
            '🎮 AWS CloudQuest (gamified learning): https://aws.amazon.com/training/digital/aws-cloud-quest/',
            '🔬 Azure Learn Sandbox: Built into Microsoft Learn modules (https://learn.microsoft.com/training/azure/)',
            '🧑‍🔬 Qwiklabs for GCP: https://www.cloudskillsboost.google/ (free labs available)',
            '💻 Instruqt Interactive Labs: https://play.instruqt.com/public',
            'These are temporary environments (1-4 hours) - perfect for trying things without commitment'
          ],
          duration: 'Instant access',
          cost: 'Free (time-limited sessions)'
        }
      ],
      recommendations: [
        '🔒 Security learners: Use dedicated test accounts - NEVER practice on production systems',
        '💳 Recommended: Create isolated AWS/Azure/GCP accounts specifically for security testing',
        '🛡️ Important: Some security tools (scanners, monitoring) may incur costs - set alerts',
        '🎯 Pro tip: Use AWS Security Hub, Azure Defender free trials for advanced labs',
        '⚠️ Ethics: Only perform security tests on your own resources - unauthorized testing is illegal'
      ]
    },
    
    // Coding Prerequisites
    codingPrerequisites: {
      required: true,
      description: 'Security automation, threat detection scripts, and compliance tools require programming skills.',
      languages: [
        {
          name: 'Python',
          why: 'Essential for security automation, threat detection scripts, and working with security APIs',
          skillLevel: 'Intermediate - functions, APIs, file handling',
          learningResources: [
            { title: 'Python for Beginners - Microsoft', url: 'https://learn.microsoft.com/training/paths/beginner-python/', duration: '8 hours', type: 'free' },
            { title: 'Python Tutorial - W3Schools', url: 'https://www.w3schools.com/python/', duration: 'Self-paced', type: 'free' },
            { title: 'Learn Python - Codecademy', url: 'https://www.codecademy.com/learn/learn-python-3', duration: '25 hours', type: 'freemium' },
            { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', duration: 'Book + Videos', type: 'free' }
          ],
          quickStart: [
            'Install Python: https://www.python.org/downloads/',
            'Try it online: https://repl.it/languages/python3',
            'Learn basics: variables, functions, loops, lists (2-3 hours)',
            'Practice: Write a script to parse security logs'
          ]
        },
        {
          name: 'PowerShell',
          why: 'Critical for Azure security automation, security auditing, and compliance checks',
          skillLevel: 'Intermediate - scripting, Azure cmdlets',
          learningResources: [
            { title: 'PowerShell 101 - Microsoft', url: 'https://learn.microsoft.com/powershell/scripting/learn/ps101/00-introduction', duration: '5 hours', type: 'free' },
            { title: 'PowerShell Tutorial - TutorialsPoint', url: 'https://www.tutorialspoint.com/powershell/index.htm', duration: 'Self-paced', type: 'free' },
            { title: 'Introduction to PowerShell - Pluralsight', url: 'https://www.pluralsight.com/courses/powershell-intro', duration: '3 hours', type: 'paid' },
            { title: 'Learn PowerShell in a Month of Lunches', url: 'https://www.manning.com/books/learn-powershell-in-a-month-of-lunches', duration: 'Book', type: 'paid' }
          ],
          quickStart: [
            'Already installed on Windows! Open "Windows PowerShell"',
            'Mac/Linux: Install PowerShell Core from https://github.com/PowerShell/PowerShell',
            'Learn basics: cmdlets (Get-, Set-, New-), variables, pipelines (2 hours)',
            'Practice: Get-AzSecurityAlert, Test-AzNetworkWatcher'
          ]
        },
        {
          name: 'Bash/Shell Scripting',
          why: 'Essential for Linux security hardening, log analysis, and incident response',
          skillLevel: 'Intermediate - scripting, regex, awk/sed',
          learningResources: [
            { title: 'Bash Scripting Tutorial', url: 'https://linuxconfig.org/bash-scripting-tutorial', duration: '4 hours', type: 'free' },
            { title: 'Shell Scripting - Linux Journey', url: 'https://linuxjourney.com/lesson/the-shell', duration: 'Self-paced', type: 'free' },
            { title: 'Bash Guide for Beginners', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', duration: 'Reference', type: 'free' }
          ],
          quickStart: [
            'Mac/Linux: Already have it! Open Terminal',
            'Windows: Use Git Bash (https://gitforwindows.org/) or WSL',
            'Learn basics: ls, cd, grep, pipes, variables (1-2 hours)',
            'Practice: Parse logs with grep, awk, and regex'
          ]
        }
      ],
      recommendation: '🔒 Security automation is a core skill. Dedicate 2-3 weeks to Python fundamentals before starting this course.'
    },
    
    // Certification Exam Preparation
    certifications: [
      { name: 'AWS Certified Security - Specialty', provider: 'AWS', code: 'SCS-C02' },
      { name: 'Microsoft Azure Security Engineer Associate', provider: 'Microsoft', code: 'AZ-500' },
      { name: 'Certified Cloud Security Professional', provider: '(ISC)²', code: 'CCSP' }
    ],
    
    // Career Paths & Job Roles
    careerPaths: [
      { role: 'Cloud Security Engineer', avgSalary: '$110,000 - $150,000', demand: 'Very High' },
      { role: 'Cloud Security Architect', avgSalary: '$130,000 - $170,000', demand: 'Very High' },
      { role: 'Security Operations Analyst', avgSalary: '$90,000 - $120,000', demand: 'High' },
      { role: 'Compliance and Governance Specialist', avgSalary: '$95,000 - $130,000', demand: 'High' }
    ],
    
    // Detailed Syllabus
    syllabus: {
      overview: 'This comprehensive security course equips you with the skills to protect cloud infrastructure against modern threats. Learn threat detection, compliance, incident response, and implement defense-in-depth strategies across multiple cloud platforms.',
      prerequisites: 'Cloud Fundamentals knowledge, Basic networking understanding, Familiarity with at least one cloud platform',
      outcomes: [
        'Implement comprehensive cloud security controls and policies',
        'Detect and respond to security threats in real-time',
        'Ensure compliance with industry regulations and standards',
        'Secure containerized and serverless applications',
        'Design and implement Zero Trust architectures',
        'Pass cloud security certification exams'
      ],
      weekByWeek: [
        { week: 1, topics: ['Security Fundamentals', 'IAM Deep Dive'], labs: 2 },
        { week: 2, topics: ['Data Protection', 'Network Security'], labs: 2 },
        { week: 3, topics: ['Threat Detection', 'Compliance'], labs: 2 },
        { week: 4, topics: ['Container Security', 'Serverless Security'], labs: 2 },
        { week: 5, topics: ['Incident Response', 'Capstone Project'], labs: 2 }
      ]
    },
    
    // Downloadable Resources
    resources: [
      { title: 'Cloud Security Best Practices Guide (PDF)', type: 'pdf', size: '8 MB' },
      { title: 'Security Compliance Checklist (HIPAA, PCI-DSS, SOC 2)', type: 'pdf', size: '4 MB' },
      { title: 'Incident Response Playbook', type: 'pdf', size: '6 MB' },
      { title: 'Security Monitoring Query Library', type: 'txt', size: '1 MB' },
      { title: 'Zero Trust Architecture Whitepaper', type: 'pdf', size: '5 MB' },
      { title: 'Container Security Scanning Scripts', type: 'zip', size: '3 MB' },
      { title: 'Security Audit Tools and Templates', type: 'zip', size: '12 MB' }
    ],
    
    lessons: [
      {
        id: 'lesson1',
        title: 'Cloud Security Fundamentals',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/dxDg-aGh0Nc',
        topics: ['Shared Responsibility Model', 'Security Principles', 'Threat Landscape'],
        description: 'Understand the foundations of cloud security and common threats.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Shared Responsibility Model Explained', 
            duration: '20 min',
            url: 'https://aws.amazon.com/compliance/shared-responsibility-model/',
            description: 'Official AWS documentation on security responsibilities in the cloud'
          },
          { 
            type: 'video', 
            title: 'Cloud Threat Landscape Overview', 
            duration: '25 min',
            url: 'https://www.youtube.com/watch?v=dxDg-aGh0Nc',
            description: 'AWS re:Invent security talk covering current cloud security threats and defenses'
          },
          { 
            type: 'infographic', 
            title: 'Security Principles Visual Guide', 
            duration: '10 min',
            url: 'https://www.cisa.gov/sites/default/files/publications/cloud-security-basics.pdf',
            description: 'CISA cloud security basics with visual representations of defense-in-depth'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'In the shared responsibility model, who is responsible for securing the underlying infrastructure?',
              options: ['Customer', 'Cloud Provider', 'Both equally', 'Third-party security vendors'],
              correctAnswer: 1
            },
            {
              question: 'What is defense-in-depth?',
              options: ['Single layer security', 'Multiple layers of security controls', 'Deep packet inspection', 'Security training'],
              correctAnswer: 1
            },
            {
              question: 'What is the CIA triad in security?',
              options: ['Cloud, Infrastructure, Application', 'Confidentiality, Integrity, Availability', 'Computing, Internet, Applications', 'Cost, Investment, Assets'],
              correctAnswer: 1
            },
            {
              question: 'What is a common cloud-specific threat?',
              options: ['Physical theft', 'Misconfigured storage buckets exposing data', 'Power outages', 'Hardware failures'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Security Baseline Assessment',
          duration: '60 min',
          tasks: [
            'Review shared responsibility model for your cloud provider',
            'Identify security controls managed by provider vs customer',
            'Perform initial security assessment of sample cloud account',
            'Document current security posture',
            'Identify top 5 security risks',
            'Create remediation priority list'
          ]
        }
      },
      {
        id: 'lesson2',
        title: 'Identity & Access Management Deep Dive',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Ul6FW4UANGc',
        topics: ['IAM Policies', 'Least Privilege', 'Service Accounts', 'Federation'],
        description: 'Master IAM concepts and implement secure access controls.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'IAM Best Practices Guide', 
            duration: '30 min',
            url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
            description: 'AWS IAM security best practices including least privilege and MFA implementation'
          },
          { 
            type: 'documentation', 
            title: 'Policy Syntax and Examples', 
            duration: '25 min',
            url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html',
            description: 'Complete IAM policy language reference with examples and troubleshooting'
          },
          { 
            type: 'tutorial', 
            title: 'Implementing Least Privilege', 
            duration: '20 min',
            url: 'https://learn.microsoft.com/azure/role-based-access-control/best-practices',
            description: 'Microsoft Learn module on implementing least privilege with Azure RBAC'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the principle of least privilege?',
              options: ['Give everyone admin access', 'Grant minimum permissions required for a task', 'No permissions for anyone', 'Full permissions with monitoring'],
              correctAnswer: 1
            },
            {
              question: 'What is a service account used for?',
              options: ['Human users', 'Applications and services to authenticate', 'Customer support', 'Billing'],
              correctAnswer: 1
            },
            {
              question: 'What is federated identity?',
              options: ['Multiple passwords', 'Using external identity providers for authentication', 'No authentication', 'Password sharing'],
              correctAnswer: 1
            },
            {
              question: 'What is the purpose of IAM roles?',
              options: ['Store data', 'Define permissions that can be assumed by users or services', 'Network routing', 'Monitoring'],
              correctAnswer: 1
            },
            {
              question: 'Why should root/admin accounts have MFA?',
              options: ['It\'s optional', 'Provides critical additional security layer for privileged access', 'It\'s faster', 'For compliance only'],
              correctAnswer: 1
            }
          ],
          passingScore: 80
        },
        lab: {
          title: 'Implement Secure IAM',
          duration: '90 min',
          tasks: [
            'Audit existing IAM users and permissions',
            'Remove overly permissive policies',
            'Implement role-based access control',
            'Create service accounts with minimal permissions',
            'Enable MFA for all privileged accounts',
            'Set up access logging and monitoring'
          ]
        }
      },
      {
        id: 'lesson3',
        title: 'Data Protection & Encryption',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/zfcyJqfp1lY',
        topics: ['Encryption at Rest', 'Encryption in Transit', 'Key Management', 'Tokenization'],
        description: 'Protect sensitive data with encryption and key management.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Encryption Best Practices', 
            duration: '30 min',
            url: 'https://docs.aws.amazon.com/whitepapers/latest/logical-separation/encrypting-data-at-rest-and--in-transit.html',
            description: 'AWS whitepaper on encryption at rest and in transit with implementation patterns'
          },
          { 
            type: 'documentation', 
            title: 'Key Management Service (KMS) Guide', 
            duration: '25 min',
            url: 'https://docs.aws.amazon.com/kms/latest/developerguide/overview.html',
            description: 'Complete guide to AWS KMS including key policies, rotation, and envelope encryption'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is encryption at rest?',
              options: ['Encrypting data while stored', 'Encrypting data while transmitted', 'No encryption', 'Encrypting backups only'],
              correctAnswer: 0
            },
            {
              question: 'What protocol ensures encryption in transit?',
              options: ['HTTP', 'TLS/SSL (HTTPS)', 'FTP', 'Telnet'],
              correctAnswer: 1
            },
            {
              question: 'What is a Hardware Security Module (HSM)?',
              options: ['Software encryption', 'Physical device for secure key storage and crypto operations', 'Network firewall', 'Antivirus'],
              correctAnswer: 1
            },
            {
              question: 'Why is key rotation important?',
              options: ['It\'s not important', 'Limits impact of key compromise and meets compliance requirements', 'Saves money', 'Faster performance'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Implement Data Encryption',
          duration: '90 min',
          tasks: [
            'Enable encryption at rest for storage services',
            'Configure TLS/SSL for all applications',
            'Set up Key Management Service (KMS)',
            'Implement automatic key rotation',
            'Encrypt database with customer-managed keys',
            'Test encryption and verify compliance'
          ]
        }
      },
      {
        id: 'lesson4',
        title: 'Network Security in the Cloud',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/2zR6PtX7HPg',
        topics: ['Firewalls', 'Security Groups', 'Network Monitoring', 'DDoS Protection'],
        description: 'Secure cloud networks and prevent unauthorized access.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Cloud Network Security Architecture', 
            duration: '30 min',
            url: 'https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/welcome.html',
            description: 'AWS DDoS resilience best practices and network security architecture'
          },
          { 
            type: 'diagram', 
            title: 'Network Security Zones', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/architecture/framework/security/design-network-segmentation',
            description: 'Azure network segmentation and security zone architecture diagrams'
          },
          { 
            type: 'case-study', 
            title: 'DDoS Attack Mitigation', 
            duration: '20 min',
            url: 'https://aws.amazon.com/shield/features/',
            description: 'AWS Shield features and real-world DDoS attack mitigation case studies'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a Security Group?',
              options: ['A user group', 'Virtual firewall controlling inbound/outbound traffic', 'A security team', 'A monitoring tool'],
              correctAnswer: 1
            },
            {
              question: 'What is the principle of "deny by default"?',
              options: ['Allow all traffic', 'Block all traffic unless explicitly allowed', 'Random blocking', 'No firewall rules'],
              correctAnswer: 1
            },
            {
              question: 'What is a DDoS attack?',
              options: ['Data theft', 'Distributed Denial of Service - overwhelming system with traffic', 'Database deletion', 'Password attack'],
              correctAnswer: 1
            },
            {
              question: 'What is network segmentation?',
              options: ['Deleting networks', 'Dividing network into isolated segments to limit blast radius', 'Merging networks', 'Network backup'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Secure Network Architecture',
          duration: '90 min',
          tasks: [
            'Design network with public and private subnets',
            'Configure security groups with least privilege',
            'Implement network ACLs for additional protection',
            'Set up Web Application Firewall (WAF)',
            'Enable DDoS protection',
            'Configure VPC Flow Logs for monitoring'
          ]
        }
      },
      {
        id: 'lesson5',
        title: 'Threat Detection & Monitoring',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/VJXfPDKNdL8',
        topics: ['SIEM', 'Log Analysis', 'Anomaly Detection', 'Security Dashboards'],
        description: 'Detect and respond to security threats in real-time.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'SIEM Best Practices', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/azure/sentinel/best-practices',
            description: 'Microsoft Sentinel (SIEM) best practices for threat detection and hunting'
          },
          { 
            type: 'tutorial', 
            title: 'Writing Security Queries', 
            duration: '25 min',
            url: 'https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html',
            description: 'AWS GuardDuty findings guide with examples of threat detection queries'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What does SIEM stand for?',
              options: ['Security Information and Event Management', 'Security Internet and Email Monitoring', 'System Integration and Event Management', 'Security Incident and Error Management'],
              correctAnswer: 0
            },
            {
              question: 'What is anomaly detection?',
              options: ['Finding bugs', 'Identifying unusual patterns that may indicate security threats', 'Deleting logs', 'Updating software'],
              correctAnswer: 1
            },
            {
              question: 'Why is log aggregation important?',
              options: ['It\'s not important', 'Centralizes logs from multiple sources for analysis', 'Deletes old logs', 'Encrypts logs'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Implement Threat Detection',
          duration: '120 min',
          tasks: [
            'Set up centralized logging for all resources',
            'Configure SIEM or cloud-native security monitoring',
            'Create detection rules for common threats',
            'Implement automated alerting',
            'Build security dashboard with key metrics',
            'Simulate attack and verify detection'
          ]
        }
      },
      {
        id: 'lesson6',
        title: 'Compliance & Governance',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/Gw7qrTq-m50',
        topics: ['HIPAA', 'PCI-DSS', 'SOC 2', 'GDPR', 'Audit Trails'],
        description: 'Ensure compliance with industry regulations and standards.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Compliance Frameworks Overview', 
            duration: '30 min',
            url: 'https://aws.amazon.com/compliance/programs/',
            description: 'Complete overview of compliance programs: HIPAA, PCI-DSS, SOC 2, GDPR, and more'
          },
          { 
            type: 'checklist', 
            title: 'GDPR Compliance Checklist', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/compliance/regulatory/gdpr',
            description: 'Microsoft GDPR compliance checklist with practical implementation steps'
          },
          { 
            type: 'template', 
            title: 'Audit Documentation Templates', 
            duration: '10 min',
            url: 'https://www.aicpa-cima.com/soc-for-cybersecurity',
            description: 'AICPA SOC 2 compliance resources and documentation templates'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is HIPAA?',
              options: ['A cloud service', 'Health Insurance Portability and Accountability Act - protects health data', 'A database', 'A programming language'],
              correctAnswer: 1
            },
            {
              question: 'What is PCI-DSS primarily concerned with?',
              options: ['Health data', 'Credit card and payment data security', 'Email security', 'Cloud costs'],
              correctAnswer: 1
            },
            {
              question: 'What is GDPR?',
              options: ['US law', 'EU regulation for data protection and privacy', 'Cloud provider', 'Security tool'],
              correctAnswer: 1
            },
            {
              question: 'Why are audit trails important?',
              options: ['They\'re optional', 'Provide accountability and evidence of compliance', 'Slow down systems', 'Cost money'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Implement Compliance Controls',
          duration: '120 min',
          tasks: [
            'Assess compliance requirements for your industry',
            'Enable audit logging for all services',
            'Implement data classification and tagging',
            'Configure compliance monitoring and reporting',
            'Create compliance documentation',
            'Conduct mock compliance audit'
          ]
        }
      },
      {
        id: 'lesson7',
        title: 'Container & Kubernetes Security',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/RjXkRNHqM04',
        topics: ['Image Scanning', 'Runtime Security', 'Pod Security', 'Network Policies'],
        description: 'Secure containerized applications and Kubernetes clusters.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Container Security Best Practices', 
            duration: '30 min',
            url: 'https://kubernetes.io/docs/concepts/security/',
            description: 'Official Kubernetes security best practices including pod security and RBAC'
          },
          { 
            type: 'tutorial', 
            title: 'Kubernetes Security Hardening', 
            duration: '25 min',
            url: 'https://learn.microsoft.com/azure/aks/operator-best-practices-cluster-security',
            description: 'Azure AKS security best practices with hands-on configuration examples'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'Why is container image scanning important?',
              options: ['It\'s not important', 'Detects vulnerabilities in container images before deployment', 'Speeds up deployment', 'Reduces size'],
              correctAnswer: 1
            },
            {
              question: 'What is a Pod Security Policy?',
              options: ['Network rule', 'Controls security-sensitive aspects of pod specification', 'Storage policy', 'Backup policy'],
              correctAnswer: 1
            },
            {
              question: 'What is runtime security?',
              options: ['Development security', 'Monitoring and protecting containers while running', 'Build security', 'Testing security'],
              correctAnswer: 1
            },
            {
              question: 'Why should containers run as non-root users?',
              options: ['Performance', 'Limits damage if container is compromised', 'Required by law', 'Faster startup'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Secure Kubernetes Deployment',
          duration: '120 min',
          tasks: [
            'Scan container images for vulnerabilities',
            'Implement Pod Security Standards',
            'Configure Kubernetes RBAC',
            'Set up network policies for pod isolation',
            'Enable runtime security monitoring',
            'Audit cluster security configuration'
          ]
        }
      },
      {
        id: 'lesson8',
        title: 'Serverless Security',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/VqHjvhF5FtM',
        topics: ['Function Security', 'API Gateway', 'Secrets Management', 'Input Validation'],
        description: 'Implement security best practices for serverless architectures.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Serverless Security Best Practices', 
            duration: '25 min',
            url: 'https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html',
            description: 'AWS Lambda security best practices covering IAM, VPC, and secrets management'
          },
          { 
            type: 'case-study', 
            title: 'Serverless Security Incidents', 
            duration: '20 min',
            url: 'https://owasp.org/www-project-serverless-top-10/',
            description: 'OWASP Serverless Top 10 security risks with real-world incident examples'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a unique security consideration for serverless functions?',
              options: ['Physical security', 'Function timeout and execution permissions', 'Hardware failures', 'Power supply'],
              correctAnswer: 1
            },
            {
              question: 'How should secrets be managed in serverless?',
              options: ['Hardcode in functions', 'Use secret management services like AWS Secrets Manager', 'Store in code repository', 'Email them'],
              correctAnswer: 1
            },
            {
              question: 'Why is input validation critical in serverless?',
              options: ['It\'s not important', 'Functions are often exposed via APIs and vulnerable to injection attacks', 'Saves money', 'Faster execution'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Secure Serverless Application',
          duration: '90 min',
          tasks: [
            'Apply least privilege IAM to Lambda functions',
            'Implement API Gateway authentication and authorization',
            'Use Secrets Manager for database credentials',
            'Add input validation and sanitization',
            'Enable function logging and monitoring',
            'Scan function dependencies for vulnerabilities'
          ]
        }
      },
      {
        id: 'lesson9',
        title: 'Incident Response & Forensics',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/h6ZFz-HuV6o',
        topics: ['Incident Response Plan', 'Forensic Analysis', 'Post-Incident Review'],
        description: 'Respond effectively to security incidents and breaches.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Incident Response Framework', 
            duration: '30 min',
            url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf',
            description: 'NIST SP 800-61 Computer Security Incident Handling Guide - industry standard'
          },
          { 
            type: 'template', 
            title: 'Incident Response Runbook', 
            duration: '15 min',
            url: 'https://docs.aws.amazon.com/whitepapers/latest/aws-security-incident-response-guide/welcome.html',
            description: 'AWS Security Incident Response Guide with playbooks and runbook templates'
          },
          { 
            type: 'case-study', 
            title: 'Real-World Incident Analysis', 
            duration: '25 min',
            url: 'https://www.cisa.gov/cybersecurity-advisories',
            description: 'CISA cybersecurity advisories with real-world incident analysis and response'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What are the phases of incident response?',
              options: ['Only detection', 'Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned', 'Just recovery', 'Investigation only'],
              correctAnswer: 1
            },
            {
              question: 'What is the purpose of containment?',
              options: ['Delete everything', 'Limit spread of incident while preserving evidence', 'Ignore the incident', 'Restart systems'],
              correctAnswer: 1
            },
            {
              question: 'Why are post-incident reviews important?',
              options: ['They\'re optional', 'Learn from incidents and improve security posture', 'Blame people', 'Waste time'],
              correctAnswer: 1
            },
            {
              question: 'What is digital forensics in cloud?',
              options: ['Deleting evidence', 'Collecting and analyzing evidence from cloud resources', 'Monitoring only', 'Backup'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Incident Response Exercise',
          duration: '150 min',
          tasks: [
            'Create incident response plan and runbook',
            'Set up incident response tooling',
            'Simulate security incident (compromised credentials)',
            'Execute containment and investigation',
            'Collect and analyze forensic evidence',
            'Conduct post-incident review and document lessons learned'
          ]
        }
      },
      {
        id: 'lesson10',
        title: 'Capstone: Security Audit Project',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Security Assessment', 'Remediation Planning', 'Report Writing'],
        description: 'Conduct a comprehensive security audit of a cloud environment.',
        learningMaterials: [
          { 
            type: 'template', 
            title: 'Security Audit Report Template', 
            duration: '15 min',
            url: 'https://www.cisecurity.org/controls',
            description: 'CIS Controls framework for comprehensive security audit coverage'
          },
          { 
            type: 'checklist', 
            title: 'Comprehensive Security Checklist', 
            duration: '20 min',
            url: 'https://www.cisecurity.org/benchmark/amazon_web_services',
            description: 'CIS Amazon Web Services Foundations Benchmark - detailed security checklist'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What should a security audit cover?',
              options: ['Only IAM', 'All aspects: IAM, network, data, logging, compliance, etc.', 'Just costs', 'Only backups'],
              correctAnswer: 1
            },
            {
              question: 'How should findings be prioritized?',
              options: ['Alphabetically', 'By risk level and business impact', 'Randomly', 'By cost'],
              correctAnswer: 1
            },
            {
              question: 'What should a security report include?',
              options: ['Only problems', 'Findings, risk assessment, and actionable recommendations', 'Just compliments', 'Technical jargon only'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Complete Security Audit',
          duration: '180 min',
          tasks: [
            'Conduct comprehensive security assessment',
            'Review IAM, network, data protection, and logging',
            'Test security controls and identify gaps',
            'Document all findings with evidence',
            'Prioritize findings by risk level',
            'Create detailed remediation plan',
            'Write executive summary and technical report'
          ]
        }
      }
    ]
  },

  'devops-automation': {
    id: 'devops-automation',
    title: 'DevOps & Automation Mastery',
    subtitle: 'Build, Deploy, Automate Everything',
    description: 'Master CI/CD pipelines, Infrastructure as Code, containers, and automation tools.',
    price: 597,
    duration: '30 hours',
    level: 'Intermediate',
    category: 'DevOps',
    color: '#10b981',
    icon: '⚙️',
    skills: ['CI/CD', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins'],
    
    // Lab Environment Setup Instructions
    labSetup: {
      title: 'Getting Your Lab Environment Ready',
      description: 'You\'ll need access to cloud platforms to complete hands-on labs. Here are your options:',
      options: [
        {
          name: 'AWS Free Tier (Recommended for Beginners)',
          steps: [
            'Visit https://aws.amazon.com/free/',
            'Click "Create a Free Account"',
            'Provide email, password, and AWS account name',
            'Enter payment information (required but won\'t be charged for free tier usage)',
            'Verify your phone number',
            'Choose "Basic Support - Free" plan',
            'Sign in to AWS Console at https://console.aws.amazon.com/',
            '⚠️ Set up billing alerts to avoid unexpected charges: CloudWatch > Billing > Create Alarm'
          ],
          duration: '10-15 minutes',
          cost: 'Free for 12 months (with usage limits)',
          url: 'https://aws.amazon.com/free/'
        },
        {
          name: 'Azure Free Account',
          steps: [
            'Visit https://azure.microsoft.com/free/',
            'Click "Start free"',
            'Sign in with Microsoft account (or create one)',
            'Enter personal information and phone verification',
            'Add credit card for identity verification ($200 credit provided)',
            'Complete identity verification',
            'Access Azure Portal at https://portal.azure.com/',
            '💡 Tip: Use Azure Cost Management to track your spending'
          ],
          duration: '10-15 minutes',
          cost: '$200 credit for 30 days + 12 months of free services',
          url: 'https://azure.microsoft.com/free/'
        },
        {
          name: 'Google Cloud Free Tier',
          steps: [
            'Visit https://cloud.google.com/free/',
            'Click "Get started for free"',
            'Sign in with Google account',
            'Enter billing information ($300 credit for 90 days)',
            'Select country and accept terms',
            'Access GCP Console at https://console.cloud.google.com/',
            'Create your first project',
            '📊 Enable billing alerts in Billing > Budgets & Alerts'
          ],
          duration: '10 minutes',
          cost: '$300 credit for 90 days + Always Free tier',
          url: 'https://cloud.google.com/free/'
        },
        {
          name: 'Use Your Existing Cloud Account',
          steps: [
            '✅ If you already have AWS/Azure/GCP access through work or school, you can use that',
            'Ensure you have permissions to create: VMs, storage, networks, and basic services',
            'Check with your organization about cost allocation tags or budget limits',
            'Use a separate resource group/project for course labs to keep things organized',
            '🏷️ Tag all resources with "Course: DevOps Automation" for easy cleanup'
          ],
          duration: '5 minutes',
          cost: 'Depends on your organization\'s arrangement'
        },
        {
          name: 'Cloud Sandboxes & Practice Environments (No Credit Card Required)',
          steps: [
            '🧪 A Cloud Guru Sandbox: https://acloudguru.com/platform/cloud-sandbox-playgrounds',
            '🎮 AWS CloudQuest (gamified learning): https://aws.amazon.com/training/digital/aws-cloud-quest/',
            '🔬 Azure Learn Sandbox: Built into Microsoft Learn modules (https://learn.microsoft.com/training/azure/)',
            '🧑‍🔬 Qwiklabs for GCP: https://www.cloudskillsboost.google/ (free labs available)',
            '💻 Instruqt Interactive Labs: https://play.instruqt.com/public',
            'These are temporary environments (1-4 hours) - perfect for trying things without commitment'
          ],
          duration: 'Instant access',
          cost: 'Free (time-limited sessions)'
        }
      ],
      recommendations: [
        '⚙️ DevOps learners: You\'ll need CI/CD tools (GitHub Actions, Jenkins) - free tiers available',
        '💳 Recommended: AWS or Azure for Kubernetes clusters (costs ~$70-100/month if running 24/7)',
        '💡 Cost-saving tip: Destroy clusters after each lab session - recreate with Infrastructure as Code',
        '🐳 Docker: Free on your local machine - no cloud account needed for container basics',
        '🎯 Pro strategy: Use GitHub Actions free tier (2000 minutes/month) for CI/CD labs'
      ]
    },
    
    // Coding Prerequisites
    codingPrerequisites: {
      required: true,
      description: 'DevOps requires strong scripting skills for automation, CI/CD pipelines, and infrastructure as code.',
      languages: [
        {
          name: 'Python',
          why: 'Core language for automation scripts, infrastructure tools, and DevOps utilities',
          skillLevel: 'Intermediate - scripting, APIs, file handling',
          learningResources: [
            { title: 'Python for Beginners - Microsoft', url: 'https://learn.microsoft.com/training/paths/beginner-python/', duration: '8 hours', type: 'free' },
            { title: 'Python Tutorial - W3Schools', url: 'https://www.w3schools.com/python/', duration: 'Self-paced', type: 'free' },
            { title: 'Learn Python - Codecademy', url: 'https://www.codecademy.com/learn/learn-python-3', duration: '25 hours', type: 'freemium' },
            { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', duration: 'Book + Videos', type: 'free' }
          ],
          quickStart: [
            'Install Python: https://www.python.org/downloads/',
            'Try it online: https://repl.it/languages/python3',
            'Learn basics: variables, functions, loops, lists (2-3 hours)',
            'Practice: Write a deployment automation script'
          ]
        },
        {
          name: 'PowerShell',
          why: 'Essential for Azure DevOps, Windows automation, and cross-platform scripting',
          skillLevel: 'Intermediate - scripting, Azure cmdlets',
          learningResources: [
            { title: 'PowerShell 101 - Microsoft', url: 'https://learn.microsoft.com/powershell/scripting/learn/ps101/00-introduction', duration: '5 hours', type: 'free' },
            { title: 'PowerShell Tutorial - TutorialsPoint', url: 'https://www.tutorialspoint.com/powershell/index.htm', duration: 'Self-paced', type: 'free' },
            { title: 'Introduction to PowerShell - Pluralsight', url: 'https://www.pluralsight.com/courses/powershell-intro', duration: '3 hours', type: 'paid' },
            { title: 'Learn PowerShell in a Month of Lunches', url: 'https://www.manning.com/books/learn-powershell-in-a-month-of-lunches', duration: 'Book', type: 'paid' }
          ],
          quickStart: [
            'Already installed on Windows! Open "Windows PowerShell"',
            'Mac/Linux: Install PowerShell Core from https://github.com/PowerShell/PowerShell',
            'Learn basics: cmdlets (Get-, Set-, New-), variables, pipelines (2 hours)',
            'Practice: Deploy-AzWebApp, automation workflows'
          ]
        },
        {
          name: 'Bash/Shell Scripting',
          why: 'Critical for Linux automation, CI/CD pipelines, and container orchestration',
          skillLevel: 'Advanced - scripting, pipelines, automation',
          learningResources: [
            { title: 'Bash Scripting Tutorial', url: 'https://linuxconfig.org/bash-scripting-tutorial', duration: '4 hours', type: 'free' },
            { title: 'Shell Scripting - Linux Journey', url: 'https://linuxjourney.com/lesson/the-shell', duration: 'Self-paced', type: 'free' },
            { title: 'Bash Guide for Beginners', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', duration: 'Reference', type: 'free' }
          ],
          quickStart: [
            'Mac/Linux: Already have it! Open Terminal',
            'Windows: Use Git Bash (https://gitforwindows.org/) or WSL',
            'Learn basics: ls, cd, grep, pipes, variables (1-2 hours)',
            'Practice: Write CI/CD pipeline scripts'
          ]
        }
      ],
      recommendation: '⚙️ Strong scripting skills are ESSENTIAL. If you\'re new to coding, complete a Python basics course first.'
    },
    
    // Certification Exam Preparation
    certifications: [
      { name: 'AWS Certified DevOps Engineer - Professional', provider: 'AWS', code: 'DOP-C02' },
      { name: 'Azure DevOps Engineer Expert', provider: 'Microsoft', code: 'AZ-400' },
      { name: 'Certified Kubernetes Administrator', provider: 'CNCF', code: 'CKA' }
    ],
    
    // Career Paths & Job Roles
    careerPaths: [
      { role: 'DevOps Engineer', avgSalary: '$100,000 - $140,000', demand: 'Very High' },
      { role: 'Site Reliability Engineer (SRE)', avgSalary: '$120,000 - $160,000', demand: 'Very High' },
      { role: 'Platform Engineer', avgSalary: '$110,000 - $150,000', demand: 'High' },
      { role: 'CI/CD Specialist', avgSalary: '$95,000 - $130,000', demand: 'High' }
    ],
    
    // Detailed Syllabus
    syllabus: {
      overview: 'This comprehensive DevOps course teaches you to build automated CI/CD pipelines, manage infrastructure as code, orchestrate containers at scale, and implement modern DevOps practices that accelerate software delivery.',
      prerequisites: 'Basic Linux/command line knowledge, Familiarity with at least one programming language, Basic cloud computing understanding',
      outcomes: [
        'Build and maintain CI/CD pipelines for automated deployments',
        'Containerize applications with Docker and orchestrate with Kubernetes',
        'Manage infrastructure as code with Terraform',
        'Implement GitOps workflows and automation',
        'Monitor and troubleshoot production systems',
        'Pass DevOps certification exams'
      ],
      weekByWeek: [
        { week: 1, topics: ['DevOps Culture', 'Git & Version Control'], labs: 2 },
        { week: 2, topics: ['CI/CD Fundamentals', 'GitHub Actions'], labs: 2 },
        { week: 3, topics: ['Docker', 'Kubernetes Basics'], labs: 2 },
        { week: 4, topics: ['Kubernetes Advanced', 'Terraform IaC'], labs: 2 },
        { week: 5, topics: ['Configuration Management', 'Monitoring'], labs: 2 },
        { week: 6, topics: ['GitOps', 'Testing & Capstone'], labs: 2 }
      ]
    },
    
    // Downloadable Resources
    resources: [
      { title: 'DevOps Best Practices Guide (PDF)', type: 'pdf', size: '7 MB' },
      { title: 'CI/CD Pipeline Templates', type: 'zip', size: '5 MB' },
      { title: 'Dockerfile Examples Collection', type: 'zip', size: '3 MB' },
      { title: 'Kubernetes Cheat Sheet', type: 'pdf', size: '2 MB' },
      { title: 'Terraform Module Library', type: 'zip', size: '10 MB' },
      { title: 'Monitoring Dashboard Templates', type: 'json', size: '1 MB' },
      { title: 'DevOps Toolchain Comparison Guide', type: 'pdf', size: '4 MB' }
    ],
    
    lessons: [
      {
        id: 'lesson1',
        title: 'DevOps Culture & Principles',
        duration: '60 min',
        video: 'https://www.youtube.com/embed/UbtB4sMaaNM',
        topics: ['DevOps Philosophy', 'CALMS Framework', 'Team Collaboration'],
        description: 'Understand the culture and principles behind successful DevOps.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'The DevOps Handbook Principles', 
            duration: '25 min',
            url: 'https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/',
            description: 'The Three Ways principles from The DevOps Handbook by Gene Kim'
          },
          { 
            type: 'video', 
            title: 'DevOps Culture Transformation', 
            duration: '20 min',
            url: 'https://www.youtube.com/watch?v=UbtB4sMaaNM',
            description: 'Google Cloud Next talk on transforming engineering culture with DevOps'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What does CALMS stand for in DevOps?',
              options: ['Code, Automation, Linux, Monitoring, Security', 'Culture, Automation, Lean, Measurement, Sharing', 'Cloud, API, Load, Metrics, Storage', 'Continuous, Agile, Learning, Management, Systems'],
              correctAnswer: 1
            },
            {
              question: 'What is the primary goal of DevOps?',
              options: ['Replace developers', 'Break down silos and accelerate software delivery', 'Eliminate operations', 'Automate everything'],
              correctAnswer: 1
            },
            {
              question: 'What does "shift left" mean in DevOps?',
              options: ['Moving servers', 'Testing and security earlier in development cycle', 'Left-handed developers', 'Cloud migration'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'DevOps Culture Assessment',
          duration: '45 min',
          tasks: [
            'Assess current development and operations workflows',
            'Identify bottlenecks and silos in current process',
            'Map communication flows between teams',
            'Create improvement proposals',
            'Document metrics to track DevOps transformation'
          ]
        }
      },
      {
        id: 'lesson2',
        title: 'Version Control with Git',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/RGOj5yH7evk',
        topics: ['Git Basics', 'Branching Strategies', 'Pull Requests', 'Git Workflow'],
        description: 'Master Git for version control and team collaboration.',
        learningMaterials: [
          { 
            type: 'interactive', 
            title: 'Git Branching Interactive Tutorial', 
            duration: '30 min',
            url: 'https://learngitbranching.js.org/',
            description: 'Interactive visual tutorial teaching Git branching concepts with hands-on practice'
          },
          { 
            type: 'reading', 
            title: 'Git Workflow Best Practices', 
            duration: '20 min',
            url: 'https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows',
            description: 'Official Git documentation on distributed workflows and collaboration patterns'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a Git branch?',
              options: ['A tree branch', 'A pointer to a specific commit allowing parallel development', 'A folder', 'A server'],
              correctAnswer: 1
            },
            {
              question: 'What is a merge conflict?',
              options: ['Server error', 'When Git cannot automatically resolve differences between branches', 'Database error', 'Network issue'],
              correctAnswer: 1
            },
            {
              question: 'What is GitFlow?',
              options: ['Water flow', 'A branching model with specific branch types', 'A Git hosting service', 'A monitoring tool'],
              correctAnswer: 1
            },
            {
              question: 'What is a pull request?',
              options: ['Pulling code', 'A request to merge changes with code review', 'A database query', 'A network request'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Git Workflow Practice',
          duration: '75 min',
          tasks: [
            'Initialize Git repository and make initial commit',
            'Create feature branch and make changes',
            'Simulate merge conflict and resolve it',
            'Create and review pull request',
            'Implement Git hooks for automated checks',
            'Practice rebasing and cherry-picking'
          ]
        }
      },
      {
        id: 'lesson3',
        title: 'CI/CD Pipeline Fundamentals',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/scEDHsr3APg',
        topics: ['Continuous Integration', 'Continuous Deployment', 'Pipeline Design'],
        description: 'Build automated pipelines for testing and deploying code.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'CI/CD Best Practices Guide', 
            duration: '30 min',
            url: 'https://docs.gitlab.com/ee/ci/introduction/',
            description: 'GitLab CI/CD introduction covering pipelines, jobs, and deployment strategies'
          },
          { 
            type: 'diagram', 
            title: 'Pipeline Architecture Patterns', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/devops/pipelines/architectures/devops-pipelines-baseline-architecture',
            description: 'Azure DevOps pipeline architecture patterns with visual diagrams'
          },
          { 
            type: 'case-study', 
            title: 'Enterprise CI/CD Implementation', 
            duration: '20 min',
            url: 'https://aws.amazon.com/devops/continuous-integration/',
            description: 'AWS CI/CD implementation patterns with enterprise case studies'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is Continuous Integration?',
              options: ['Manual testing', 'Automatically building and testing code changes frequently', 'Deploying to production', 'Code review'],
              correctAnswer: 1
            },
            {
              question: 'What is the difference between Continuous Delivery and Continuous Deployment?',
              options: ['No difference', 'Delivery requires manual approval, Deployment is fully automated', 'Delivery is faster', 'Deployment is older'],
              correctAnswer: 1
            },
            {
              question: 'What should trigger a CI pipeline?',
              options: ['Manual only', 'Code commits, pull requests, scheduled builds', 'Never', 'Monthly'],
              correctAnswer: 1
            },
            {
              question: 'What is a pipeline artifact?',
              options: ['Ancient code', 'Output produced by a pipeline stage', 'Error log', 'Configuration file'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Build Basic CI/CD Pipeline',
          duration: '90 min',
          tasks: [
            'Set up basic pipeline with build stage',
            'Add automated testing stage',
            'Implement code quality checks',
            'Configure deployment stage',
            'Add notifications for pipeline status',
            'Test pipeline with code changes'
          ]
        }
      },
      {
        id: 'lesson4',
        title: 'GitHub Actions',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/R8_veQiYBjI',
        topics: ['Workflows', 'Actions Marketplace', 'Secrets Management', 'Matrix Builds'],
        description: 'Automate workflows with GitHub Actions.',
        learningMaterials: [
          { 
            type: 'documentation', 
            title: 'GitHub Actions Syntax Reference', 
            duration: '25 min',
            url: 'https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions',
            description: 'Complete GitHub Actions workflow syntax reference with all available options'
          },
          { 
            type: 'tutorial', 
            title: 'Building Custom Actions', 
            duration: '30 min',
            url: 'https://docs.github.com/en/actions/creating-actions',
            description: 'Official GitHub tutorial on creating custom actions with JavaScript or Docker'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a GitHub Actions workflow?',
              options: ['A diagram', 'An automated process defined by YAML file', 'A team workflow', 'A project board'],
              correctAnswer: 1
            },
            {
              question: 'What triggers a GitHub Actions workflow?',
              options: ['Only manual', 'Events like push, pull_request, schedule, etc.', 'Never', 'Email'],
              correctAnswer: 1
            },
            {
              question: 'What is a matrix build?',
              options: ['A movie', 'Running jobs across multiple configurations (OS, versions)', 'Nested builds', 'Array builds'],
              correctAnswer: 1
            },
            {
              question: 'How should secrets be stored in GitHub Actions?',
              options: ['In code', 'Using GitHub Secrets', 'In comments', 'In repository name'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Implement GitHub Actions Workflow',
          duration: '90 min',
          tasks: [
            'Create workflow file with multiple jobs',
            'Implement matrix strategy for multi-environment testing',
            'Use Actions from marketplace',
            'Configure secrets for deployment credentials',
            'Add caching to speed up workflow',
            'Deploy application using GitHub Actions'
          ]
        }
      },
      {
        id: 'lesson5',
        title: 'Docker Containerization',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/3c-iBn73dDE',
        topics: ['Docker Basics', 'Dockerfile', 'Docker Compose', 'Image Optimization'],
        description: 'Package applications in containers for consistent deployment.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Docker Best Practices', 
            duration: '30 min',
            url: 'https://docs.docker.com/develop/dev-best-practices/',
            description: 'Official Docker best practices for building efficient and secure containers'
          },
          { 
            type: 'tutorial', 
            title: 'Multi-Stage Dockerfile Tutorial', 
            duration: '25 min',
            url: 'https://docs.docker.com/build/building/multi-stage/',
            description: 'Hands-on tutorial for building smaller Docker images with multi-stage builds'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a Docker container?',
              options: ['A storage box', 'A lightweight, standalone package with code and dependencies', 'A virtual machine', 'A server'],
              correctAnswer: 1
            },
            {
              question: 'What is a Dockerfile?',
              options: ['A text document', 'A script with instructions to build a Docker image', 'A configuration file', 'A database file'],
              correctAnswer: 1
            },
            {
              question: 'What is Docker Compose used for?',
              options: ['Writing code', 'Defining and running multi-container applications', 'Music composition', 'Image editing'],
              correctAnswer: 1
            },
            {
              question: 'What is a multi-stage build?',
              options: ['Multiple servers', 'Using multiple FROM statements to reduce image size', 'Multiple deployments', 'Multiple teams'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Containerize Application',
          duration: '90 min',
          tasks: [
            'Write Dockerfile for a sample application',
            'Build and run Docker container locally',
            'Optimize Dockerfile with multi-stage build',
            'Create Docker Compose file for multi-container app',
            'Push image to container registry',
            'Implement health checks and proper logging'
          ]
        }
      },
      {
        id: 'lesson6',
        title: 'Kubernetes Orchestration',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/X48VuDVv0do',
        topics: ['K8s Architecture', 'Pods & Services', 'Deployments', 'Helm Charts'],
        description: 'Orchestrate containers at scale with Kubernetes.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Kubernetes Concepts Overview', 
            duration: '35 min',
            url: 'https://kubernetes.io/docs/concepts/',
            description: 'Official Kubernetes documentation covering all core concepts from pods to services'
          },
          { 
            type: 'interactive', 
            title: 'Kubernetes Interactive Tutorial', 
            duration: '30 min',
            url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
            description: 'Free interactive Kubernetes tutorial with browser-based hands-on labs'
          },
          { 
            type: 'documentation', 
            title: 'kubectl Command Reference', 
            duration: '20 min',
            url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/',
            description: 'Complete kubectl cheat sheet with common commands and usage patterns'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is a Kubernetes Pod?',
              options: ['A group of whales', 'Smallest deployable unit containing one or more containers', 'A server', 'A storage unit'],
              correctAnswer: 1
            },
            {
              question: 'What is a Kubernetes Service?',
              options: ['A support plan', 'An abstraction for accessing pods with stable endpoint', 'A microservice', 'A database'],
              correctAnswer: 1
            },
            {
              question: 'What is a Deployment in Kubernetes?',
              options: ['Deploying servers', 'Manages desired state of pods with rolling updates', 'A team', 'A network'],
              correctAnswer: 1
            },
            {
              question: 'What is Helm?',
              options: ['A steering wheel', 'Package manager for Kubernetes', 'A monitoring tool', 'A container runtime'],
              correctAnswer: 1
            },
            {
              question: 'What is a namespace in Kubernetes?',
              options: ['Variable name', 'Virtual cluster for resource isolation', 'Server name', 'File path'],
              correctAnswer: 1
            }
          ],
          passingScore: 80
        },
        lab: {
          title: 'Deploy Application to Kubernetes',
          duration: '120 min',
          tasks: [
            'Set up local Kubernetes cluster (minikube or kind)',
            'Create deployment YAML for application',
            'Expose application with Service',
            'Implement ConfigMaps and Secrets',
            'Set up horizontal pod autoscaling',
            'Package application with Helm chart'
          ]
        }
      },
      {
        id: 'lesson7',
        title: 'Infrastructure as Code with Terraform',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/7xngnjfIlK4',
        topics: ['HCL Syntax', 'Providers', 'State Management', 'Modules'],
        description: 'Define and manage infrastructure with code using Terraform.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Terraform Best Practices', 
            duration: '35 min',
            url: 'https://www.terraform.io/docs/cloud/guides/recommended-practices/index.html',
            description: 'HashiCorp recommended practices for Terraform code organization and workflows'
          },
          { 
            type: 'documentation', 
            title: 'Terraform Provider Documentation', 
            duration: '25 min',
            url: 'https://registry.terraform.io/browse/providers',
            description: 'Terraform Registry with documentation for AWS, Azure, GCP, and 2000+ providers'
          },
          { 
            type: 'tutorial', 
            title: 'Building Reusable Modules', 
            duration: '30 min',
            url: 'https://developer.hashicorp.com/terraform/tutorials/modules',
            description: 'HashiCorp tutorial on creating reusable Terraform modules with examples'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is Infrastructure as Code (IaC)?',
              options: ['Writing infrastructure manually', 'Managing infrastructure through machine-readable files', 'Drawing diagrams', 'Buying hardware'],
              correctAnswer: 1
            },
            {
              question: 'What is Terraform state?',
              options: ['Server location', 'File tracking real-world resource mappings', 'Error state', 'Running status'],
              correctAnswer: 1
            },
            {
              question: 'What is a Terraform provider?',
              options: ['Hosting company', 'Plugin that interfaces with APIs (AWS, Azure, etc.)', 'Internet provider', 'Support team'],
              correctAnswer: 1
            },
            {
              question: 'Why use Terraform modules?',
              options: ['Required by law', 'Create reusable and organized infrastructure components', 'Make code slower', 'Increase complexity'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Build Infrastructure with Terraform',
          duration: '120 min',
          tasks: [
            'Write Terraform configuration for cloud infrastructure',
            'Initialize Terraform and configure providers',
            'Deploy resources with terraform apply',
            'Create reusable Terraform module',
            'Implement remote state storage',
            'Use terraform plan and workspaces for environments'
          ]
        }
      },
      {
        id: 'lesson8',
        title: 'Configuration Management',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/1id6ERvfozo',
        topics: ['Ansible', 'Puppet', 'Chef', 'Configuration Drift'],
        description: 'Manage server configurations at scale with automation.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Configuration Management Comparison', 
            duration: '25 min',
            url: 'https://www.ansible.com/overview/configuration-management',
            description: 'Ansible overview and comparison with other configuration management tools'
          },
          { 
            type: 'tutorial', 
            title: 'Ansible Playbook Basics', 
            duration: '30 min',
            url: 'https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html',
            description: 'Official Ansible playbook introduction with step-by-step examples'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is configuration drift?',
              options: ['Moving servers', 'When actual configuration diverges from desired state', 'Network latency', 'Cost increase'],
              correctAnswer: 1
            },
            {
              question: 'What is an Ansible playbook?',
              options: ['A book', 'YAML file defining automation tasks', 'A video tutorial', 'A game'],
              correctAnswer: 1
            },
            {
              question: 'What is idempotency in configuration management?',
              options: ['Running once only', 'Running multiple times produces same result', 'Must always change', 'Random behavior'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Automate Configuration with Ansible',
          duration: '90 min',
          tasks: [
            'Write Ansible inventory file',
            'Create playbook to configure servers',
            'Implement roles for reusable configuration',
            'Use Ansible Vault for secrets',
            'Run playbook against multiple servers',
            'Verify idempotency by running playbook twice'
          ]
        }
      },
      {
        id: 'lesson9',
        title: 'Monitoring & Logging',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/h4Sl21AKiDg',
        topics: ['Prometheus', 'Grafana', 'ELK Stack', 'Application Monitoring'],
        description: 'Monitor applications and infrastructure for performance and issues.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Observability Best Practices', 
            duration: '30 min',
            url: 'https://opentelemetry.io/docs/concepts/observability-primer/',
            description: 'OpenTelemetry observability primer covering metrics, logs, and traces'
          },
          { 
            type: 'tutorial', 
            title: 'Setting Up Prometheus and Grafana', 
            duration: '30 min',
            url: 'https://prometheus.io/docs/prometheus/latest/getting_started/',
            description: 'Official Prometheus getting started guide with Grafana integration'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What are the three pillars of observability?',
              options: ['Cost, Speed, Quality', 'Metrics, Logs, Traces', 'CPU, Memory, Disk', 'Dev, Test, Prod'],
              correctAnswer: 1
            },
            {
              question: 'What is Prometheus used for?',
              options: ['Code editing', 'Time-series metrics collection and monitoring', 'Version control', 'Deployment'],
              correctAnswer: 1
            },
            {
              question: 'What does ELK stand for?',
              options: ['Error Log Kit', 'Elasticsearch, Logstash, Kibana', 'Enterprise Log Keeper', 'Elastic Log Kubernetes'],
              correctAnswer: 1
            },
            {
              question: 'Why is distributed tracing important?',
              options: ['It\'s not important', 'Tracks requests across microservices for troubleshooting', 'Saves money', 'Deletes logs'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Implement Monitoring Stack',
          duration: '120 min',
          tasks: [
            'Deploy Prometheus for metrics collection',
            'Configure Grafana dashboards',
            'Set up application instrumentation',
            'Configure log aggregation with Loki or ELK',
            'Create alerts for critical metrics',
            'Implement distributed tracing with Jaeger'
          ]
        }
      },
      {
        id: 'lesson10',
        title: 'GitOps & Advanced Workflows',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/f5EpcWp0THw',
        topics: ['GitOps Principles', 'ArgoCD', 'Flux', 'Declarative Config'],
        description: 'Implement GitOps for infrastructure and application management.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'GitOps Principles and Practices', 
            duration: '25 min',
            url: 'https://www.gitops.tech/',
            description: 'Comprehensive GitOps resource covering principles, tools, and best practices'
          },
          { 
            type: 'tutorial', 
            title: 'ArgoCD Getting Started', 
            duration: '20 min',
            url: 'https://argo-cd.readthedocs.io/en/stable/getting_started/',
            description: 'Official ArgoCD tutorial for implementing GitOps in Kubernetes'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is GitOps?',
              options: ['Git operations team', 'Using Git as single source of truth for declarative infrastructure', 'Git hosting', 'Git commands'],
              correctAnswer: 1
            },
            {
              question: 'What is a key benefit of GitOps?',
              options: ['Slower deployments', 'Versioned, auditable infrastructure changes', 'More manual work', 'No automation'],
              correctAnswer: 1
            },
            {
              question: 'What does ArgoCD do?',
              options: ['Code editor', 'Continuous delivery tool for Kubernetes using GitOps', 'Database', 'Monitoring'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Implement GitOps Workflow',
          duration: '120 min',
          tasks: [
            'Set up ArgoCD or Flux in Kubernetes cluster',
            'Create Git repository for application manifests',
            'Configure automatic synchronization',
            'Deploy application via GitOps',
            'Implement pull-based deployment model',
            'Test rollback by reverting Git commit'
          ]
        }
      },
      {
        id: 'lesson11',
        title: 'Testing & Quality Automation',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/4iJDaNuTbFo',
        topics: ['Unit Testing', 'Integration Testing', 'Security Scanning', 'Test Automation'],
        description: 'Automate testing to ensure code quality and security.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Testing Pyramid and Strategies', 
            duration: '25 min',
            url: 'https://martinfowler.com/articles/practical-test-pyramid.html',
            description: 'Martin Fowler\'s comprehensive guide to the testing pyramid'
          },
          { 
            type: 'tutorial', 
            title: 'Automated Security Scanning', 
            duration: '20 min',
            url: 'https://owasp.org/www-community/Source_Code_Analysis_Tools',
            description: 'OWASP guide to security testing tools including SAST and DAST'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the testing pyramid?',
              options: ['Egyptian structure', 'Strategy with many unit tests, fewer integration, fewest E2E tests', 'Test server', 'Test framework'],
              correctAnswer: 1
            },
            {
              question: 'What is code coverage?',
              options: ['Code documentation', 'Percentage of code executed by tests', 'Code security', 'Code style'],
              correctAnswer: 1
            },
            {
              question: 'Why is automated security scanning important in CI/CD?',
              options: ['It\'s optional', 'Catches vulnerabilities before deployment', 'Slows down pipeline', 'Not necessary'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Implement Test Automation',
          duration: '90 min',
          tasks: [
            'Add unit tests to sample application',
            'Integrate tests into CI pipeline',
            'Implement code coverage reporting',
            'Add integration tests',
            'Set up automated security scanning (SAST/DAST)',
            'Configure quality gates to block failing builds'
          ]
        }
      },
      {
        id: 'lesson12',
        title: 'Capstone: Full DevOps Pipeline',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['End-to-End Pipeline', 'Multi-Environment', 'Rollback Strategy'],
        description: 'Build a complete DevOps pipeline from code to production.',
        learningMaterials: [
          { 
            type: 'template', 
            title: 'DevOps Pipeline Blueprint', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/devops/pipelines/architectures/devops-pipelines-baseline-architecture',
            description: 'Azure DevOps pipeline architecture blueprint with templates'
          },
          { 
            type: 'checklist', 
            title: 'Production Readiness Checklist', 
            duration: '20 min',
            url: 'https://gruntwork.io/devops-checklist/',
            description: 'Comprehensive production readiness checklist for DevOps teams'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What environments should a production pipeline include?',
              options: ['Only production', 'Development, Staging, Production', 'Just one', 'Development only'],
              correctAnswer: 1
            },
            {
              question: 'What is blue-green deployment?',
              options: ['Color coding', 'Running two identical environments, switching traffic for zero-downtime', 'Painting servers', 'Theme selection'],
              correctAnswer: 1
            },
            {
              question: 'Why is a rollback strategy important?',
              options: ['It\'s not important', 'Quickly revert to previous version if issues arise', 'Waste of time', 'Never needed'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Complete DevOps Pipeline Project',
          duration: '180 min',
          tasks: [
            'Design end-to-end pipeline architecture',
            'Implement CI pipeline with testing and scanning',
            'Set up multi-environment deployment (dev, staging, prod)',
            'Configure infrastructure as code',
            'Implement monitoring and alerting',
            'Add rollback capabilities',
            'Document and present complete pipeline'
          ]
        }
      }
    ]
  },

  'intro-to-ai-ml': {
    id: 'intro-to-ai-ml',
    title: 'Introduction to AI & Machine Learning',
    subtitle: 'Build Intelligent Cloud Applications',
    description: 'Learn practical AI/ML fundamentals and build intelligent applications using cloud services.',
    price: 497,
    duration: '25 hours',
    level: 'Beginner',
    category: 'AI/ML',
    color: '#f59e0b',
    icon: '🤖',
    skills: ['Machine Learning', 'AI Services', 'Python', 'Model Training', 'ML Pipelines'],
    
    // Lab Environment Setup Instructions
    labSetup: {
      title: 'Getting Your Lab Environment Ready',
      description: 'You\'ll need access to cloud platforms to complete hands-on labs. Here are your options:',
      options: [
        {
          name: 'AWS Free Tier (Recommended for Beginners)',
          steps: [
            'Visit https://aws.amazon.com/free/',
            'Click "Create a Free Account"',
            'Provide email, password, and AWS account name',
            'Enter payment information (required but won\'t be charged for free tier usage)',
            'Verify your phone number',
            'Choose "Basic Support - Free" plan',
            'Sign in to AWS Console at https://console.aws.amazon.com/',
            '⚠️ Set up billing alerts to avoid unexpected charges: CloudWatch > Billing > Create Alarm'
          ],
          duration: '10-15 minutes',
          cost: 'Free for 12 months (with usage limits)',
          url: 'https://aws.amazon.com/free/'
        },
        {
          name: 'Azure Free Account',
          steps: [
            'Visit https://azure.microsoft.com/free/',
            'Click "Start free"',
            'Sign in with Microsoft account (or create one)',
            'Enter personal information and phone verification',
            'Add credit card for identity verification ($200 credit provided)',
            'Complete identity verification',
            'Access Azure Portal at https://portal.azure.com/',
            '💡 Tip: Use Azure Cost Management to track your spending'
          ],
          duration: '10-15 minutes',
          cost: '$200 credit for 30 days + 12 months of free services',
          url: 'https://azure.microsoft.com/free/'
        },
        {
          name: 'Google Cloud Free Tier',
          steps: [
            'Visit https://cloud.google.com/free/',
            'Click "Get started for free"',
            'Sign in with Google account',
            'Enter billing information ($300 credit for 90 days)',
            'Select country and accept terms',
            'Access GCP Console at https://console.cloud.google.com/',
            'Create your first project',
            '📊 Enable billing alerts in Billing > Budgets & Alerts'
          ],
          duration: '10 minutes',
          cost: '$300 credit for 90 days + Always Free tier',
          url: 'https://cloud.google.com/free/'
        },
        {
          name: 'Use Your Existing Cloud Account',
          steps: [
            '✅ If you already have AWS/Azure/GCP access through work or school, you can use that',
            'Ensure you have permissions to create: VMs, storage, networks, and basic services',
            'Check with your organization about cost allocation tags or budget limits',
            'Use a separate resource group/project for course labs to keep things organized',
            '🏷️ Tag all resources with "Course: AI & Machine Learning" for easy cleanup'
          ],
          duration: '5 minutes',
          cost: 'Depends on your organization\'s arrangement'
        },
        {
          name: 'Cloud Sandboxes & Practice Environments (No Credit Card Required)',
          steps: [
            '🧪 A Cloud Guru Sandbox: https://acloudguru.com/platform/cloud-sandbox-playgrounds',
            '🎮 AWS CloudQuest (gamified learning): https://aws.amazon.com/training/digital/aws-cloud-quest/',
            '🔬 Azure Learn Sandbox: Built into Microsoft Learn modules (https://learn.microsoft.com/training/azure/)',
            '🧑‍🔬 Qwiklabs for GCP: https://www.cloudskillsboost.google/ (free labs available)',
            '💻 Instruqt Interactive Labs: https://play.instruqt.com/public',
            'These are temporary environments (1-4 hours) - perfect for trying things without commitment'
          ],
          duration: 'Instant access',
          cost: 'Free (time-limited sessions)'
        }
      ],
      recommendations: [
        '🤖 AI/ML learners: Most cloud AI services have generous free tiers (perfect for learning)',
        '💳 Budget-friendly: Start with Azure Cognitive Services or AWS AI services (free tier covers most labs)',
        '💰 Training costs: GPU instances for custom models can be expensive (~$1-3/hour) - use only when needed',
        '📊 Tip: Use managed AI services (Azure AI, AWS SageMaker) free tiers instead of training from scratch',
        '🎓 Students: Apply for GitHub Education Pack or Azure for Students for extra AI/ML credits'
      ]
    },
    
    // Coding Prerequisites
    codingPrerequisites: {
      required: true,
      description: 'Python is essential for AI/ML development, data processing, and working with ML frameworks.',
      languages: [
        {
          name: 'Python',
          why: 'Primary language for AI/ML - required for data processing, model training, and ML frameworks',
          skillLevel: 'Intermediate - functions, libraries (numpy, pandas), basic OOP',
          learningResources: [
            { title: 'Python for Beginners - Microsoft', url: 'https://learn.microsoft.com/training/paths/beginner-python/', duration: '8 hours', type: 'free' },
            { title: 'Python Tutorial - W3Schools', url: 'https://www.w3schools.com/python/', duration: 'Self-paced', type: 'free' },
            { title: 'Learn Python - Codecademy', url: 'https://www.codecademy.com/learn/learn-python-3', duration: '25 hours', type: 'freemium' },
            { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', duration: 'Book + Videos', type: 'free' }
          ],
          quickStart: [
            'Install Python: https://www.python.org/downloads/',
            'Try it online: https://repl.it/languages/python3',
            'Learn basics: variables, functions, loops, lists (2-3 hours)',
            'Practice: Load a dataset, calculate statistics'
          ]
        },
        {
          name: 'PowerShell',
          why: 'Useful for Azure ML automation and deployment pipelines',
          skillLevel: 'Basic - optional for Azure ML workflows',
          learningResources: [
            { title: 'PowerShell 101 - Microsoft', url: 'https://learn.microsoft.com/powershell/scripting/learn/ps101/00-introduction', duration: '5 hours', type: 'free' },
            { title: 'PowerShell Tutorial - TutorialsPoint', url: 'https://www.tutorialspoint.com/powershell/index.htm', duration: 'Self-paced', type: 'free' },
            { title: 'Introduction to PowerShell - Pluralsight', url: 'https://www.pluralsight.com/courses/powershell-intro', duration: '3 hours', type: 'paid' },
            { title: 'Learn PowerShell in a Month of Lunches', url: 'https://www.manning.com/books/learn-powershell-in-a-month-of-lunches', duration: 'Book', type: 'paid' }
          ],
          quickStart: [
            'Already installed on Windows! Open "Windows PowerShell"',
            'Mac/Linux: Install PowerShell Core from https://github.com/PowerShell/PowerShell',
            'Learn basics: cmdlets (Get-, Set-, New-), variables, pipelines (2 hours)',
            'Practice: Invoke-AzMLWebService, deploy models'
          ]
        },
        {
          name: 'Bash/Shell Scripting',
          why: 'Helpful for data preprocessing and ML pipeline automation',
          skillLevel: 'Basic - optional for workflow automation',
          learningResources: [
            { title: 'Bash Scripting Tutorial', url: 'https://linuxconfig.org/bash-scripting-tutorial', duration: '4 hours', type: 'free' },
            { title: 'Shell Scripting - Linux Journey', url: 'https://linuxjourney.com/lesson/the-shell', duration: 'Self-paced', type: 'free' },
            { title: 'Bash Guide for Beginners', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', duration: 'Reference', type: 'free' }
          ],
          quickStart: [
            'Mac/Linux: Already have it! Open Terminal',
            'Windows: Use Git Bash (https://gitforwindows.org/) or WSL',
            'Learn basics: ls, cd, grep, pipes, variables (1-2 hours)',
            'Practice: Batch process data files'
          ]
        }
      ],
      recommendation: '🤖 Python is MANDATORY for this course. Complete a Python fundamentals course (20-30 hours) before starting.'
    },
    
    // Certification Exam Preparation
    certifications: [
      { name: 'AWS Certified Machine Learning - Specialty', provider: 'AWS', code: 'MLS-C01' },
      { name: 'Microsoft Azure AI Engineer Associate', provider: 'Microsoft', code: 'AI-102' },
      { name: 'TensorFlow Developer Certificate', provider: 'Google', code: 'TensorFlow Dev' }
    ],
    
    // Career Paths & Job Roles
    careerPaths: [
      { role: 'Machine Learning Engineer', avgSalary: '$110,000 - $150,000', demand: 'Very High' },
      { role: 'AI/ML Solutions Architect', avgSalary: '$120,000 - $160,000', demand: 'High' },
      { role: 'Data Scientist', avgSalary: '$100,000 - $140,000', demand: 'Very High' },
      { role: 'AI Application Developer', avgSalary: '$95,000 - $130,000', demand: 'High' }
    ],
    
    // Detailed Syllabus
    syllabus: {
      overview: 'This beginner-friendly course introduces AI and machine learning concepts with hands-on projects using cloud AI services. Learn to build intelligent applications without deep mathematical background, and understand when to use pre-built AI vs custom models.',
      prerequisites: 'Basic programming knowledge (Python recommended), Basic understanding of cloud concepts, No prior AI/ML experience required',
      outcomes: [
        'Understand core AI and machine learning concepts',
        'Use cloud AI services for vision, language, and predictions',
        'Train and deploy custom machine learning models',
        'Build AI-powered applications',
        'Implement MLOps best practices',
        'Prepare for AI/ML certification exams'
      ],
      weekByWeek: [
        { week: 1, topics: ['AI/ML Fundamentals', 'Python for ML'], labs: 2 },
        { week: 2, topics: ['Cloud AI Services', 'Computer Vision'], labs: 2 },
        { week: 3, topics: ['NLP', 'Building ML Models'], labs: 2 },
        { week: 4, topics: ['Model Deployment', 'AutoML'], labs: 2 },
        { week: 5, topics: ['Chatbots', 'Capstone Project'], labs: 2 }
      ]
    },
    
    // Downloadable Resources
    resources: [
      { title: 'AI/ML Glossary and Cheat Sheet (PDF)', type: 'pdf', size: '4 MB' },
      { title: 'Python ML Libraries Quick Reference', type: 'pdf', size: '3 MB' },
      { title: 'Pre-trained Model Zoo', type: 'zip', size: '50 MB' },
      { title: 'ML Algorithm Selection Guide', type: 'pdf', size: '2 MB' },
      { title: 'Sample Datasets Collection', type: 'zip', size: '25 MB' },
      { title: 'MLOps Best Practices Guide', type: 'pdf', size: '5 MB' },
      { title: 'AI Ethics and Bias Mitigation Handbook', type: 'pdf', size: '3 MB' }
    ],
    
    lessons: [
      {
        id: 'lesson1',
        title: 'AI & ML Fundamentals',
        duration: '75 min',
        video: 'https://www.youtube.com/embed/ukzFI9rgwfU',
        topics: ['AI vs ML vs DL', 'Supervised Learning', 'Unsupervised Learning', 'Use Cases'],
        description: 'Understand the basics of artificial intelligence and machine learning.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Introduction to Machine Learning', 
            duration: '25 min',
            url: 'https://developers.google.com/machine-learning/crash-course/ml-intro',
            description: 'Google Machine Learning Crash Course - beginner-friendly ML introduction'
          },
          { 
            type: 'video', 
            title: 'AI Use Cases Across Industries', 
            duration: '20 min',
            url: 'https://www.youtube.com/watch?v=ukzFI9rgwfU',
            description: 'Real-world AI applications in healthcare, finance, retail, and manufacturing'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the difference between AI, ML, and Deep Learning?',
              options: ['No difference', 'AI is broad, ML is subset using data, DL is subset using neural networks', 'They are competitors', 'DL came first'],
              correctAnswer: 1
            },
            {
              question: 'What is supervised learning?',
              options: ['Learning with a teacher', 'Training with labeled data', 'No data needed', 'Random learning'],
              correctAnswer: 1
            },
            {
              question: 'What is unsupervised learning used for?',
              options: ['Classification', 'Finding patterns in unlabeled data', 'Deleting data', 'Storage'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Explore AI/ML Concepts',
          duration: '60 min',
          tasks: [
            'Research real-world AI applications',
            'Identify supervised vs unsupervised learning examples',
            'Explore ML algorithm types and use cases',
            'Experiment with simple ML demo',
            'Document when to use AI vs traditional programming'
          ]
        }
      },
      {
        id: 'lesson2',
        title: 'Python for AI/ML',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/rfscVS0vtbw',
        topics: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
        description: 'Learn essential Python libraries for machine learning.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'NumPy Arrays and Operations', 
            duration: '30 min',
            url: 'https://numpy.org/doc/stable/user/quickstart.html',
            description: 'Official NumPy quickstart tutorial covering arrays, operations, and indexing'
          },
          { 
            type: 'tutorial', 
            title: 'Pandas DataFrames', 
            duration: '35 min',
            url: 'https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html',
            description: 'Interactive Pandas tutorials for data manipulation and analysis'
          },
          { 
            type: 'interactive', 
            title: 'Matplotlib Visualization Gallery', 
            duration: '20 min',
            url: 'https://matplotlib.org/stable/gallery/index.html',
            description: 'Visual gallery of Matplotlib charts with code examples'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is NumPy primarily used for?',
              options: ['Web development', 'Numerical computing with arrays', 'Database management', 'UI design'],
              correctAnswer: 1
            },
            {
              question: 'What is a Pandas DataFrame?',
              options: ['A door frame', '2D labeled data structure like a table', 'A video frame', 'A picture frame'],
              correctAnswer: 1
            },
            {
              question: 'What is Scikit-learn?',
              options: ['Learning platform', 'Machine learning library with algorithms and tools', 'Video tutorial', 'IDE'],
              correctAnswer: 1
            },
            {
              question: 'What is Matplotlib used for?',
              options: ['Data visualization', 'Data storage', 'Data encryption', 'Data deletion'],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Python ML Libraries Hands-On',
          duration: '90 min',
          tasks: [
            'Install and import NumPy, Pandas, Matplotlib, Scikit-learn',
            'Load and explore dataset with Pandas',
            'Perform data analysis and statistics',
            'Create visualizations with Matplotlib',
            'Train simple model with Scikit-learn',
            'Document findings and insights'
          ]
        }
      },
      {
        id: 'lesson3',
        title: 'Cloud AI Services Overview',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/pjx6DtRc8zc',
        topics: ['AWS AI Services', 'Azure Cognitive Services', 'Google AI Platform'],
        description: 'Explore pre-built AI services from major cloud providers.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Cloud AI Services Comparison', 
            duration: '25 min',
            url: 'https://aws.amazon.com/ai/services/',
            description: 'AWS AI services overview covering vision, language, forecasting, and more'
          },
          { 
            type: 'documentation', 
            title: 'AI Service APIs Quick Start', 
            duration: '20 min',
            url: 'https://learn.microsoft.com/azure/cognitive-services/',
            description: 'Azure Cognitive Services quickstart guides with API examples'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is the benefit of using pre-built AI services?',
              options: ['More expensive', 'Faster implementation without training models', 'Slower', 'Less accurate'],
              correctAnswer: 1
            },
            {
              question: 'Which AWS service provides ready-made AI capabilities?',
              options: ['EC2', 'Amazon Rekognition, Comprehend, Polly, etc.', 'S3', 'IAM'],
              correctAnswer: 1
            },
            {
              question: 'What are Azure Cognitive Services?',
              options: ['VM services', 'Pre-built AI APIs for vision, speech, language, decision', 'Storage services', 'Network services'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Explore Cloud AI APIs',
          duration: '75 min',
          tasks: [
            'Sign up for cloud AI service free tier',
            'Test image recognition API',
            'Test text sentiment analysis API',
            'Test speech-to-text service',
            'Compare results across different providers',
            'Document use cases for each service'
          ]
        }
      },
      {
        id: 'lesson4',
        title: 'Computer Vision with Cloud APIs',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/vT1JzLTH4G4',
        topics: ['Image Recognition', 'Object Detection', 'Face Detection', 'OCR'],
        description: 'Build applications that can see and understand images.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'Computer Vision API Tutorial', 
            duration: '35 min',
            url: 'https://learn.microsoft.com/azure/cognitive-services/computer-vision/quickstarts-sdk/image-analysis-client-library',
            description: 'Microsoft Learn computer vision quickstart with code samples'
          },
          { 
            type: 'case-study', 
            title: 'Real-World Vision Applications', 
            duration: '20 min',
            url: 'https://aws.amazon.com/rekognition/customers/',
            description: 'AWS Rekognition customer stories showing production vision applications'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is OCR?',
              options: ['Object Classification Routine', 'Optical Character Recognition - reading text from images', 'Online Cloud Resources', 'Operating Cloud Regions'],
              correctAnswer: 1
            },
            {
              question: 'What is object detection?',
              options: ['Finding files', 'Identifying and locating objects within an image', 'Creating objects', 'Deleting objects'],
              correctAnswer: 1
            },
            {
              question: 'What can face detection be used for?',
              options: ['Social media', 'Security, attendance, photo organization', 'Gaming', 'All of the above'],
              correctAnswer: 3
            },
            {
              question: 'What is image classification?',
              options: ['Organizing files', 'Categorizing entire image into predefined classes', 'Editing images', 'Compressing images'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Build Computer Vision Application',
          duration: '90 min',
          tasks: [
            'Set up computer vision API credentials',
            'Build image classification application',
            'Implement object detection in images',
            'Add face detection capabilities',
            'Implement OCR for text extraction',
            'Create simple web interface for demos'
          ]
        }
      },
      {
        id: 'lesson5',
        title: 'Natural Language Processing',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/fOvTtapxa9c',
        topics: ['Text Analysis', 'Sentiment Analysis', 'Entity Extraction', 'Translation'],
        description: 'Process and understand human language with NLP.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'NLP Fundamentals', 
            duration: '30 min',
            url: 'https://web.stanford.edu/~jurafsky/slp3/',
            description: 'Stanford NLP book (free online) - comprehensive introduction to natural language processing'
          },
          { 
            type: 'tutorial', 
            title: 'Text Processing with NLP APIs', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/azure/cognitive-services/language-service/sentiment-opinion-mining/quickstart',
            description: 'Azure sentiment analysis quickstart with hands-on examples'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is sentiment analysis?',
              options: ['Feeling analysis', 'Determining emotional tone of text (positive, negative, neutral)', 'Grammar checking', 'Translation'],
              correctAnswer: 1
            },
            {
              question: 'What is named entity recognition (NER)?',
              options: ['Naming files', 'Identifying entities like people, places, organizations in text', 'User authentication', 'Data encryption'],
              correctAnswer: 1
            },
            {
              question: 'What is machine translation?',
              options: ['Moving machines', 'Automatically translating text between languages', 'API translation', 'Code compilation'],
              correctAnswer: 1
            },
            {
              question: 'What is text classification used for?',
              options: ['Filing documents', 'Categorizing text into topics like spam detection, topic categorization', 'Printing', 'Storage'],
              correctAnswer: 1
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'NLP Applications',
          duration: '90 min',
          tasks: [
            'Implement sentiment analysis on product reviews',
            'Extract named entities from news articles',
            'Build language translation tool',
            'Create text summarization feature',
            'Implement keyword extraction',
            'Build simple chatbot with NLP'
          ]
        }
      },
      {
        id: 'lesson6',
        title: 'Building ML Models',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/i_LwzRVP7bg',
        topics: ['Data Preparation', 'Model Training', 'Evaluation', 'Hyperparameter Tuning'],
        description: 'Train your own machine learning models from scratch.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'ML Model Training Guide', 
            duration: '35 min',
            url: 'https://scikit-learn.org/stable/tutorial/index.html',
            description: 'Official Scikit-learn tutorial covering model training, evaluation, and selection'
          },
          { 
            type: 'tutorial', 
            title: 'Feature Engineering Techniques', 
            duration: '30 min',
            url: 'https://www.kaggle.com/learn/feature-engineering',
            description: 'Kaggle Learn course on feature engineering with hands-on notebooks'
          },
          { 
            type: 'documentation', 
            title: 'Scikit-learn Model Selection', 
            duration: '20 min',
            url: 'https://scikit-learn.org/stable/model_selection.html',
            description: 'Comprehensive guide to cross-validation and hyperparameter tuning'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is feature engineering?',
              options: ['Building features', 'Creating and selecting relevant variables for models', 'Software engineering', 'UI design'],
              correctAnswer: 1
            },
            {
              question: 'What is train-test split?',
              options: ['Splitting data', 'Dividing data into training and testing sets to evaluate model', 'Team split', 'Time split'],
              correctAnswer: 1
            },
            {
              question: 'What is overfitting?',
              options: ['Too much data', 'Model memorizes training data but performs poorly on new data', 'Perfect model', 'Underfitting'],
              correctAnswer: 1
            },
            {
              question: 'What are hyperparameters?',
              options: ['Super parameters', 'Configuration settings set before training', 'Model outputs', 'Data parameters'],
              correctAnswer: 1
            },
            {
              question: 'What is cross-validation?',
              options: ['Checking twice', 'Technique to assess model performance using multiple train-test splits', 'Data validation', 'User validation'],
              correctAnswer: 1
            }
          ],
          passingScore: 80
        },
        lab: {
          title: 'Train Custom ML Model',
          duration: '120 min',
          tasks: [
            'Load and explore dataset',
            'Perform data cleaning and preprocessing',
            'Engineer relevant features',
            'Split data into train and test sets',
            'Train multiple models and compare',
            'Evaluate models with appropriate metrics',
            'Tune hyperparameters for best performance'
          ]
        }
      },
      {
        id: 'lesson7',
        title: 'Model Deployment & MLOps',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/QU76v3KfJ50',
        topics: ['Model Serving', 'APIs', 'Monitoring', 'Retraining'],
        description: 'Deploy and maintain ML models in production.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'MLOps Best Practices', 
            duration: '30 min',
            url: 'https://ml-ops.org/content/mlops-principles',
            description: 'MLOps principles for deploying and maintaining ML systems in production'
          },
          { 
            type: 'tutorial', 
            title: 'Model Deployment Guide', 
            duration: '25 min',
            url: 'https://aws.amazon.com/sagemaker/deploy/',
            description: 'AWS SageMaker deployment guide for production ML models'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is MLOps?',
              options: ['ML operations - practices for deploying and maintaining ML models', 'Machine Learning Options', 'ML optimization', 'Model learning'],
              correctAnswer: 0
            },
            {
              question: 'Why is model monitoring important?',
              options: ['Not important', 'Detect model degradation and data drift', 'Save money', 'Legal requirement'],
              correctAnswer: 1
            },
            {
              question: 'What is model versioning?',
              options: ['Deleting old models', 'Tracking different versions of models for reproducibility', 'Model naming', 'Model storage'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Deploy ML Model',
          duration: '90 min',
          tasks: [
            'Save trained model to file',
            'Create REST API for model predictions',
            'Deploy model to cloud platform',
            'Implement input validation and error handling',
            'Set up model monitoring',
            'Test deployed model with sample requests'
          ]
        }
      },
      {
        id: 'lesson8',
        title: 'AutoML & Low-Code AI',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/8YFATk8XuBk',
        topics: ['AutoML Platforms', 'No-Code Solutions', 'Rapid Prototyping'],
        description: 'Build AI solutions without extensive coding or ML expertise.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'AutoML Platforms Comparison', 
            duration: '20 min',
            url: 'https://cloud.google.com/automl',
            description: 'Google Cloud AutoML overview - train custom models without coding'
          },
          { 
            type: 'tutorial', 
            title: 'Using Google AutoML', 
            duration: '25 min',
            url: 'https://cloud.google.com/vertex-ai/docs/start/automl-users',
            description: 'Hands-on tutorial for building ML models with Vertex AI AutoML'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is AutoML?',
              options: ['Automatic Machine Learning - automating ML pipeline', 'Automotive ML', 'Auto repair ML', 'Automatic money'],
              correctAnswer: 0
            },
            {
              question: 'When should you use AutoML?',
              options: ['Always', 'For rapid prototyping and when lacking ML expertise', 'Never', 'Only for small data'],
              correctAnswer: 1
            },
            {
              question: 'What does AutoML automate?',
              options: ['Everything', 'Feature engineering, model selection, hyperparameter tuning', 'Just training', 'Just deployment'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Build Model with AutoML',
          duration: '75 min',
          tasks: [
            'Select AutoML platform (AWS, Azure, Google)',
            'Upload and prepare dataset',
            'Configure AutoML training job',
            'Review auto-selected model and features',
            'Evaluate model performance',
            'Deploy AutoML model and test predictions'
          ]
        }
      },
      {
        id: 'lesson9',
        title: 'Chatbots & Conversational AI',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/DJqpB4_a55o',
        topics: ['Chatbot Design', 'Intent Recognition', 'Dialogue Management'],
        description: 'Create intelligent chatbots and virtual assistants.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Conversational AI Design Patterns', 
            duration: '30 min',
            url: 'https://cloud.google.com/dialogflow/docs/concepts',
            description: 'Dialogflow concepts covering intents, entities, and conversation design'
          },
          { 
            type: 'tutorial', 
            title: 'Building Chatbots with Dialogflow', 
            duration: '30 min',
            url: 'https://cloud.google.com/dialogflow/docs/quick',
            description: 'Google Dialogflow quickstart - build your first chatbot in minutes'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What is intent recognition?',
              options: ['User authentication', 'Understanding user\'s goal from their message', 'Tracking users', 'Data storage'],
              correctAnswer: 1
            },
            {
              question: 'What are entities in chatbots?',
              options: ['Legal entities', 'Key information extracted from user input (dates, names, etc.)', 'Databases', 'Servers'],
              correctAnswer: 1
            },
            {
              question: 'What is dialogue management?',
              options: ['Managing dialogues', 'Controlling conversation flow and context', 'Speech synthesis', 'Voice recognition'],
              correctAnswer: 1
            },
            {
              question: 'What is NLU in chatbots?',
              options: ['Natural Language Understanding - interpreting user input', 'Network Language Upload', 'New Learning Unit', 'Neural Language Use'],
              correctAnswer: 0
            }
          ],
          passingScore: 75
        },
        lab: {
          title: 'Build Conversational Chatbot',
          duration: '90 min',
          tasks: [
            'Design chatbot conversation flow',
            'Define intents and entities',
            'Build chatbot using cloud service (Dialogflow, Lex, Bot Framework)',
            'Implement context and dialogue management',
            'Test chatbot with various inputs',
            'Integrate chatbot into web or messaging platform'
          ]
        }
      },
      {
        id: 'lesson10',
        title: 'Capstone: AI-Powered Application',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Project Planning', 'Model Integration', 'UI/UX', 'Deployment'],
        description: 'Build and deploy a complete AI-powered application.',
        learningMaterials: [
          { 
            type: 'template', 
            title: 'AI Project Blueprint', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/architecture/data-guide/big-data/machine-learning-at-scale',
            description: 'Azure ML architecture blueprint for production AI applications'
          },
          { 
            type: 'checklist', 
            title: 'AI Application Checklist', 
            duration: '10 min',
            url: 'https://developers.google.com/machine-learning/guides/rules-of-ml',
            description: 'Google\'s Rules of Machine Learning - practical checklist for ML projects'
          }
        ],
        quiz: {
          questions: [
            {
              question: 'What should be the first step in an AI project?',
              options: ['Choose technology', 'Define problem and success metrics', 'Build model', 'Deploy'],
              correctAnswer: 1
            },
            {
              question: 'Why is user experience important in AI applications?',
              options: ['Not important', 'Determines adoption and usability regardless of model accuracy', 'Optional', 'Only for design'],
              correctAnswer: 1
            },
            {
              question: 'What is A/B testing in ML?',
              options: ['Testing two models', 'Comparing different model versions with real users', 'Testing alphabet', 'Testing twice'],
              correctAnswer: 1
            }
          ],
          passingScore: 70
        },
        lab: {
          title: 'Complete AI Application Project',
          duration: '180 min',
          tasks: [
            'Define problem and requirements',
            'Select appropriate AI approach (pre-built API vs custom model)',
            'Build or integrate AI model',
            'Create user-friendly interface',
            'Implement error handling and fallbacks',
            'Deploy complete application',
            'Present project with demo and documentation'
          ]
        }
      }
    ]
  },

  'data-engineering-cloud': {
    id: 'data-engineering-cloud',
    title: 'Cloud Data Engineering',
    subtitle: 'Build Modern Data Pipelines',
    description: 'Master big data processing, ETL pipelines, and analytics on cloud platforms.',
    price: 697,
    duration: '35 hours',
    level: 'Intermediate',
    category: 'Data',
    color: '#8b5cf6',
    icon: '📊',
    skills: ['Data Pipelines', 'ETL', 'Data Warehousing', 'Big Data', 'Analytics'],
    
    // Lab Environment Setup Instructions
    labSetup: {
      title: 'Getting Your Lab Environment Ready',
      description: 'You\'ll need access to cloud platforms to complete hands-on labs. Here are your options:',
      options: [
        {
          name: 'AWS Free Tier (Recommended for Beginners)',
          steps: [
            'Visit https://aws.amazon.com/free/',
            'Click "Create a Free Account"',
            'Provide email, password, and AWS account name',
            'Enter payment information (required but won\'t be charged for free tier usage)',
            'Verify your phone number',
            'Choose "Basic Support - Free" plan',
            'Sign in to AWS Console at https://console.aws.amazon.com/',
            '⚠️ Set up billing alerts to avoid unexpected charges: CloudWatch > Billing > Create Alarm'
          ],
          duration: '10-15 minutes',
          cost: 'Free for 12 months (with usage limits)',
          url: 'https://aws.amazon.com/free/'
        },
        {
          name: 'Azure Free Account',
          steps: [
            'Visit https://azure.microsoft.com/free/',
            'Click "Start free"',
            'Sign in with Microsoft account (or create one)',
            'Enter personal information and phone verification',
            'Add credit card for identity verification ($200 credit provided)',
            'Complete identity verification',
            'Access Azure Portal at https://portal.azure.com/',
            '💡 Tip: Use Azure Cost Management to track your spending'
          ],
          duration: '10-15 minutes',
          cost: '$200 credit for 30 days + 12 months of free services',
          url: 'https://azure.microsoft.com/free/'
        },
        {
          name: 'Google Cloud Free Tier',
          steps: [
            'Visit https://cloud.google.com/free/',
            'Click "Get started for free"',
            'Sign in with Google account',
            'Enter billing information ($300 credit for 90 days)',
            'Select country and accept terms',
            'Access GCP Console at https://console.cloud.google.com/',
            'Create your first project',
            '📊 Enable billing alerts in Billing > Budgets & Alerts'
          ],
          duration: '10 minutes',
          cost: '$300 credit for 90 days + Always Free tier',
          url: 'https://cloud.google.com/free/'
        },
        {
          name: 'Use Your Existing Cloud Account',
          steps: [
            '✅ If you already have AWS/Azure/GCP access through work or school, you can use that',
            'Ensure you have permissions to create: VMs, storage, networks, and basic services',
            'Check with your organization about cost allocation tags or budget limits',
            'Use a separate resource group/project for course labs to keep things organized',
            '🏷️ Tag all resources with "Course: Data Engineering Cloud" for easy cleanup'
          ],
          duration: '5 minutes',
          cost: 'Depends on your organization\'s arrangement'
        },
        {
          name: 'Cloud Sandboxes & Practice Environments (No Credit Card Required)',
          steps: [
            '🧪 A Cloud Guru Sandbox: https://acloudguru.com/platform/cloud-sandbox-playgrounds',
            '🎮 AWS CloudQuest (gamified learning): https://aws.amazon.com/training/digital/aws-cloud-quest/',
            '🔬 Azure Learn Sandbox: Built into Microsoft Learn modules (https://learn.microsoft.com/training/azure/)',
            '🧑‍🔬 Qwiklabs for GCP: https://www.cloudskillsboost.google/ (free labs available)',
            '💻 Instruqt Interactive Labs: https://play.instruqt.com/public',
            'These are temporary environments (1-4 hours) - perfect for trying things without commitment'
          ],
          duration: 'Instant access',
          cost: 'Free (time-limited sessions)'
        }
      ],
      recommendations: [
        '📊 Data engineers: Storage and data transfer can incur costs - monitor BigQuery, Redshift usage',
        '💳 Recommended: GCP for BigQuery free tier (1TB queries/month) or AWS for Athena',
        '💰 Cost warning: Spark clusters and data warehouses can be expensive - terminate after labs',
        '🎯 Pro tip: Use serverless data services (BigQuery, Athena, Synapse Serverless) to minimize costs',
        '📈 Dataset tip: Use public datasets (Google Public Datasets, AWS Open Data) - free to query'
      ]
    },
    
    // Coding Prerequisites
    codingPrerequisites: {
      required: true,
      description: 'Python and SQL are essential for data engineering - ETL scripts, data transformations, and pipeline development.',
      languages: [
        {
          name: 'Python',
          why: 'Core language for data engineering - ETL scripts, Spark/PySpark, data processing pipelines',
          skillLevel: 'Advanced - pandas, PySpark, data manipulation',
          learningResources: [
            { title: 'Python for Beginners - Microsoft', url: 'https://learn.microsoft.com/training/paths/beginner-python/', duration: '8 hours', type: 'free' },
            { title: 'Python Tutorial - W3Schools', url: 'https://www.w3schools.com/python/', duration: 'Self-paced', type: 'free' },
            { title: 'Learn Python - Codecademy', url: 'https://www.codecademy.com/learn/learn-python-3', duration: '25 hours', type: 'freemium' },
            { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', duration: 'Book + Videos', type: 'free' }
          ],
          quickStart: [
            'Install Python: https://www.python.org/downloads/',
            'Try it online: https://repl.it/languages/python3',
            'Learn basics: variables, functions, loops, lists (2-3 hours)',
            'Practice: Read CSV, transform data, write to database'
          ]
        },
        {
          name: 'PowerShell',
          why: 'Useful for Azure Data Factory, Synapse automation, and data pipeline orchestration',
          skillLevel: 'Basic - optional for Azure data services',
          learningResources: [
            { title: 'PowerShell 101 - Microsoft', url: 'https://learn.microsoft.com/powershell/scripting/learn/ps101/00-introduction', duration: '5 hours', type: 'free' },
            { title: 'PowerShell Tutorial - TutorialsPoint', url: 'https://www.tutorialspoint.com/powershell/index.htm', duration: 'Self-paced', type: 'free' },
            { title: 'Introduction to PowerShell - Pluralsight', url: 'https://www.pluralsight.com/courses/powershell-intro', duration: '3 hours', type: 'paid' },
            { title: 'Learn PowerShell in a Month of Lunches', url: 'https://www.manning.com/books/learn-powershell-in-a-month-of-lunches', duration: 'Book', type: 'paid' }
          ],
          quickStart: [
            'Already installed on Windows! Open "Windows PowerShell"',
            'Mac/Linux: Install PowerShell Core from https://github.com/PowerShell/PowerShell',
            'Learn basics: cmdlets (Get-, Set-, New-), variables, pipelines (2 hours)',
            'Practice: Invoke-AzDataFactoryPipeline, manage data services'
          ]
        },
        {
          name: 'Bash/Shell Scripting',
          why: 'Essential for data pipeline orchestration, Spark job submission, and Linux data processing',
          skillLevel: 'Intermediate - scripting, cron jobs, automation',
          learningResources: [
            { title: 'Bash Scripting Tutorial', url: 'https://linuxconfig.org/bash-scripting-tutorial', duration: '4 hours', type: 'free' },
            { title: 'Shell Scripting - Linux Journey', url: 'https://linuxjourney.com/lesson/the-shell', duration: 'Self-paced', type: 'free' },
            { title: 'Bash Guide for Beginners', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', duration: 'Reference', type: 'free' }
          ],
          quickStart: [
            'Mac/Linux: Already have it! Open Terminal',
            'Windows: Use Git Bash (https://gitforwindows.org/) or WSL',
            'Learn basics: ls, cd, grep, pipes, variables (1-2 hours)',
            'Practice: Schedule data pipeline jobs with cron'
          ]
        }
      ],
      recommendation: '📊 Python and SQL are CRITICAL. Dedicate 3-4 weeks to Python + SQL fundamentals before starting this course.'
    },
    
    // Certification Exam Preparation
    certifications: [
      { name: 'AWS Certified Data Analytics - Specialty', provider: 'AWS', code: 'DAS-C01' },
      { name: 'Microsoft Azure Data Engineer Associate', provider: 'Microsoft', code: 'DP-203' },
      { name: 'Google Professional Data Engineer', provider: 'Google Cloud', code: 'PDE' }
    ],
    
    // Career Paths & Job Roles
    careerPaths: [
      { role: 'Data Engineer', avgSalary: '$105,000 - $145,000', demand: 'Very High' },
      { role: 'Big Data Engineer', avgSalary: '$110,000 - $150,000', demand: 'High' },
      { role: 'Data Architect', avgSalary: '$120,000 - $160,000', demand: 'High' },
      { role: 'Analytics Engineer', avgSalary: '$100,000 - $135,000', demand: 'Very High' }
    ],
    
    // Detailed Syllabus
    syllabus: {
      overview: 'This comprehensive data engineering course teaches you to build scalable data pipelines, process big data, implement ETL workflows, and create analytics solutions using modern cloud platforms and tools.',
      prerequisites: 'Basic SQL knowledge, Programming experience (Python recommended), Basic cloud computing understanding',
      outcomes: [
        'Design and build scalable data pipelines',
        'Process and analyze big data with Spark',
        'Implement ETL and ELT workflows',
        'Build data warehouses and lakes',
        'Create real-time streaming data solutions',
        'Pass data engineering certification exams'
      ],
      weekByWeek: [
        { week: 1, topics: ['Data Engineering Fundamentals', 'Cloud Storage'], labs: 2 },
        { week: 2, topics: ['SQL & Querying', 'ETL Design'], labs: 2 },
        { week: 3, topics: ['Big Data with Spark', 'Data Warehousing'], labs: 2 },
        { week: 4, topics: ['Stream Processing', 'Pipeline Orchestration'], labs: 2 },
        { week: 5, topics: ['Analytics & Visualization', 'DataOps'], labs: 2 },
        { week: 6, topics: ['Capstone Project'], labs: 2 }
      ]
    },
    
    // Downloadable Resources
    resources: [
      { title: 'Data Engineering Best Practices (PDF)', type: 'pdf', size: '8 MB' },
      { title: 'SQL Query Optimization Guide', type: 'pdf', size: '4 MB' },
      { title: 'Spark Programming Cookbook', type: 'pdf', size: '6 MB' },
      { title: 'ETL Pipeline Templates', type: 'zip', size: '12 MB' },
      { title: 'Data Modeling Patterns', type: 'pdf', size: '5 MB' },
      { title: 'Airflow DAG Examples', type: 'zip', size: '8 MB' },
      { title: 'Data Architecture Diagrams', type: 'zip', size: '15 MB' }
    ],
    
    lessons: [
      {
        id: 'lesson1',
        title: 'Data Engineering Fundamentals',
        duration: '75 min',
        video: 'https://www.youtube.com/embed/qWru-b6m030',
        topics: ['Data Architecture', 'Batch vs Streaming', 'Data Modeling'],
        description: 'Understand the role and responsibilities of data engineers.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Data Engineering Roles and Responsibilities', 
            duration: '25 min',
            url: 'https://aws.amazon.com/what-is/data-engineering/',
            description: 'AWS guide to data engineering covering roles, skills, and career path'
          },
          { 
            type: 'video', 
            title: 'Batch vs Stream Processing', 
            duration: '20 min',
            url: 'https://www.youtube.com/watch?v=A_mstzRGfIE',
            description: 'Clear comparison of batch and stream processing patterns with use cases'
          },
          { 
            type: 'reading', 
            title: 'Data Modeling Fundamentals', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/training/modules/design-multidimensional-schema/',
            description: 'Microsoft Learn module on dimensional modeling and star schema design'
          }
        ]
      },
      {
        id: 'lesson2',
        title: 'Cloud Data Storage Solutions',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/rLvC4LxDX1I',
        topics: ['Data Lakes', 'Object Storage', 'Databases', 'File Formats'],
        description: 'Choose and implement appropriate storage solutions for your data.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Data Lake vs Data Warehouse', 
            duration: '30 min',
            url: 'https://aws.amazon.com/big-data/datalakes-and-analytics/what-is-a-data-lake/',
            description: 'AWS comprehensive guide to data lakes, warehouses, and when to use each'
          },
          { 
            type: 'documentation', 
            title: 'Parquet and ORC File Formats', 
            duration: '20 min',
            url: 'https://parquet.apache.org/docs/',
            description: 'Official Parquet documentation - columnar storage format for analytics'
          },
          { 
            type: 'tutorial', 
            title: 'Azure Data Lake Storage Tutorial', 
            duration: '25 min',
            url: 'https://learn.microsoft.com/training/modules/introduction-to-azure-data-lake-storage/',
            description: 'Microsoft Learn hands-on tutorial with Azure Data Lake Gen2'
          }
        ]
      },
      {
        id: 'lesson3',
        title: 'SQL & Data Querying',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/HXV3zeQKqGY',
        topics: ['SQL Basics', 'Joins', 'Aggregations', 'Query Optimization'],
        description: 'Master SQL for data analysis and transformation.',
        learningMaterials: [
          { 
            type: 'interactive', 
            title: 'SQL Interactive Tutorial', 
            duration: '40 min',
            url: 'https://www.w3schools.com/sql/',
            description: 'Interactive SQL tutorial with tryit editor - learn by doing'
          },
          { 
            type: 'reading', 
            title: 'Query Optimization Best Practices', 
            duration: '30 min',
            url: 'https://use-the-index-luke.com/',
            description: 'Comprehensive guide to SQL indexing and query optimization'
          },
          { 
            type: 'tutorial', 
            title: 'BigQuery SQL Syntax', 
            duration: '25 min',
            url: 'https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax',
            description: 'Google BigQuery SQL reference for cloud data warehousing'
          }
        ]
      },
      {
        id: 'lesson4',
        title: 'ETL Pipeline Design',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/JXh1T2xQNIs',
        topics: ['Extract', 'Transform', 'Load', 'Data Quality', 'Error Handling'],
        description: 'Design and build efficient ETL pipelines for data processing.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'ETL Best Practices Guide', 
            duration: '35 min',
            url: 'https://aws.amazon.com/what-is/etl/',
            description: 'AWS comprehensive ETL guide covering design patterns and best practices'
          },
          { 
            type: 'tutorial', 
            title: 'Azure Data Factory Tutorial', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/training/modules/intro-to-azure-data-factory/',
            description: 'Microsoft Learn hands-on tutorial for building ETL pipelines'
          },
          { 
            type: 'documentation', 
            title: 'Apache NiFi Documentation', 
            duration: '25 min',
            url: 'https://nifi.apache.org/docs.html',
            description: 'Open-source data flow automation tool documentation'
          }
        ]
      },
      {
        id: 'lesson5',
        title: 'Big Data Processing with Spark',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/9mELEARcxJo',
        topics: ['Spark Architecture', 'DataFrames', 'RDDs', 'Spark SQL'],
        description: 'Process massive datasets with Apache Spark.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'Apache Spark Quickstart', 
            duration: '40 min',
            url: 'https://spark.apache.org/docs/latest/quick-start.html',
            description: 'Official Spark tutorial covering DataFrames, SQL, and transformations'
          },
          { 
            type: 'interactive', 
            title: 'Databricks Learning Academy', 
            duration: '60 min',
            url: 'https://www.databricks.com/learn/training/home',
            description: 'Free Databricks courses with interactive Spark notebooks'
          },
          { 
            type: 'reading', 
            title: 'PySpark Best Practices', 
            duration: '25 min',
            url: 'https://spark.apache.org/docs/latest/api/python/getting_started/index.html',
            description: 'PySpark getting started guide with Python best practices'
          }
        ]
      },
      {
        id: 'lesson6',
        title: 'Data Warehousing',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/J0SLCwSz-0o',
        topics: ['Snowflake', 'Redshift', 'BigQuery', 'Schema Design'],
        description: 'Build scalable data warehouses for analytics.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'Snowflake Getting Started', 
            duration: '35 min',
            url: 'https://quickstarts.snowflake.com/',
            description: 'Snowflake quickstarts with hands-on tutorials (free trial available)'
          },
          { 
            type: 'documentation', 
            title: 'Google BigQuery Best Practices', 
            duration: '30 min',
            url: 'https://cloud.google.com/bigquery/docs/best-practices',
            description: 'Google Cloud BigQuery optimization and schema design guide'
          },
          { 
            type: 'reading', 
            title: 'Star Schema vs Snowflake Schema', 
            duration: '20 min',
            url: 'https://learn.microsoft.com/training/modules/design-multidimensional-schema/',
            description: 'Microsoft Learn module on dimensional modeling approaches'
          }
        ]
      },
      {
        id: 'lesson7',
        title: 'Stream Processing',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/avi-TZI9t2I',
        topics: ['Kafka', 'Kinesis', 'Real-time Processing', 'Event Streaming'],
        description: 'Process and analyze data in real-time with streaming technologies.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'Apache Kafka Quickstart', 
            duration: '40 min',
            url: 'https://kafka.apache.org/quickstart',
            description: 'Official Kafka quickstart guide with hands-on examples'
          },
          { 
            type: 'documentation', 
            title: 'AWS Kinesis Developer Guide', 
            duration: '35 min',
            url: 'https://docs.aws.amazon.com/streams/latest/dev/introduction.html',
            description: 'Complete guide to Amazon Kinesis Data Streams'
          },
          { 
            type: 'interactive', 
            title: 'Stream Processing Patterns', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/training/modules/intro-to-azure-stream-analytics/',
            description: 'Microsoft Learn module on real-time analytics with Azure Stream Analytics'
          }
        ]
      },
      {
        id: 'lesson8',
        title: 'Data Pipeline Orchestration',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/AHMm1wfGuHE',
        topics: ['Apache Airflow', 'Workflow DAGs', 'Scheduling', 'Monitoring'],
        description: 'Orchestrate complex data workflows with Apache Airflow.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'Apache Airflow Tutorial', 
            duration: '40 min',
            url: 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html',
            description: 'Official Airflow tutorial covering DAGs, operators, and scheduling'
          },
          { 
            type: 'documentation', 
            title: 'Airflow Best Practices', 
            duration: '30 min',
            url: 'https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html',
            description: 'Airflow best practices for production deployments'
          },
          { 
            type: 'video', 
            title: 'Building Production DAGs', 
            duration: '25 min',
            url: 'https://www.youtube.com/watch?v=43wHwwZhJMo',
            description: 'Conference talk on building robust production data pipelines with Airflow'
          }
        ]
      },
      {
        id: 'lesson9',
        title: 'Data Analytics & Visualization',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/TPMlZxRRaBQ',
        topics: ['BI Tools', 'Tableau', 'Power BI', 'Dashboard Design'],
        description: 'Create insightful visualizations and dashboards from your data.',
        learningMaterials: [
          { 
            type: 'interactive', 
            title: 'Power BI Getting Started', 
            duration: '40 min',
            url: 'https://learn.microsoft.com/training/paths/create-use-analytics-reports-power-bi/',
            description: 'Microsoft Learn path for Power BI with hands-on exercises (free)'
          },
          { 
            type: 'tutorial', 
            title: 'Tableau Public Tutorial', 
            duration: '35 min',
            url: 'https://public.tableau.com/app/learn/how-to-videos',
            description: 'Free Tableau Public tutorials with sample visualizations'
          },
          { 
            type: 'reading', 
            title: 'Dashboard Design Best Practices', 
            duration: '20 min',
            url: 'https://www.tableau.com/learn/articles/best-practices-dashboard-design',
            description: 'Tableau guide to effective dashboard design principles'
          }
        ]
      },
      {
        id: 'lesson10',
        title: 'DataOps & Pipeline Automation',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/FSp6BE33noU',
        topics: ['CI/CD for Data', 'Testing', 'Monitoring', 'Version Control'],
        description: 'Apply DevOps principles to data engineering workflows.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'DataOps Principles', 
            duration: '25 min',
            url: 'https://dataopsmanifesto.org/',
            description: 'DataOps Manifesto - principles and practices for data teams'
          },
          { 
            type: 'tutorial', 
            title: 'Data Pipeline Testing', 
            duration: '30 min',
            url: 'https://greatexpectations.io/gx/get-started',
            description: 'Great Expectations tutorial for data quality testing and validation'
          },
          { 
            type: 'documentation', 
            title: 'dbt (Data Build Tool)', 
            duration: '20 min',
            url: 'https://docs.getdbt.com/docs/introduction',
            description: 'dbt documentation - transform data in your warehouse with SQL'
          }
        ]
      },
      {
        id: 'lesson11',
        title: 'Capstone: End-to-End Data Pipeline',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Requirements Analysis', 'Architecture Design', 'Implementation', 'Testing'],
        description: 'Build a complete data pipeline from ingestion to visualization.',
        learningMaterials: [
          { 
            type: 'template', 
            title: 'Data Pipeline Architecture Template', 
            duration: '20 min',
            url: 'https://aws.amazon.com/architecture/data-analytics/',
            description: 'AWS data analytics reference architectures and templates'
          },
          { 
            type: 'checklist', 
            title: 'Data Engineering Project Checklist', 
            duration: '15 min',
            url: 'https://learn.microsoft.com/azure/architecture/data-guide/',
            description: 'Azure data architecture guide with planning checklist'
          },
          { 
            type: 'case-study', 
            title: 'Production Data Pipeline Case Studies', 
            duration: '25 min',
            url: 'https://aws.amazon.com/solutions/case-studies/analytics/',
            description: 'Real-world analytics and data engineering case studies from AWS'
          }
        ]
      }
    ]
  },

  'serverless-microservices': {
    id: 'serverless-microservices',
    title: 'Serverless & Microservices Architecture',
    subtitle: 'Build Scalable Modern Applications',
    description: 'Build serverless applications and microservices with AWS Lambda, Azure Functions, and more.',
    price: 597,
    duration: '28 hours',
    level: 'Advanced',
    category: 'Development',
    color: '#ec4899',
    icon: '⚡',
    skills: ['Serverless', 'Microservices', 'API Design', 'Event-Driven Architecture', 'Containers'],
    
    // Lab Environment Setup Instructions
    labSetup: {
      title: 'Getting Your Lab Environment Ready',
      description: 'You\'ll need access to cloud platforms to complete hands-on labs. Here are your options:',
      options: [
        {
          name: 'AWS Free Tier (Recommended for Beginners)',
          steps: [
            'Visit https://aws.amazon.com/free/',
            'Click "Create a Free Account"',
            'Provide email, password, and AWS account name',
            'Enter payment information (required but won\'t be charged for free tier usage)',
            'Verify your phone number',
            'Choose "Basic Support - Free" plan',
            'Sign in to AWS Console at https://console.aws.amazon.com/',
            '⚠️ Set up billing alerts to avoid unexpected charges: CloudWatch > Billing > Create Alarm'
          ],
          duration: '10-15 minutes',
          cost: 'Free for 12 months (with usage limits)',
          url: 'https://aws.amazon.com/free/'
        },
        {
          name: 'Azure Free Account',
          steps: [
            'Visit https://azure.microsoft.com/free/',
            'Click "Start free"',
            'Sign in with Microsoft account (or create one)',
            'Enter personal information and phone verification',
            'Add credit card for identity verification ($200 credit provided)',
            'Complete identity verification',
            'Access Azure Portal at https://portal.azure.com/',
            '💡 Tip: Use Azure Cost Management to track your spending'
          ],
          duration: '10-15 minutes',
          cost: '$200 credit for 30 days + 12 months of free services',
          url: 'https://azure.microsoft.com/free/'
        },
        {
          name: 'Google Cloud Free Tier',
          steps: [
            'Visit https://cloud.google.com/free/',
            'Click "Get started for free"',
            'Sign in with Google account',
            'Enter billing information ($300 credit for 90 days)',
            'Select country and accept terms',
            'Access GCP Console at https://console.cloud.google.com/',
            'Create your first project',
            '📊 Enable billing alerts in Billing > Budgets & Alerts'
          ],
          duration: '10 minutes',
          cost: '$300 credit for 90 days + Always Free tier',
          url: 'https://cloud.google.com/free/'
        },
        {
          name: 'Use Your Existing Cloud Account',
          steps: [
            '✅ If you already have AWS/Azure/GCP access through work or school, you can use that',
            'Ensure you have permissions to create: VMs, storage, networks, and basic services',
            'Check with your organization about cost allocation tags or budget limits',
            'Use a separate resource group/project for course labs to keep things organized',
            '🏷️ Tag all resources with "Course: Serverless Microservices" for easy cleanup'
          ],
          duration: '5 minutes',
          cost: 'Depends on your organization\'s arrangement'
        },
        {
          name: 'Cloud Sandboxes & Practice Environments (No Credit Card Required)',
          steps: [
            '🧪 A Cloud Guru Sandbox: https://acloudguru.com/platform/cloud-sandbox-playgrounds',
            '🎮 AWS CloudQuest (gamified learning): https://aws.amazon.com/training/digital/aws-cloud-quest/',
            '🔬 Azure Learn Sandbox: Built into Microsoft Learn modules (https://learn.microsoft.com/training/azure/)',
            '🧑‍🔬 Qwiklabs for GCP: https://www.cloudskillsboost.google/ (free labs available)',
            '💻 Instruqt Interactive Labs: https://play.instruqt.com/public',
            'These are temporary environments (1-4 hours) - perfect for trying things without commitment'
          ],
          duration: 'Instant access',
          cost: 'Free (time-limited sessions)'
        }
      ],
      recommendations: [
        '⚡ Serverless learners: Lambda/Functions have very generous free tiers - 1M requests/month free!',
        '💳 Recommended: AWS Lambda for extensive free tier or Azure Functions for hybrid scenarios',
        '💡 Cost-efficient: Serverless is pay-per-use - you\'ll spend cents, not dollars, on labs',
        '🎯 Pro tip: API Gateway and event sources have separate costs - monitor CloudWatch invocations',
        '🐳 Containers: Use local Docker Desktop for development before deploying to cloud'
      ]
    },
    
    // Coding Prerequisites
    codingPrerequisites: {
      required: true,
      description: 'Writing serverless functions and microservices requires solid programming skills in Python or Node.js.',
      languages: [
        {
          name: 'Python',
          why: 'Primary language for AWS Lambda functions, data processing, and microservices development',
          skillLevel: 'Advanced - functions, async, APIs, frameworks (Flask/FastAPI)',
          learningResources: [
            { title: 'Python for Beginners - Microsoft', url: 'https://learn.microsoft.com/training/paths/beginner-python/', duration: '8 hours', type: 'free' },
            { title: 'Python Tutorial - W3Schools', url: 'https://www.w3schools.com/python/', duration: 'Self-paced', type: 'free' },
            { title: 'Learn Python - Codecademy', url: 'https://www.codecademy.com/learn/learn-python-3', duration: '25 hours', type: 'freemium' },
            { title: 'Automate the Boring Stuff with Python', url: 'https://automatetheboringstuff.com/', duration: 'Book + Videos', type: 'free' }
          ],
          quickStart: [
            'Install Python: https://www.python.org/downloads/',
            'Try it online: https://repl.it/languages/python3',
            'Learn basics: variables, functions, loops, lists (2-3 hours)',
            'Practice: Build a REST API with Flask'
          ]
        },
        {
          name: 'PowerShell',
          why: 'Useful for Azure Functions deployment and infrastructure management',
          skillLevel: 'Basic - optional for Azure Functions workflows',
          learningResources: [
            { title: 'PowerShell 101 - Microsoft', url: 'https://learn.microsoft.com/powershell/scripting/learn/ps101/00-introduction', duration: '5 hours', type: 'free' },
            { title: 'PowerShell Tutorial - TutorialsPoint', url: 'https://www.tutorialspoint.com/powershell/index.htm', duration: 'Self-paced', type: 'free' },
            { title: 'Introduction to PowerShell - Pluralsight', url: 'https://www.pluralsight.com/courses/powershell-intro', duration: '3 hours', type: 'paid' },
            { title: 'Learn PowerShell in a Month of Lunches', url: 'https://www.manning.com/books/learn-powershell-in-a-month-of-lunches', duration: 'Book', type: 'paid' }
          ],
          quickStart: [
            'Already installed on Windows! Open "Windows PowerShell"',
            'Mac/Linux: Install PowerShell Core from https://github.com/PowerShell/PowerShell',
            'Learn basics: cmdlets (Get-, Set-, New-), variables, pipelines (2 hours)',
            'Practice: Publish-AzWebApp, deploy functions'
          ]
        },
        {
          name: 'Bash/Shell Scripting',
          why: 'Essential for container orchestration, deployment scripts, and CI/CD pipelines',
          skillLevel: 'Intermediate - scripting, Docker commands, automation',
          learningResources: [
            { title: 'Bash Scripting Tutorial', url: 'https://linuxconfig.org/bash-scripting-tutorial', duration: '4 hours', type: 'free' },
            { title: 'Shell Scripting - Linux Journey', url: 'https://linuxjourney.com/lesson/the-shell', duration: 'Self-paced', type: 'free' },
            { title: 'Bash Guide for Beginners', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', duration: 'Reference', type: 'free' }
          ],
          quickStart: [
            'Mac/Linux: Already have it! Open Terminal',
            'Windows: Use Git Bash (https://gitforwindows.org/) or WSL',
            'Learn basics: ls, cd, grep, pipes, variables (1-2 hours)',
            'Practice: Write Docker build and deployment scripts'
          ]
        }
      ],
      recommendation: '⚡ Strong programming skills in Python or Node.js are REQUIRED. Complete an intermediate programming course first.'
    },
    
    lessons: [
      {
        id: 'lesson1',
        title: 'Microservices Architecture Principles',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/CdBtNQZH8a4',
        topics: ['Microservices vs Monolith', 'Service Boundaries', 'Communication Patterns'],
        description: 'Understand the principles and benefits of microservices architecture.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Microservices Patterns', 
            duration: '30 min',
            url: 'https://microservices.io/patterns/microservices.html',
            description: 'Comprehensive catalog of microservices patterns from Chris Richardson'
          },
          { 
            type: 'video', 
            title: 'Monolith to Microservices', 
            duration: '25 min',
            url: 'https://www.youtube.com/watch?v=CdBtNQZH8a4',
            description: 'Martin Fowler talk on transitioning from monolith to microservices'
          },
          { 
            type: 'case-study', 
            title: 'Netflix Microservices Architecture', 
            duration: '20 min',
            url: 'https://netflixtechblog.com/tagged/microservices',
            description: 'Netflix Tech Blog - real-world microservices at scale'
          }
        ]
      },
      {
        id: 'lesson2',
        title: 'Serverless Computing Fundamentals',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/W_VV2Fx32_Y',
        topics: ['FaaS Concepts', 'Event-Driven', 'Cold Starts', 'Use Cases'],
        description: 'Learn the fundamentals of serverless computing and when to use it.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Serverless Architecture Patterns', 
            duration: '25 min',
            url: 'https://aws.amazon.com/serverless/',
            description: 'AWS serverless overview covering FaaS, BaaS, and event-driven patterns'
          },
          { 
            type: 'video', 
            title: 'Serverless Best Practices', 
            duration: '30 min',
            url: 'https://www.youtube.com/watch?v=W_VV2Fx32_Y',
            description: 'AWS re:Invent talk on serverless best practices and cold start mitigation'
          },
          { 
            type: 'documentation', 
            title: 'Serverless Framework Guide', 
            duration: '20 min',
            url: 'https://www.serverless.com/framework/docs',
            description: 'Serverless Framework documentation for multi-cloud deployments'
          }
        ]
      },
      {
        id: 'lesson3',
        title: 'AWS Lambda Deep Dive',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/97q30JjEq9Y',
        topics: ['Lambda Functions', 'Triggers', 'Layers', 'Performance Optimization'],
        description: 'Master AWS Lambda for building serverless applications.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'AWS Lambda Getting Started', 
            duration: '40 min',
            url: 'https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html',
            description: 'Official AWS Lambda tutorial with Python, Node.js, and other runtimes'
          },
          { 
            type: 'documentation', 
            title: 'Lambda Best Practices', 
            duration: '35 min',
            url: 'https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html',
            description: 'AWS Lambda best practices for production workloads'
          },
          { 
            type: 'interactive', 
            title: 'Serverless Application Model (SAM)', 
            duration: '30 min',
            url: 'https://aws.amazon.com/serverless/sam/',
            description: 'AWS SAM for building and deploying serverless applications'
          }
        ]
      },
      {
        id: 'lesson4',
        title: 'Azure Functions',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/zIfxkub7CLY',
        topics: ['Function Apps', 'Bindings', 'Durable Functions', 'Integration'],
        description: 'Build serverless applications on Microsoft Azure.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'Azure Functions Quickstart', 
            duration: '35 min',
            url: 'https://learn.microsoft.com/azure/azure-functions/functions-get-started',
            description: 'Microsoft Learn module for Azure Functions with hands-on labs'
          },
          { 
            type: 'documentation', 
            title: 'Durable Functions Guide', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/azure/azure-functions/durable/durable-functions-overview',
            description: 'Azure Durable Functions for stateful serverless workflows'
          },
          { 
            type: 'video', 
            title: 'Azure Functions Patterns', 
            duration: '25 min',
            url: 'https://www.youtube.com/watch?v=zIfxkub7CLY',
            description: 'Microsoft Azure conference talk on serverless patterns'
          }
        ]
      },
      {
        id: 'lesson5',
        title: 'API Gateway & REST APIs',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Sku1P6IhjP8',
        topics: ['API Design', 'Gateway Patterns', 'Authentication', 'Rate Limiting'],
        description: 'Design and implement scalable RESTful APIs.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'REST API Design Best Practices', 
            duration: '30 min',
            url: 'https://restfulapi.net/',
            description: 'Comprehensive REST API design guide with examples'
          },
          { 
            type: 'tutorial', 
            title: 'AWS API Gateway Tutorial', 
            duration: '35 min',
            url: 'https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started.html',
            description: 'AWS API Gateway getting started with Lambda integration'
          },
          { 
            type: 'documentation', 
            title: 'API Security Best Practices', 
            duration: '25 min',
            url: 'https://owasp.org/www-project-api-security/',
            description: 'OWASP API Security Top 10 with mitigation strategies'
          }
        ]
      },
      {
        id: 'lesson6',
        title: 'Event-Driven Architecture',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/o2HJCGcYwoU',
        topics: ['Event Sourcing', 'CQRS', 'Message Queues', 'Event Buses'],
        description: 'Build reactive systems with event-driven architecture.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Event-Driven Architecture Patterns', 
            duration: '35 min',
            url: 'https://aws.amazon.com/event-driven-architecture/',
            description: 'AWS guide to event-driven architecture with patterns and examples'
          },
          { 
            type: 'tutorial', 
            title: 'CQRS and Event Sourcing', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/azure/architecture/patterns/cqrs',
            description: 'Microsoft architecture pattern guide for CQRS and event sourcing'
          },
          { 
            type: 'documentation', 
            title: 'Amazon EventBridge Guide', 
            duration: '25 min',
            url: 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html',
            description: 'AWS EventBridge documentation for serverless event bus'
          }
        ]
      },
      {
        id: 'lesson7',
        title: 'Service Mesh & Communication',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/16fgzklcF7Y',
        topics: ['Istio', 'Service Discovery', 'Load Balancing', 'Circuit Breakers'],
        description: 'Manage microservices communication with service mesh.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'Istio Getting Started', 
            duration: '40 min',
            url: 'https://istio.io/latest/docs/setup/getting-started/',
            description: 'Official Istio tutorial for service mesh with Kubernetes'
          },
          { 
            type: 'documentation', 
            title: 'Linkerd Service Mesh', 
            duration: '30 min',
            url: 'https://linkerd.io/2.14/getting-started/',
            description: 'Linkerd lightweight service mesh documentation'
          },
          { 
            type: 'reading', 
            title: 'Circuit Breaker Pattern', 
            duration: '20 min',
            url: 'https://learn.microsoft.com/azure/architecture/patterns/circuit-breaker',
            description: 'Microsoft architecture pattern for fault tolerance'
          }
        ]
      },
      {
        id: 'lesson8',
        title: 'Distributed Data Management',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/YhavdmgxW00',
        topics: ['Database per Service', 'Saga Pattern', 'Eventual Consistency'],
        description: 'Handle data in distributed microservices systems.',
        learningMaterials: [
          { 
            type: 'reading', 
            title: 'Saga Pattern Guide', 
            duration: '30 min',
            url: 'https://microservices.io/patterns/data/saga.html',
            description: 'Saga pattern for managing distributed transactions'
          },
          { 
            type: 'documentation', 
            title: 'Database per Service Pattern', 
            duration: '25 min',
            url: 'https://microservices.io/patterns/data/database-per-service.html',
            description: 'Pattern for data ownership in microservices'
          },
          { 
            type: 'tutorial', 
            title: 'Event-Driven Data Management', 
            duration: '30 min',
            url: 'https://aws.amazon.com/blogs/database/building-event-driven-architectures-with-amazon-dynamodb/',
            description: 'AWS guide to event-driven data management with DynamoDB'
          }
        ]
      },
      {
        id: 'lesson9',
        title: 'Observability & Monitoring',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/h4Sl21AKiDg',
        topics: ['Distributed Tracing', 'Logging', 'Metrics', 'Alerting'],
        description: 'Monitor and troubleshoot microservices in production.',
        learningMaterials: [
          { 
            type: 'tutorial', 
            title: 'Distributed Tracing with Jaeger', 
            duration: '30 min',
            url: 'https://www.jaegertracing.io/docs/1.54/getting-started/',
            description: 'Jaeger distributed tracing quickstart guide'
          },
          { 
            type: 'reading', 
            title: 'Observability for Microservices', 
            duration: '25 min',
            url: 'https://opentelemetry.io/docs/',
            description: 'OpenTelemetry documentation for unified observability'
          },
          { 
            type: 'documentation', 
            title: 'AWS X-Ray Developer Guide', 
            duration: '20 min',
            url: 'https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html',
            description: 'AWS X-Ray for distributed tracing and service maps'
          }
        ]
      },
      {
        id: 'lesson10',
        title: 'Capstone: Microservices Application',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Architecture Design', 'Service Implementation', 'Deployment', 'Testing'],
        description: 'Build a complete microservices-based application.',
        learningMaterials: [
          { 
            type: 'template', 
            title: 'Microservices Architecture Blueprint', 
            duration: '25 min',
            url: 'https://aws.amazon.com/architecture/reference-architecture-diagrams/',
            description: 'AWS reference architectures for microservices applications'
          },
          { 
            type: 'case-study', 
            title: 'Production Microservices', 
            duration: '30 min',
            url: 'https://learn.microsoft.com/azure/architecture/microservices/',
            description: 'Microsoft microservices architecture guide with real-world examples'
          },
          { 
            type: 'checklist', 
            title: 'Microservices Readiness Checklist', 
            duration: '15 min',
            url: 'https://12factor.net/',
            description: 'The Twelve-Factor App methodology for cloud-native applications'
          }
        ]
      }
    ]
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COURSE_PATHWAYS;
}
