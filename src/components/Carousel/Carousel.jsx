import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";

const chunkItems = (items = [], itemsPerSlide = 1) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const chunks = [];
  for (let index = 0; index < items.length; index += itemsPerSlide) {
    chunks.push(items.slice(index, index + itemsPerSlide));
  }
  return chunks;
};

const defaultViewportStyle = {
  overflow: "hidden",
  position: "relative",
  cursor: "grab",
  userSelect: "none",
};

const defaultTrackStyle = {
  display: "flex",
  transition: "transform 0.5s ease-in-out",
};

const defaultNavButtonStyle = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  background: "#e0eeff",
  border: "none",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  zIndex: 10,
  fontSize: "30px",
  color: "#0466c8",
  hover: { background: "rgb(4, 102, 200)" },
};

const defaultIndicatorsContainerStyle = {
  position: "relative",
  bottom: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0px",
  marginTop: "30px",
  marginBottom: 0,
};

const defaultIndicatorStyle = {
  width: "30px",
  height: "3px",
  borderRadius: "2px",
  border: "none",
  cursor: "pointer",
  padding: 0,
  margin: "0 0px",
  transition: "all 0.3s ease",
  backgroundColor: "#ccc",
};

const Carousel = ({
  items = [],
  itemsPerSlide = 1,
  mobileItemsPerSlide = 1,
  tabletItemsPerSlide,
  renderSlide,
  className = "",
  style = {},
  viewportClassName = "",
  viewportStyle = {},
  trackClassName = "",
  trackStyle = {},
  showIndicators = true,
  indicatorsContainerClassName = "",
  indicatorsContainerStyle = {},
  indicatorButtonClassName = "",
  indicatorStyle = {},
  activeIndicatorStyle = { background: "#007bff" },
  inactiveIndicatorStyle = { background: "#ccc" },
  enableWheel = true,
  enableDrag = true,
  navigationClassName = "",
  navigationButtonStyle = {},
  prevButtonStyle = {},
  nextButtonStyle = {},
  prevButtonContent = "‹",
  nextButtonContent = "›",
  renderPrevButton,
  renderNextButton,
  onSlideChange,
  loop = true,
  dragThreshold = 50,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const viewportRef = useRef(null);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine items per slide based on screen size
  const getResponsiveItemsPerSlide = () => {
    if (windowWidth < 768) {
      // Mobile: < 768px
      return mobileItemsPerSlide || 1;
    } else if (windowWidth < 1024) {
      // Tablet: 768px - 1024px
      return tabletItemsPerSlide || itemsPerSlide || 2;
    } else {
      // Desktop: >= 1024px
      return itemsPerSlide || 4;
    }
  };

  const responsiveItemsPerSlide = getResponsiveItemsPerSlide();

  const slides = useMemo(
    () => chunkItems(items, Math.max(responsiveItemsPerSlide, 1)),
    [items, responsiveItemsPerSlide]
  );

  const totalSlides = slides.length;

  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(totalSlides > 0 ? totalSlides - 1 : 0);
    }
  }, [totalSlides, currentSlide]);

  useEffect(() => {
    if (typeof onSlideChange === "function") {
      onSlideChange(currentSlide);
    }
  }, [currentSlide, onSlideChange]);

  const goToSlide = useCallback(
    (index) => {
      if (totalSlides === 0) return;

      if (loop) {
        const nextIndex = (index + totalSlides) % totalSlides;
        setCurrentSlide(nextIndex);
      } else {
        const nextIndex = Math.max(0, Math.min(index, totalSlides - 1));
        setCurrentSlide(nextIndex);
      }
    },
    [loop, totalSlides]
  );

  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide, totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide, totalSlides]);

  const handleMouseDown = (event) => {
    if (!enableDrag || totalSlides <= 1) return;
    setIsDragging(true);
    setStartX(event.pageX);
  };

  const handleMouseMove = (event) => {
    if (!isDragging || startX === null) return;
    event.preventDefault();
    const diff = event.pageX - startX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
      setStartX(null);
    }
  };

  const endDrag = () => {
    setIsDragging(false);
    setStartX(null);
  };

  const handleWheel = (event) => {
    if (!enableWheel || totalSlides <= 1) return;
    event.preventDefault();
    if (event.deltaY > 0 || event.deltaX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const handleTouchStart = (event) => {
    if (!enableDrag || totalSlides <= 1) return;
    setIsDragging(true);
    setStartX(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (!enableDrag || startX === null) return;
    const currentX = event.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setIsDragging(false);
      setStartX(null);
    }
  };

  if (totalSlides === 0) {
    return null;
  }

  const composedViewportStyle = {
    ...defaultViewportStyle,
    cursor: isDragging ? "grabbing" : defaultViewportStyle.cursor,
    ...viewportStyle,
  };

  const composedTrackStyle = {
    ...defaultTrackStyle,
    transform: `translateX(-${currentSlide * 100}%)`,
    transition: isDragging ? "none" : defaultTrackStyle.transition,
    ...trackStyle,
  };

  const baseNavStyle = {
    ...defaultNavButtonStyle,
    ...navigationButtonStyle,
  };

  const composedPrevStyle = {
    left: "-15px",
    ...baseNavStyle,
    ...prevButtonStyle,
  };

  const composedNextStyle = {
    right: "-15px",
    ...baseNavStyle,
    ...nextButtonStyle,
  };

  const indicatorsWrapperStyle = {
    ...defaultIndicatorsContainerStyle,
    ...indicatorsContainerStyle,
  };

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div
        ref={viewportRef}
        className={viewportClassName}
        style={composedViewportStyle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={endDrag}
        onTouchCancel={endDrag}
      >
        <div className={trackClassName} style={composedTrackStyle}>
          {slides.map((slideItems, slideIndex) => (
            <div
              key={slideIndex}
              style={{
                minWidth: "100%",
                display: "flex",
                flexShrink: 0,
              }}
            >
              {typeof renderSlide === "function"
                ? renderSlide(slideItems, slideIndex, {
                    isActive: currentSlide === slideIndex,
                    isDragging,
                  })
                : slideItems.map((item, itemIndex) => (
                    <div key={item.key ?? itemIndex}>{item}</div>
                  ))}
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <>
          {renderPrevButton ? (
            renderPrevButton({
              onClick: prevSlide,
              isDisabled: !loop && currentSlide === 0,
              isDragging,
            })
          ) : (
            <button
              type="button"
              className={navigationClassName}
              style={composedPrevStyle}
              onClick={prevSlide}
            >
              {prevButtonContent}
            </button>
          )}

          {renderNextButton ? (
            renderNextButton({
              onClick: nextSlide,
              isDisabled: !loop && currentSlide === totalSlides - 1,
              isDragging,
            })
          ) : (
            <button
              type="button"
              className={navigationClassName}
              style={composedNextStyle}
              onClick={nextSlide}
            >
              {nextButtonContent}
            </button>
          )}
        </>
      )}

      {showIndicators && totalSlides > 1 && (
        <div
          className={`carousel-indicators ${indicatorsContainerClassName}`.trim()}
          style={indicatorsWrapperStyle}
        >
          {slides.map((_, index) => {
            const isActive = currentSlide === index;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={indicatorButtonClassName}
                style={{
                  ...defaultIndicatorStyle,
                  ...indicatorStyle,
                  ...(isActive ? activeIndicatorStyle : inactiveIndicatorStyle),
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Carousel;

