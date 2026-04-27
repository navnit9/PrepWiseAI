import { Brain, Code, LineChart, FileText, Users, Terminal } from 'lucide-react';
import Card from '../Card/Card';
import './Features.css';

const features = [
  {
    id: 1,
    icon: <Code size={32} color="var(--accent-purple-end)" />,
    title: 'Extensive Question Bank',
    description: 'Practice with a vast, frequently updated library of questions covering React, DSA, Node.js, and System Design.'
  },
  {
    id: 2,
    icon: <Brain size={32} color="var(--accent-red)" />,
    title: 'AI Interview Simulator',
    description: 'Experience real-world pressure with our dynamic AI that adapts its follow-up questions based on your answers.'
  },
  {
    id: 3,
    icon: <LineChart size={32} color="#10B981" />,
    title: 'Deep Performance Analytics',
    description: 'Identify your weak areas instantly with granular performance reports and tailored study plans.'
  },
  {
    id: 4,
    icon: <FileText size={32} color="#F59E0B" />,
    title: 'AI Resume Analyzer',
    description: 'Get actionable, line-by-line feedback on your resume to ensure it beats ATS systems and stands out to recruiters.'
  },
  {
    id: 5,
    icon: <Users size={32} color="#3B82F6" />,
    title: 'Peer-to-Peer Mock Interviews',
    description: 'Match with a community of global candidates to practice live 1-on-1 interviews and exchange mutual feedback.'
  },
  {
    id: 6,
    icon: <Terminal size={32} color="#EC4899" />,
    title: 'In-Browser Code Execution',
    description: 'Compile and run your Data Structure and Algorithm solutions instantly within our built-in cloud IDE environment.'
  }
];

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose PrepWise AI?</h2>
          <p>Everything you need to crack your next technical interview.</p>
        </div>
        
        <div className="features-grid">
          {features.map(feature => (
            <Card key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
