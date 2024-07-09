import React, { useState, useRef } from 'react';

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
    if (currentIndex < data.length - 1) { // Allow scrolling to the last item
      setCurrentIndex(currentIndex + 1);
      scrollRef.current.scrollLeft += scrollRef.current.offsetWidth / 3;
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollRef.current.scrollLeft -= scrollRef.current.offsetWidth / 3;
    }
  };

  return (
    <div className="scrollable-chain-wrapper">
      <button onClick={prevSlide} className="chain-button left">
        &#10094;
      </button>
      <div className="scrollable-chain-container">
        <div className="scrollable-chain" ref={scrollRef} dir="rtl">
          {data.map((item) => (
            <div key={item.id} className="chain-item">
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <button onClick={nextSlide} className="chain-button right">
        &#10095;
      </button>
    </div>
  );
};

export default ScrollableChain;
