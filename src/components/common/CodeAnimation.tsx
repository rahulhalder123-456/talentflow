"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeLines = [
  'const App = () => {',
  '  return (',
  '    <div className="hero">',
  '      <motion.h1',
  '        initial={{ opacity: 0, y: -20 }}',
  '        animate={{ opacity: 1, y: 0 }}',
  '        transition={{ duration: 0.8 }}',
  '      >',
  '        Welcome to Talent Flow',
  '      </motion.h1>',
  '    </div>',
  '  );',
  '};',
  '',
  'export default App;',
];

const syntaxHighlight = (line: string) => {
  return line
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\b(const|let|var|function|return|export|default)\b/g, '<span class="text-pink-400">$1</span>')
    .replace(/\b(className|initial|animate|transition|duration)\b/g, '<span class="text-cyan-400">$1</span>')
    .replace(/(\w+)=({|['"])/g, (match, p1, p2) => `<span class="text-cyan-400">${p1}</span>=${p2}`)
    .replace(/('|").*?('|")/g, '<span class="text-amber-300">$&</span>')
    .replace(/({|}|[|]|(|))/g, '<span class="text-yellow-300">$&</span>')
    .replace(/(&lt;\/?\w+)/g, '<span class="text-pink-400">$1</span>')
    .replace(/(\d+(\.\d+)?)/g, '<span class="text-teal-300">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>');
};


export function CodeAnimation() {
  const [currentLines, setCurrentLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= codeLines.length) {
      const resetTimeout = setTimeout(() => {
        setLineIndex(0);
        setCurrentLines([]);
        setCharIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
    
    const line = codeLines[lineIndex];
    if (charIndex >= line.length) {
      const lineTimeout = setTimeout(() => {
        setCurrentLines(prev => [...prev, line]);
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
      }, 200);
      return () => clearTimeout(lineTimeout);
    }
    
    const charTimeout = setTimeout(() => {
        setCharIndex(charIndex + 1);
    }, 20 + Math.random() * 20);

    return () => clearTimeout(charTimeout);

  }, [lineIndex, charIndex]);


  const displayedLines = [...currentLines];
  if(lineIndex < codeLines.length) {
    displayedLines.push(codeLines[lineIndex].substring(0, charIndex));
  }

  return (
    <motion.div
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden" 
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-[700px] h-[400px] transform-gpu rounded-xl bg-secondary/30 p-4 font-code text-sm text-left shadow-2xl ring-1 ring-white/10 [transform:perspective(1000px)_rotateX(15deg)_translateY(-20%)]">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <pre className="text-gray-300 h-[calc(100%-20px)] overflow-hidden">
          {displayedLines.map((line, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-4 w-6 select-none text-right text-gray-500">{index + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }} />
              {index === displayedLines.length - 1 && lineIndex < codeLines.length && <span className="animate-pulse ml-0.5 h-4 w-px bg-white"></span>}
            </div>
          ))}
        </pre>
      </div>
    </motion.div>
  );
}
