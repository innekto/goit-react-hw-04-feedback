import React, { useState } from 'react';

import Notification from './Notification/Notification';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';

const App = () => {
  //початковий стан
  const [goodFeedback, setGoodFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [badFeedback, setBadFeedback] = useState(0);

  // в залежності від типу відгуку збільшуємо відповідну властивість стану на 1.
  const handleFeedback = type => {
    switch (type) {
      case 'good':
        setGoodFeedback(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutralFeedback(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBadFeedback(prevBad => prevBad + 1);
        break;
      default:
        console.error('Invalid feedback type:', type);
    }
  };

  //загальна кількість зібраних відгуків.
  const countTotalFeedback = () => {
    return goodFeedback + neutralFeedback + badFeedback;
  };

  // відсоток позитивних відгуків.
  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return total ? Math.round((goodFeedback / total) * 100) : 0;
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total ? (
          <Statistics
            good={goodFeedback}
            neutral={neutralFeedback}
            bad={badFeedback}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

export { App };
