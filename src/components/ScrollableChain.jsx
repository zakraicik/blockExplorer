import React, { useState, useRef, useEffect } from 'react';

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
];

const ScrollableChain = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const scrollRef = useRef(null);

  const nextSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollRef.current.scrollLeft += scrollRef.current.scrollWidth / 3;
    }
  };

  const prevSlide = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollRef.current.scrollLeft -= scrollRef.current.scrollWidth / 3;
    }
  };

  useEffect(() => {
    const adjustScrollPosition = () => {
      const totalScrollWidth = scrollRef.current.scrollWidth;
      scrollRef.current.scrollLeft = totalScrollWidth 
    };

    adjustScrollPosition();
    window.addEventListener('resize', adjustScrollPosition);
    return () => {
      window.removeEventListener('resize', adjustScrollPosition);
    };
  }, []);

  return (
    <div>
      <div className="scrollable-chain-wrapper">
        <button onClick={prevSlide} className="chain-button left">
          &#10094;
        </button>
        <div className="scrollable-chain-container">
          <div className="scrollable-chain" ref={scrollRef}>
            <div className="chain-item invisible"></div> {/* Invisible padding block */}
            {data.map((item) => (
              <div key={item.id} className="chain-item">
                <h3>{item.title}</h3>
              </div>
            ))}
            <div className="chain-item invisible"></div> {/* Invisible padding block */}
          </div>
        </div>
        <button onClick={nextSlide} className="chain-button right">
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ScrollableChain;
