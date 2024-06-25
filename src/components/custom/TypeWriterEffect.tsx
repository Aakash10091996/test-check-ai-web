"use client";

import { useState, useEffect } from "react";
interface TypewriterProps {
  sentence: string;
}
const Typewriter: React.FC<TypewriterProps> = ({ sentence }) => {
  const [text, setText] = useState<string>("");
  const [blink, setBlink] = useState<boolean>(true);
  useEffect(() => {
    if (text.length === sentence.length) {
      return;
    }
    const timer = setTimeout(() => {
      setText((prevText: string) => {
        const nextChar = sentence[text.length];
        return prevText + nextChar;
      });
    }, 120);
    return () => clearTimeout(timer);
  }, [text, sentence]);
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prevBlink: boolean) => !prevBlink);
    }, 650);
    return () => clearInterval(blinkInterval);
  }, []);
  return (
    <div className="relative inline-block">
      <span className="text-gray-900">{text}</span>
      <span className={blink ? "invisible" : ""}>_</span>
    </div>
  );
};
export default Typewriter;
