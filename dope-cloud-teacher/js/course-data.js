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
          { type: 'reading', title: 'Cloud Computing History White Paper', duration: '15 min' },
          { type: 'interactive', title: 'Cloud Evolution Timeline Interactive', duration: '10 min' }
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
          { type: 'reading', title: 'NIST Cloud Service Models Definition', duration: '20 min' },
          { type: 'case-study', title: 'Real-world IaaS/PaaS/SaaS Examples', duration: '15 min' }
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
          { type: 'reading', title: 'AWS Global Infrastructure Overview', duration: '25 min' },
          { type: 'video', title: 'AWS Free Tier Navigation Guide', duration: '15 min' },
          { type: 'documentation', title: 'EC2 Instance Types Reference', duration: '20 min' }
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
          { type: 'reading', title: 'Azure Architecture Center', duration: '30 min' },
          { type: 'interactive', title: 'Azure Portal Walkthrough', duration: '20 min' }
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
          { type: 'reading', title: 'GCP Solutions Architecture', duration: '25 min' },
          { type: 'documentation', title: 'gcloud CLI Quickstart', duration: '15 min' }
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
          { type: 'reading', title: 'Cloud Storage Types Comparison', duration: '20 min' },
          { type: 'case-study', title: 'Storage Architecture Patterns', duration: '15 min' }
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
          { type: 'reading', title: 'VPC Design Best Practices', duration: '25 min' },
          { type: 'diagram', title: 'Network Architecture Patterns', duration: '15 min' }
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
          { type: 'reading', title: 'Cloud Security Best Practices Guide', duration: '30 min' },
          { type: 'checklist', title: 'Security Audit Checklist', duration: '10 min' }
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
          { type: 'reading', title: 'Cloud Cost Optimization Strategies', duration: '20 min' },
          { type: 'calculator', title: 'Cloud Pricing Calculator Tutorial', duration: '15 min' }
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
          { type: 'reading', title: 'Application Architecture Best Practices', duration: '25 min' },
          { type: 'template', title: 'Deployment Checklist', duration: '10 min' }
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
    lessons: [
      {
        id: 'lesson1',
        title: 'Cloud Architecture Principles',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/cKnuf-3fN9k',
        topics: ['Well-Architected Framework', 'Design Patterns', 'Trade-offs', 'Best Practices'],
        description: 'Master the fundamental principles of designing scalable cloud architectures.'
      },
      {
        id: 'lesson2',
        title: 'Multi-Tier Application Design',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Sfo8xaTVYyw',
        topics: ['3-Tier Architecture', 'Microservices', 'Serverless', 'Hybrid Approaches'],
        description: 'Design complex applications with multiple tiers and components.'
      },
      {
        id: 'lesson3',
        title: 'High Availability & Fault Tolerance',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/xK6zkvWDqyc',
        topics: ['Redundancy', 'Auto-scaling', 'Load Balancing', 'Failover Strategies'],
        description: 'Build systems that stay online even when components fail.'
      },
      {
        id: 'lesson4',
        title: 'Disaster Recovery Planning',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/e41_1P0KaY4',
        topics: ['Backup Strategies', 'RTO & RPO', 'Multi-Region Design', 'Recovery Testing'],
        description: 'Create comprehensive disaster recovery plans for critical systems.'
      },
      {
        id: 'lesson5',
        title: 'Enterprise Identity & Access Management',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Q3B-96KcL58',
        topics: ['Active Directory', 'SSO', 'MFA', 'RBAC', 'Zero Trust'],
        description: 'Implement enterprise-grade identity and access management.'
      },
      {
        id: 'lesson6',
        title: 'Network Architecture & Security',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/hiKPPy584Mg',
        topics: ['VPN', 'VPC Peering', 'Transit Gateway', 'Firewall Rules', 'Network Segmentation'],
        description: 'Design secure, efficient network architectures in the cloud.'
      },
      {
        id: 'lesson7',
        title: 'Data Architecture & Analytics',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/jOAHOSkWOrM',
        topics: ['Data Lakes', 'Warehousing', 'ETL Pipelines', 'Analytics Services'],
        description: 'Architect scalable data solutions for enterprise analytics.'
      },
      {
        id: 'lesson8',
        title: 'Cloud Migration Strategies',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Y33TviLMaek',
        topics: ['6 Rs of Migration', 'Assessment Tools', 'Migration Patterns', 'Cutover Planning'],
        description: 'Plan and execute successful cloud migration projects.'
      },
      {
        id: 'lesson9',
        title: 'Cost Optimization at Scale',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/1Z4BfRj2FiU',
        topics: ['Reserved Instances', 'Spot Instances', 'Right-sizing', 'Cost Allocation'],
        description: 'Optimize cloud costs for large-scale deployments.'
      },
      {
        id: 'lesson10',
        title: 'Governance & Compliance',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/Gw7qrTq-m50',
        topics: ['Policies', 'Compliance Frameworks', 'Auditing', 'Documentation'],
        description: 'Implement governance and meet compliance requirements.'
      },
      {
        id: 'lesson11',
        title: 'Performance Optimization',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/hSMSwnfYh00',
        topics: ['Caching', 'CDN', 'Database Optimization', 'Monitoring'],
        description: 'Optimize application performance in cloud environments.'
      },
      {
        id: 'lesson12',
        title: 'Capstone: Enterprise Architecture Design',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Requirements Gathering', 'Solution Design', 'Documentation', 'Presentation'],
        description: 'Design a complete enterprise cloud architecture from scratch.'
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
    lessons: [
      {
        id: 'lesson1',
        title: 'Cloud Security Fundamentals',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/dxDg-aGh0Nc',
        topics: ['Shared Responsibility Model', 'Security Principles', 'Threat Landscape'],
        description: 'Understand the foundations of cloud security and common threats.'
      },
      {
        id: 'lesson2',
        title: 'Identity & Access Management Deep Dive',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Ul6FW4UANGc',
        topics: ['IAM Policies', 'Least Privilege', 'Service Accounts', 'Federation'],
        description: 'Master IAM concepts and implement secure access controls.'
      },
      {
        id: 'lesson3',
        title: 'Data Protection & Encryption',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/zfcyJqfp1lY',
        topics: ['Encryption at Rest', 'Encryption in Transit', 'Key Management', 'Tokenization'],
        description: 'Protect sensitive data with encryption and key management.'
      },
      {
        id: 'lesson4',
        title: 'Network Security in the Cloud',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/2zR6PtX7HPg',
        topics: ['Firewalls', 'Security Groups', 'Network Monitoring', 'DDoS Protection'],
        description: 'Secure cloud networks and prevent unauthorized access.'
      },
      {
        id: 'lesson5',
        title: 'Threat Detection & Monitoring',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/VJXfPDKNdL8',
        topics: ['SIEM', 'Log Analysis', 'Anomaly Detection', 'Security Dashboards'],
        description: 'Detect and respond to security threats in real-time.'
      },
      {
        id: 'lesson6',
        title: 'Compliance & Governance',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/Gw7qrTq-m50',
        topics: ['HIPAA', 'PCI-DSS', 'SOC 2', 'GDPR', 'Audit Trails'],
        description: 'Ensure compliance with industry regulations and standards.'
      },
      {
        id: 'lesson7',
        title: 'Container & Kubernetes Security',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/RjXkRNHqM04',
        topics: ['Image Scanning', 'Runtime Security', 'Pod Security', 'Network Policies'],
        description: 'Secure containerized applications and Kubernetes clusters.'
      },
      {
        id: 'lesson8',
        title: 'Serverless Security',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/VqHjvhF5FtM',
        topics: ['Function Security', 'API Gateway', 'Secrets Management', 'Input Validation'],
        description: 'Implement security best practices for serverless architectures.'
      },
      {
        id: 'lesson9',
        title: 'Incident Response & Forensics',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/h6ZFz-HuV6o',
        topics: ['Incident Response Plan', 'Forensic Analysis', 'Post-Incident Review'],
        description: 'Respond effectively to security incidents and breaches.'
      },
      {
        id: 'lesson10',
        title: 'Capstone: Security Audit Project',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Security Assessment', 'Remediation Planning', 'Report Writing'],
        description: 'Conduct a comprehensive security audit of a cloud environment.'
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
    lessons: [
      {
        id: 'lesson1',
        title: 'DevOps Culture & Principles',
        duration: '60 min',
        video: 'https://www.youtube.com/embed/UbtB4sMaaNM',
        topics: ['DevOps Philosophy', 'CALMS Framework', 'Team Collaboration'],
        description: 'Understand the culture and principles behind successful DevOps.'
      },
      {
        id: 'lesson2',
        title: 'Version Control with Git',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/RGOj5yH7evk',
        topics: ['Git Basics', 'Branching Strategies', 'Pull Requests', 'Git Workflow'],
        description: 'Master Git for version control and team collaboration.'
      },
      {
        id: 'lesson3',
        title: 'CI/CD Pipeline Fundamentals',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/scEDHsr3APg',
        topics: ['Continuous Integration', 'Continuous Deployment', 'Pipeline Design'],
        description: 'Build automated pipelines for testing and deploying code.'
      },
      {
        id: 'lesson4',
        title: 'GitHub Actions',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/R8_veQiYBjI',
        topics: ['Workflows', 'Actions Marketplace', 'Secrets Management', 'Matrix Builds'],
        description: 'Automate workflows with GitHub Actions.'
      },
      {
        id: 'lesson5',
        title: 'Docker Containerization',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/3c-iBn73dDE',
        topics: ['Docker Basics', 'Dockerfile', 'Docker Compose', 'Image Optimization'],
        description: 'Package applications in containers for consistent deployment.'
      },
      {
        id: 'lesson6',
        title: 'Kubernetes Orchestration',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/X48VuDVv0do',
        topics: ['K8s Architecture', 'Pods & Services', 'Deployments', 'Helm Charts'],
        description: 'Orchestrate containers at scale with Kubernetes.'
      },
      {
        id: 'lesson7',
        title: 'Infrastructure as Code with Terraform',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/7xngnjfIlK4',
        topics: ['HCL Syntax', 'Providers', 'State Management', 'Modules'],
        description: 'Define and manage infrastructure with code using Terraform.'
      },
      {
        id: 'lesson8',
        title: 'Configuration Management',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/1id6ERvfozo',
        topics: ['Ansible', 'Puppet', 'Chef', 'Configuration Drift'],
        description: 'Manage server configurations at scale with automation.'
      },
      {
        id: 'lesson9',
        title: 'Monitoring & Logging',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/h4Sl21AKiDg',
        topics: ['Prometheus', 'Grafana', 'ELK Stack', 'Application Monitoring'],
        description: 'Monitor applications and infrastructure for performance and issues.'
      },
      {
        id: 'lesson10',
        title: 'GitOps & Advanced Workflows',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/f5EpcWp0THw',
        topics: ['GitOps Principles', 'ArgoCD', 'Flux', 'Declarative Config'],
        description: 'Implement GitOps for infrastructure and application management.'
      },
      {
        id: 'lesson11',
        title: 'Testing & Quality Automation',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/4iJDaNuTbFo',
        topics: ['Unit Testing', 'Integration Testing', 'Security Scanning', 'Test Automation'],
        description: 'Automate testing to ensure code quality and security.'
      },
      {
        id: 'lesson12',
        title: 'Capstone: Full DevOps Pipeline',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['End-to-End Pipeline', 'Multi-Environment', 'Rollback Strategy'],
        description: 'Build a complete DevOps pipeline from code to production.'
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
    lessons: [
      {
        id: 'lesson1',
        title: 'AI & ML Fundamentals',
        duration: '75 min',
        video: 'https://www.youtube.com/embed/ukzFI9rgwfU',
        topics: ['AI vs ML vs DL', 'Supervised Learning', 'Unsupervised Learning', 'Use Cases'],
        description: 'Understand the basics of artificial intelligence and machine learning.'
      },
      {
        id: 'lesson2',
        title: 'Python for AI/ML',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/rfscVS0vtbw',
        topics: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
        description: 'Learn essential Python libraries for machine learning.'
      },
      {
        id: 'lesson3',
        title: 'Cloud AI Services Overview',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/pjx6DtRc8zc',
        topics: ['AWS AI Services', 'Azure Cognitive Services', 'Google AI Platform'],
        description: 'Explore pre-built AI services from major cloud providers.'
      },
      {
        id: 'lesson4',
        title: 'Computer Vision with Cloud APIs',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/vT1JzLTH4G4',
        topics: ['Image Recognition', 'Object Detection', 'Face Detection', 'OCR'],
        description: 'Build applications that can see and understand images.'
      },
      {
        id: 'lesson5',
        title: 'Natural Language Processing',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/fOvTtapxa9c',
        topics: ['Text Analysis', 'Sentiment Analysis', 'Entity Extraction', 'Translation'],
        description: 'Process and understand human language with NLP.'
      },
      {
        id: 'lesson6',
        title: 'Building ML Models',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/i_LwzRVP7bg',
        topics: ['Data Preparation', 'Model Training', 'Evaluation', 'Hyperparameter Tuning'],
        description: 'Train your own machine learning models from scratch.'
      },
      {
        id: 'lesson7',
        title: 'Model Deployment & MLOps',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/QU76v3KfJ50',
        topics: ['Model Serving', 'APIs', 'Monitoring', 'Retraining'],
        description: 'Deploy and maintain ML models in production.'
      },
      {
        id: 'lesson8',
        title: 'AutoML & Low-Code AI',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/8YFATk8XuBk',
        topics: ['AutoML Platforms', 'No-Code Solutions', 'Rapid Prototyping'],
        description: 'Build AI solutions without extensive coding or ML expertise.'
      },
      {
        id: 'lesson9',
        title: 'Chatbots & Conversational AI',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/DJqpB4_a55o',
        topics: ['Chatbot Design', 'Intent Recognition', 'Dialogue Management'],
        description: 'Create intelligent chatbots and virtual assistants.'
      },
      {
        id: 'lesson10',
        title: 'Capstone: AI-Powered Application',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Project Planning', 'Model Integration', 'UI/UX', 'Deployment'],
        description: 'Build and deploy a complete AI-powered application.'
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
    lessons: [
      {
        id: 'lesson1',
        title: 'Data Engineering Fundamentals',
        duration: '75 min',
        video: 'https://www.youtube.com/embed/qWru-b6m030',
        topics: ['Data Architecture', 'Batch vs Streaming', 'Data Modeling'],
        description: 'Understand the role and responsibilities of data engineers.'
      },
      {
        id: 'lesson2',
        title: 'Cloud Data Storage Solutions',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/rLvC4LxDX1I',
        topics: ['Data Lakes', 'Object Storage', 'Databases', 'File Formats'],
        description: 'Choose and implement appropriate storage solutions for your data.'
      },
      {
        id: 'lesson3',
        title: 'SQL & Data Querying',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/HXV3zeQKqGY',
        topics: ['SQL Basics', 'Joins', 'Aggregations', 'Query Optimization'],
        description: 'Master SQL for data analysis and transformation.'
      },
      {
        id: 'lesson4',
        title: 'ETL Pipeline Design',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/JXh1T2xQNIs',
        topics: ['Extract', 'Transform', 'Load', 'Data Quality', 'Error Handling'],
        description: 'Design and build efficient ETL pipelines for data processing.'
      },
      {
        id: 'lesson5',
        title: 'Big Data Processing with Spark',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/9mELEARcxJo',
        topics: ['Spark Architecture', 'DataFrames', 'RDDs', 'Spark SQL'],
        description: 'Process massive datasets with Apache Spark.'
      },
      {
        id: 'lesson6',
        title: 'Data Warehousing',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/J0SLCwSz-0o',
        topics: ['Snowflake', 'Redshift', 'BigQuery', 'Schema Design'],
        description: 'Build scalable data warehouses for analytics.'
      },
      {
        id: 'lesson7',
        title: 'Stream Processing',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/avi-TZI9t2I',
        topics: ['Kafka', 'Kinesis', 'Real-time Processing', 'Event Streaming'],
        description: 'Process and analyze data in real-time with streaming technologies.'
      },
      {
        id: 'lesson8',
        title: 'Data Pipeline Orchestration',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/AHMm1wfGuHE',
        topics: ['Apache Airflow', 'Workflow DAGs', 'Scheduling', 'Monitoring'],
        description: 'Orchestrate complex data workflows with Apache Airflow.'
      },
      {
        id: 'lesson9',
        title: 'Data Analytics & Visualization',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/TPMlZxRRaBQ',
        topics: ['BI Tools', 'Tableau', 'Power BI', 'Dashboard Design'],
        description: 'Create insightful visualizations and dashboards from your data.'
      },
      {
        id: 'lesson10',
        title: 'DataOps & Pipeline Automation',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/FSp6BE33noU',
        topics: ['CI/CD for Data', 'Testing', 'Monitoring', 'Version Control'],
        description: 'Apply DevOps principles to data engineering workflows.'
      },
      {
        id: 'lesson11',
        title: 'Capstone: End-to-End Data Pipeline',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Requirements Analysis', 'Architecture Design', 'Implementation', 'Testing'],
        description: 'Build a complete data pipeline from ingestion to visualization.'
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
    lessons: [
      {
        id: 'lesson1',
        title: 'Microservices Architecture Principles',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/CdBtNQZH8a4',
        topics: ['Microservices vs Monolith', 'Service Boundaries', 'Communication Patterns'],
        description: 'Understand the principles and benefits of microservices architecture.'
      },
      {
        id: 'lesson2',
        title: 'Serverless Computing Fundamentals',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/W_VV2Fx32_Y',
        topics: ['FaaS Concepts', 'Event-Driven', 'Cold Starts', 'Use Cases'],
        description: 'Learn the fundamentals of serverless computing and when to use it.'
      },
      {
        id: 'lesson3',
        title: 'AWS Lambda Deep Dive',
        duration: '150 min',
        video: 'https://www.youtube.com/embed/97q30JjEq9Y',
        topics: ['Lambda Functions', 'Triggers', 'Layers', 'Performance Optimization'],
        description: 'Master AWS Lambda for building serverless applications.'
      },
      {
        id: 'lesson4',
        title: 'Azure Functions',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/zIfxkub7CLY',
        topics: ['Function Apps', 'Bindings', 'Durable Functions', 'Integration'],
        description: 'Build serverless applications on Microsoft Azure.'
      },
      {
        id: 'lesson5',
        title: 'API Gateway & REST APIs',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/Sku1P6IhjP8',
        topics: ['API Design', 'Gateway Patterns', 'Authentication', 'Rate Limiting'],
        description: 'Design and implement scalable RESTful APIs.'
      },
      {
        id: 'lesson6',
        title: 'Event-Driven Architecture',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/o2HJCGcYwoU',
        topics: ['Event Sourcing', 'CQRS', 'Message Queues', 'Event Buses'],
        description: 'Build reactive systems with event-driven architecture.'
      },
      {
        id: 'lesson7',
        title: 'Service Mesh & Communication',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/16fgzklcF7Y',
        topics: ['Istio', 'Service Discovery', 'Load Balancing', 'Circuit Breakers'],
        description: 'Manage microservices communication with service mesh.'
      },
      {
        id: 'lesson8',
        title: 'Distributed Data Management',
        duration: '120 min',
        video: 'https://www.youtube.com/embed/YhavdmgxW00',
        topics: ['Database per Service', 'Saga Pattern', 'Eventual Consistency'],
        description: 'Handle data in distributed microservices systems.'
      },
      {
        id: 'lesson9',
        title: 'Observability & Monitoring',
        duration: '90 min',
        video: 'https://www.youtube.com/embed/h4Sl21AKiDg',
        topics: ['Distributed Tracing', 'Logging', 'Metrics', 'Alerting'],
        description: 'Monitor and troubleshoot microservices in production.'
      },
      {
        id: 'lesson10',
        title: 'Capstone: Microservices Application',
        duration: '180 min',
        video: 'https://www.youtube.com/embed/hwrnciyVaZ8',
        topics: ['Architecture Design', 'Service Implementation', 'Deployment', 'Testing'],
        description: 'Build a complete microservices-based application.'
      }
    ]
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = COURSE_PATHWAYS;
}
