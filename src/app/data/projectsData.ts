// src/app/data/projectsData.ts

export interface ProjectItem {
  title: string;
  subtitle: string;
  imageUrl: string;
  gallery?: string[];
  tags: string[];
  description?: string;
  company?: string;
  location?: string;
  date?: string;
  githubUrl?: string;
  link?: string;
  challenges?: string[];
  outcomes?: string[];
}

export const hardwareProjects: ProjectItem[] = [
  {
    title: 'Autonomous Robotic Arm',
    subtitle: 'Six-axis manipulator with ROS2 integration',
    imageUrl: '/images/projects/robot-arm.jpg',
    gallery: [
      '/images/projects/robot-arm.jpg',
      '/images/projects/robot-arm-2.jpg',
      '/images/projects/robot-arm-cad.jpg'
    ],
    tags: ['ROS2', 'Python', 'Computer Vision', 'Arduino'],
    githubUrl: 'https://github.com/yourusername/robot-arm',
    description: 'Developed a fully autonomous 6-DOF robotic arm capable of object detection, path planning, and precise manipulation. Integrated computer vision for real-time object recognition and implemented inverse kinematics for smooth motion control.',
    date: 'Jan 2024 - Mar 2024',
    challenges: [
      'Implemented accurate inverse kinematics for 6-axis motion',
      'Integrated ROS2 with custom Python nodes for control',
      'Achieved <5mm positioning accuracy with camera calibration'
    ],
    outcomes: [
      'Successfully demonstrated pick-and-place operations with 95% accuracy',
      'Reduced computation time by 40% through optimization',
      'Published open-source ROS2 package with 500+ GitHub stars'
    ]
  },
  {
    title: 'IoT Smart Home Hub',
    subtitle: 'Centralized control system for home automation',
    imageUrl: '/images/projects/smart-home.jpg',
    tags: ['ESP32', 'MQTT', 'Node-RED', 'Raspberry Pi'],
    githubUrl: 'https://github.com/yourusername/smart-home',
    description: 'Created a comprehensive smart home hub using ESP32 microcontrollers and Raspberry Pi, enabling centralized control of lighting, climate, security, and appliances through a custom web interface.',
    date: 'Jun 2023 - Aug 2023',
    challenges: [
      'Designed low-power mesh network for 20+ IoT devices',
      'Implemented secure MQTT broker with TLS encryption',
      'Created responsive web dashboard with real-time updates'
    ],
    outcomes: [
      'Reduced home energy consumption by 25%',
      'Achieved 99.8% uptime over 6 months of operation',
      'Featured in MakerFaire 2023'
    ]
  },
  {
    title: 'Drone Navigation System',
    subtitle: 'GPS-guided autonomous flight controller',
    imageUrl: '/images/projects/drone.jpg',
    tags: ['C++', 'GPS', 'IMU', 'PID Control'],
    link: '#',
    description: 'Engineered a custom flight controller for autonomous drone navigation using GPS waypoints, IMU sensor fusion, and advanced PID control algorithms for stable flight in various weather conditions.',
    date: 'Mar 2023 - May 2023',
    challenges: [
      'Implemented Kalman filtering for sensor fusion',
      'Tuned PID parameters for stable flight control',
      'Handled GPS signal loss with INS dead reckoning'
    ],
    outcomes: [
      'Completed 50+ autonomous missions with 100% success rate',
      'Achieved flight time of 25 minutes on single battery',
      'Won first place in university robotics competition'
    ]
  },
  {
    title: 'CNC Laser Engraver',
    subtitle: 'Custom-built precision engraving system',
    imageUrl: '/images/projects/cnc-laser.jpg',
    tags: ['G-Code', 'Stepper Motors', 'Arduino', 'CAD'],
    description: 'Built a high-precision CNC laser engraver from scratch with custom firmware, achieving 0.1mm accuracy for intricate designs on various materials.',
    date: 'Oct 2022 - Dec 2022',
    outcomes: [
      'Engraved 100+ custom designs for local businesses',
      'Achieved engraving speed of 800mm/min',
      'Total build cost under $300'
    ]
  },
  {
    title: '3D Printer Upgrade Project',
    subtitle: 'Performance enhancement and automation',
    imageUrl: '/images/projects/3d-printer.jpg',
    tags: ['Marlin', 'OctoPrint', 'Sensors', 'Automation'],
    githubUrl: 'https://github.com/yourusername/3d-printer',
    description: 'Upgraded commercial 3D printer with automatic bed leveling, filament runout detection, and remote monitoring capabilities.',
    date: 'Jul 2022 - Sep 2022',
    outcomes: [
      'Reduced print failures by 80%',
      'Enabled remote print monitoring and control',
      'Improved print quality with auto-leveling'
    ]
  }
];

