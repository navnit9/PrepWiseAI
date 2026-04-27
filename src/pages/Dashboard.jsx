import { Link } from 'react-router-dom';
import { Target, Activity, Award, ArrowRight } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="container animate-fade-in">
        <div className="dashboard-header">
          <div>
            <h2>Welcome back, User! 👋</h2>
            <p>Here's your interview preparation progress.</p>
          </div>
          <div className="dashboard-actions">
            <Link to="/mock-test">
              <Button variant="secondary">Start Mock Test</Button>
            </Link>
            <Link to="/ai-interview">
              <Button variant="primary">Try AI Interview</Button>
            </Link>
          </div>
        </div>

        <div className="stats-grid">
          <Card className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper">
                <Target size={24} color="var(--accent-purple-end)" />
              </div>
              <h4>Last Score</h4>
            </div>
            <div className="stat-value">85%</div>
            <p className="stat-desc text-success">+5% from previous test</p>
          </Card>
          
          <Card className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper">
                <Activity size={24} color="#10B981" />
              </div>
              <h4>Tests Taken</h4>
            </div>
            <div className="stat-value">12</div>
            <p className="stat-desc">Across 3 different domains</p>
          </Card>

          <Card className="stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper">
                <Award size={24} color="var(--accent-red)" />
              </div>
              <h4>Weak Areas</h4>
            </div>
            <div className="stat-value">System Design</div>
            <p className="stat-desc text-warning">Needs more practice</p>
          </Card>
        </div>

        <div className="dashboard-content">
          <Card className="recent-activity" hoverEffect={false}>
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-info">
                  <h4>React JS Mock Test</h4>
                  <p>Yesterday, 10:30 AM</p>
                </div>
                <div className="activity-score">85%</div>
              </div>
              <div className="activity-item">
                <div className="activity-info">
                  <h4>AI Interview (Frontend)</h4>
                  <p>Oct 12, 2023</p>
                </div>
                <div className="activity-score">Good</div>
              </div>
              <div className="activity-item">
                <div className="activity-info">
                  <h4>Data Structures Quiz</h4>
                  <p>Oct 10, 2023</p>
                </div>
                <div className="activity-score">70%</div>
              </div>
            </div>
            <Link to="/result" className="view-all-link">
              View All Results <ArrowRight size={16} />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
