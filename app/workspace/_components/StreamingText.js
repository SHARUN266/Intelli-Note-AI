// components/StreamingText.js
import { useState, useEffect } from 'react';

const StreamingText = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      // Append the next character to the displayed text
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;

      // Stop when all characters are displayed
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);

    // Clear interval on unmount
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <div className="text-white text-xl font-mono">
      {displayedText}
      <span className="ml-1 animate-blink">|</span>
    </div>
  );
};

export default StreamingText;
