import { useEffect, useState } from "react";

type CarouselProps = {
  photos: string[];
  isHovered: boolean;
  duration: number; // Duration in milliseconds
  height?: number;
};

const Carousel = ({ photos, isHovered, duration,height = 252 }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      );
    }, duration);

    return () => clearInterval(interval);
  }, [isHovered, currentIndex, photos.length, duration]);

  return (
    <div style={{...styles.carousel,height: `${height}px`}}>
      <div
        style={{
          ...styles.slideContainer,
          transform: `translateX(-${currentIndex * 100}%)`, // Slide to the current image
          transition: "transform 0.6s ease-in-out", // Smooth sliding transition
        }}
      >
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Slide ${index + 1}`}
            style={styles.image}
          />
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  carousel: {
    position: "relative",
    width: "252px",
    // height: "252px",
    overflow: "hidden", // Ensures only one image is visible
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  slideContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  image: {
    flexShrink: 0, // Prevents images from shrinking
    width: "100%", // Ensures image covers the entire carousel width
    height: "100%", // Ensures image covers the entire carousel height
    objectFit: "cover", // Makes sure images fit properly without distortion
  },
};

export default Carousel;
