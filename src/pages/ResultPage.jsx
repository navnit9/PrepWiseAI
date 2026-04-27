import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, RotateCcw, Home } from 'lucide-react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import './ResultPage.css';

const ResultPage = () => {
  return (
    <div className="result-page">
      <div className="container animate-fade-in">
        <div className="result-header">
          <h2>Test Completed!</h2>
          <p>Here is a detailed analysis of your performance.</p>
        </div>

        <div className="score-overview">
          <Card className="score-card main-score text-center" hoverEffect={false}>
            <h3>Your Score</h3>
            <div className="score-circle">
              <div className="score-value">85<span>%</span></div>
            </div>
            <p className="score-message text-success">Great job! You are ready for the interview.</p>
          </Card>

          <div className="score-details">
            <Card className="detail-card" hoverEffect={false}>
              <div className="detail-icon correct">
                <CheckCircle size={24} />
              </div>
              <div className="detail-info">
                <h4>Correct Answers</h4>
                <div className="detail-value">17 / 20</div>
              </div>
            </Card>
            
            <Card className="detail-card" hoverEffect={false}>
              <div className="detail-icon wrong">
                <XCircle size={24} />
              </div>
              <div className="detail-info">
                <h4>Wrong Answers</h4>
                <div className="detail-value">3 / 20</div>
              </div>
            </Card>

            <Card className="detail-card" hoverEffect={false}>
              <div className="detail-icon time">
                <AlertTriangle size={24} />
              </div>
              <div className="detail-info">
                <h4>Weak Topics</h4>
                <div className="detail-value text-sm">React Hooks, Context API</div>
              </div>
            </Card>
          </div>
        </div>

        <div className="result-actions">
          <Link to="/mock-test">
            <Button variant="secondary">
              <RotateCcw size={18} /> Retry Test
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="primary">
              <Home size={18} /> Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
