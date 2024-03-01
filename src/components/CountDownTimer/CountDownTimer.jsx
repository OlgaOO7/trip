import { useState, useEffect } from 'react';

import css from './CountDownTimer.module.css';

export const CountDownTimer = ({ selectedTrip }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // const currentDate = new Date();
  const startDay = new Date(selectedTrip.start);
  const targetDate = startDay.getTime();

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;
    let timeLeftTo = {};

    if (difference > 0) {
      timeLeftTo = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    setTimeLeft(timeLeftTo);
    return timeLeftTo;
  };

  useEffect(
    () => {
      const interval = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      return () => clearInterval(interval);
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className={css.wrapper}>
      <div className={css.timerWrapper}>
        <p>{timeLeft.days}</p>
        <p>days</p>
      </div>

      <div>
        <p>{timeLeft.hours}</p>
        <p>hours</p>
      </div>

      <div>
        <p>{timeLeft.minutes}</p>
        <p>minutes</p>
      </div>

      <div>
        <p>{timeLeft.seconds}</p>
        <p>seconds</p>
      </div>
    </div>
  );
};
