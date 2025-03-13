import { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';

export default function TypingText({ texts, speed = 100 }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    
    const type = () => {
      const currentText = texts[currentIndex];
      
      if (isDeleting) {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setDisplayText(prev => currentText.slice(0, prev.length + 1));
        if (displayText === currentText) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
      
      timeout = setTimeout(type, isDeleting ? speed / 2 : speed);
    };

    // Start typing effect
    timeout = setTimeout(type, speed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed]);

  return (
    <div className="typing-text">
      <FaCode className="code-icon" size={24} />
      <span>{displayText}</span>
      <span className="cursor">|</span>
    </div>
  );
}
