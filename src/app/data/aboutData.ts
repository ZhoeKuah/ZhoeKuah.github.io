// src/app/data/aboutData.ts

import { Cpu, Code, Zap, Book, Music, Coffee, Gamepad2, Mountain, Globe, Camera, Wrench, Sparkles, Target } from 'lucide-react';

export const interests = [
  { icon: Cpu, label: 'Robotics', color: 'cyan' },
  { icon: Code, label: 'Open Source', color: 'emerald' },
  { icon: Zap, label: 'Hackathons', color: 'yellow' },
  { icon: Book, label: 'Sci-Fi Lit', color: 'pink' },
  { icon: Music, label: 'Synthwave', color: 'purple' },
  { icon: Coffee, label: 'Pour Over', color: 'orange' },
  { icon: Gamepad2, label: 'Gaming', color: 'green' },
  { icon: Mountain, label: 'Hiking', color: 'teal' },
  { icon: Globe, label: 'Travel', color: 'blue' },
  { icon: Camera, label: 'Photo', color: 'red' },
];

export const languages = [
  { name: 'Mandarin', level: 100, color: 'red' },
  { name: 'English', level: 100, color: 'cyan' },
  { name: 'Malay', level: 60, color: 'green' },
  { name: 'Japanese', level: 30, color: 'pink' },
];

export const traits = [
  { label: 'Analytical Thinking', icon: Cpu },
  { label: 'Problem Solver', icon: Wrench },
  { label: 'Creative Innovator', icon: Sparkles },
  { label: 'Detail-Oriented', icon: Target },
];

export const swotData = {
  strengths: [
    'Practical Reasoning over Raw Theory',
    'Structured System Clarity',
    'Intellectual Honesty & Limitation Analysis', 
    'Evidence-Based Decision Making'
  ],
  weaknesses: [
    'Analysis Paralysis (Over-Optimization)', 
    'Aversion to Ambiguity', 
    'Propensity for Detailed Justification'
  ],
  opportunities: [
    'Complex Systems Engineering Roles', 
    'Technical Consulting & Auditing', 
    'R&D Documentation Bridging'
  ],
  threats: [
    'Speed-over-Quality Environments', 
    'Generic AI Content Saturation', 
    'Devaluation of Deep Technical Writing'
  ],
};

export const developerLogs = [
  { year: 2025, summary: 'AI Integration & Leadership', highlights: ['Masters Degree', 'IEEE Papers', 'Github User'] },
  { year: 2024, summary: 'Robotics Deep Dive', highlights: ['Internship', 'Industry Standards'] },
  { year: 2023, summary: 'Research & Academia', highlights: ['Competition Attendent', 'Project Maniac'] },
];