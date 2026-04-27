import { Link } from 'react-router-dom';
import { Bot, CheckCircle, Target } from 'lucide-react';
import Button from '../Button/Button';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <h1>Crack Interviews <span className="highlight">Smarter</span> with AI</h1>
          <p className="hero-subtext">
            Prepare for your dream job with AI-driven mock interviews, real-time feedback, and personalized test sessions. Master your skills today.
          </p>
          
          <div className="hero-actions">
            <Link to="/mock-test">
              <Button variant="primary">Start Practicing</Button>
            </Link>
            <Link to="/ai-interview">
              <Button variant="secondary">Try AI Interview</Button>
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <h4>10K+</h4>
              <p>Questions</p>
            </div>
            <div className="stat-item">
              <h4>5K+</h4>
              <p>Interviews</p>
            </div>
            <div className="stat-item">
              <h4>50+</h4>
              <p>Topics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
