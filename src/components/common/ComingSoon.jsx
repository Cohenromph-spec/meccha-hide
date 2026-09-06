import './ComingSoon.css';

export default function ComingSoon({ phase, title, description }) {
  return (
    <div className="coming-soon">
      <span className="coming-soon__phase">{phase}</span>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}
