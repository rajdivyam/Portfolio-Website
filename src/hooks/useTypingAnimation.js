import { useState, useEffect, useRef } from 'react';

/**
 * useTypingAnimation — cycles through an array of strings with typewriter effect
 * @param {string[]} words - array of strings to cycle through
 * @param {number} typeSpeed - ms per character typing
 * @param {number} deleteSpeed - ms per character deleting
 * @param {number} pauseTime - ms to pause after typing a word
 */
export function useTypingAnimation(words, typeSpeed = 100, deleteSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // Typing
      if (text.length < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing, pause then delete
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime]);

  return text;
}
