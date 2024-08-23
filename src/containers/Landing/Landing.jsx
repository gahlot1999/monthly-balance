import { useEffect, useState } from 'react';
import styles from './Landing.module.css';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100 / 6);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  useEffect(() => {
    if (progress >= 110) {
      navigate('/monthlyBalance');
    }
  }, [navigate, progress]);

  return (
    <div className={styles.landingPage}>
      <div className={styles.heading}>
        <h1>
          Monthly
          <br />
          Balance
        </h1>
        <div
          className={styles.progressBarInner}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default Landing;
