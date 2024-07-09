import React, { useState, useRef, useEffect } from 'react'

const ScrollableChain = ({ blockNumbers, setSelectedBlock }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef(null)

  const nextSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      scrollRef.current.scrollLeft +=
        scrollRef.current.scrollWidth / (blockNumbers.length + 2)
    }
  }

  const prevSlide = () => {
    if (currentIndex < blockNumbers.length - 1) {
      setCurrentIndex(currentIndex + 1)
      scrollRef.current.scrollLeft -=
        scrollRef.current.scrollWidth / (blockNumbers.length + 2)
    }
  }

  const handleBlockClick = (block, index) => {
    setSelectedBlock(block)
    const blockWidth = scrollRef.current.scrollWidth / (blockNumbers.length + 2)
    scrollRef.current.scrollLeft = index * blockWidth
  }

  useEffect(() => {
    const adjustScrollPosition = () => {
      const totalScrollWidth = scrollRef.current.scrollWidth
      const visibleWidth = scrollRef.current.clientWidth
      scrollRef.current.scrollLeft = totalScrollWidth - visibleWidth
    }

    adjustScrollPosition()
    window.addEventListener('resize', adjustScrollPosition)
    return () => {
      window.removeEventListener('resize', adjustScrollPosition)
    }
  }, [blockNumbers])

  return (
    <div className='scrollable-chain-wrapper'>
      <button onClick={prevSlide} className='chain-button left'>
        &#10094;
      </button>
      <div className='scrollable-chain-container'>
        <div className='scrollable-chain' ref={scrollRef}>
          <div className='chain-item invisible'></div>{' '}
          {/* Invisible padding block */}
          {blockNumbers.map((block, index) => (
            <div
              key={block.id}
              className='chain-item'
              onClick={() => handleBlockClick(block, index)}
            >
              <h3>{block.title}</h3>
            </div>
          ))}
          <div className='chain-item invisible'></div>{' '}
          {/* Invisible padding block */}
        </div>
      </div>
      <button onClick={nextSlide} className='chain-button right'>
        &#10095;
      </button>
    </div>
  )
}

export default ScrollableChain
