import { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';

export default function TypingText({ texts, speed = 100 }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const currentText = texts[currentIndex];
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    };

    const timeout = setTimeout(type, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed]);

  return (
    <div className="typing-text">
      <FaCode className="code-icon" />
      <span>{displayText}</span>
      <span className="cursor">|</span>
    </div>
  );
}
