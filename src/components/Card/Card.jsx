import './Card.css';

const Card = ({ children, className = '', hoverEffect = true, ...props }) => {
  return (
    <div className={`card ${hoverEffect ? 'card-hover' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
