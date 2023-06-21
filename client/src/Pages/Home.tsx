import React, { useEffect, useRef, useState } from 'react';
import './Home.css'
import myVideo from './Dancing.mp4';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../Images/logo.png'

const Carousel3D = () => {
  const text = "KUR KËRCEN, MUND TË GËZOHESH MOMENTIN E TË QENURIT VETVETJA.";
  const words = text.split(" ");
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];
    setVisibleWords([]);

    words.forEach((word, index) => {
      const timer = setTimeout(() => {
        setVisibleWords(prevWords => [...prevWords, word]);
      }, (index + 1) * 350);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div style={{ maxWidth: '100%' }}>

      <video style={{ transform: 'scale(1.22)', maxWidth: '100%', }} playsInline autoPlay muted loop>

        <source src={myVideo} type="video/mp4" />
      </video>
      <div id="fashion" className="big-bold-text">
        <div className="col">
          <motion.div className="text-gray-800">
            <AnimatePresence>
              {visibleWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {word + " "}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
        <div className="logo-container">
          <div className="sparkle-effect"></div>
          <img src={logo} alt="Logo" className="logo-image" />
        </div>



      </div>
      



    </div>

  );
};

export default Carousel3D;