export const softwareProjects: ProjectItem[] = [
  {
    title: 'Machine Vision (YOLO v5, OpenCV)',
    subtitle: 'Real-time object detection system and',
    imageUrl: '/images/projects/MVI (1).png',
    gallery: [
      '/images/projects/MVI (2).png',
      '/images/projects/MVI (3).png',
      '/images/projects/MVI (4).png',
      '/images/projects/MVI (5).png',
      '/images/projects/MVI (6).png'
    ],
    tags: ['OpenCV', 'YOLO', 'Image Processing', 'Inteligent Vision', 'Roboflow'],
    link: 'https://app.roboflow.com/road-mark/home',
    description: 'Developed a YOLO 5 Model for Road Marking Detection Algorithm using 3k Images and a simple image processing model to filter out the road markings such as arrows, road lines, zebra crossing and road bumps.',
    date: 'Aug 2024 - Nov 2024',
    company: 'Asia Pacific University of Technology & Innovation',
    location: 'Kuala Lumpur, Malaysia',
    challenges: [
      'Handled large number of dataset with various lighting conditions and angles',
      'Implemented both YOLO v5 and traditional image processing techniques for robust detection and comparison',
      'Roboflow deployment and optimization for real-time inference and image annotation'
    ],
    outcomes: [
      'Achieved 93% accuracy in road marking detection using YOLO v5',
      'Developed a lightweight image processing algorithm for low-resource environments',
      'Integrated the system into a real-time application for autonomous vehicles'
    ]
  },
  {
    title: 'AI-Powered Defect Detection',
    subtitle: 'Computer vision system for quality control',
    imageUrl: '/images/projects/ai-defect.jpg',
    tags: ['TensorFlow', 'OpenCV', 'Python', 'FastAPI'],
    githubUrl: 'https://github.com/yourusername/defect-detection',
    description: 'Built an AI-powered defect detection system using deep learning and computer vision to automate quality control in manufacturing, achieving 98% accuracy in identifying product defects.',
    date: 'May 2024 - Aug 2024',
    company: 'AutoManu Solutions',
    challenges: [
      'Collected and labeled 50,000+ training images',
      'Optimized model for edge deployment on industrial cameras',
      'Achieved real-time processing at 30 FPS'
    ],
    outcomes: [
      '98% defect detection accuracy vs 85% manual inspection',
      'Reduced inspection time by 75%',
      'Saved company $200K annually in quality costs'
    ]
  },
  {
    title: 'Distributed Task Scheduler',
    subtitle: 'Microservices-based job orchestration platform',
    imageUrl: '/images/projects/scheduler.jpg',
    tags: ['Kubernetes', 'Docker', 'Go', 'Redis'],
    githubUrl: 'https://github.com/yourusername/task-scheduler',
    description: 'Architected a distributed task scheduling system capable of orchestrating thousands of concurrent jobs across a Kubernetes cluster with automatic failover and load balancing.',
    date: 'Jan 2024 - Apr 2024',
    challenges: [
      'Implemented distributed locking with Redis',
      'Designed fault-tolerant job queue system',
      'Created auto-scaling logic based on queue depth'
    ],
    outcomes: [
      'Processing 100,000+ jobs daily',
      '99.99% job completion rate',
      'Reduced infrastructure costs by 40%'
    ]
  },
  {
    title: 'E-Commerce Platform Backend',
    subtitle: 'Scalable microservices architecture',
    imageUrl: '/images/projects/ecommerce.jpg',
    tags: ['Node.js', 'MongoDB', 'Redis', 'AWS'],
    description: 'Designed and implemented a scalable e-commerce backend handling 1M+ daily transactions with payment processing, inventory management, and order fulfillment.',
    date: 'Aug 2023 - Dec 2023',
    outcomes: [
      'Handled Black Friday traffic of 10K+ requests/second',
      '99.95% uptime across the year',
      'Processed $5M in transactions'
    ]
  }
];

export const achievements: ProjectItem[] = [
  {
    title: 'Best Innovation Award 2024',
    subtitle: 'Recognized for breakthrough in robotic automation',
    imageUrl: '/images/projects/award.jpg',
    tags: ['Innovation', 'Robotics', 'Automation'],
    description: 'Received the Best Innovation Award at the International Robotics Conference 2024 for developing a novel approach to collaborative robot control using reinforcement learning.',
    date: 'Mar 2024',
    location: 'Boston, MA',
    outcomes: [
      'Presented research to 500+ industry professionals',
      'Featured in 3 major tech publications',
      'Secured $50K in research funding'
    ]
  },
  {
    title: 'Open Source Contributor',
    subtitle: 'Active maintainer of 15+ GitHub repositories',
    imageUrl: '/images/projects/opensource.jpg',
    tags: ['Open Source', 'Community', 'Collaboration'],
    githubUrl: 'https://github.com/yourusername',
    description: 'Actively maintain and contribute to 15+ open-source projects with a focus on robotics, IoT, and developer tools. Accumulated 10,000+ stars across repositories.',
    date: '2020 - Present',
    outcomes: [
      '10,000+ GitHub stars across projects',
      '500+ pull requests merged',
      'Mentored 50+ new open-source contributors'
    ]
  },
  {
    title: 'Patent: Smart Sensor Array',
    subtitle: 'Novel approach to multi-sensor data fusion',
    imageUrl: '/images/projects/patent.jpg',
    tags: ['Patent', 'IoT', 'Innovation'],
    description: 'Filed and granted patent for an innovative multi-sensor data fusion algorithm that improves accuracy by 40% in industrial monitoring applications.',
    date: 'Filed: Jun 2023, Granted: Jan 2024',
    outcomes: [
      'Patent granted in US and EU',
      'Licensed to 2 major manufacturers',
      'Featured in IEEE publication'
    ]
  },
  {
    title: 'Hackathon Champion',
    subtitle: '1st place in National Robotics Hackathon',
    imageUrl: '/images/projects/hackathon.jpg',
    tags: ['Hackathon', 'Team Lead', 'Innovation'],
    description: 'Led a team of 4 to win first place in a 48-hour robotics hackathon, building an autonomous warehouse robot from scratch.',
    date: 'Nov 2023',
    location: 'Seattle, WA',
    outcomes: [
      'Defeated 30+ competing teams',
      'Built working prototype in 48 hours',
      'Won $10K prize and mentorship'
    ]
  }
];