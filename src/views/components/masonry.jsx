import {
  useEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import "../../styles/masonry.css";

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Gallery = ({
  items = [], // Valor por defecto para evitar errores
  autoPlayInterval = 3000, // Intervalo de cambio automático en ms
  ease = "power2.out",
  duration = 0.6,
  showThumbnails = true,
  enableAutoplay = true,
  header = null, // Nuevo prop para el header
  rotatingTextComponent = null, // Nuevo prop para el componente rotating text
}) => {
  // Validación temprana para evitar errores
  if (!items || items.length === 0) {
    return <div className="gallery">No items to display</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(enableAutoplay);
  const intervalRef = useRef(null);
  const galleryRef = useRef(null);

  // Función para ir a la siguiente imagen
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  // Función para ir a la imagen anterior
  const previousImage = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  // Función para ir a una imagen específica
  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && items.length > 1) {
      intervalRef.current = setInterval(nextImage, autoPlayInterval);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, autoPlayInterval, items.length]);

  // Pausar auto-play cuando el mouse está sobre la galería
  const handleMouseEnter = () => {
    if (enableAutoplay) {
      setIsAutoPlaying(false);
    }
  };

  // Reanudar auto-play cuando el mouse sale de la galería
  const handleMouseLeave = () => {
    if (enableAutoplay) {
      setIsAutoPlaying(true);
    }
  };

  // Animación de transición entre imágenes
  useEffect(() => {
    const mainImage = galleryRef.current?.querySelector('.main-image');
    if (mainImage) {
      gsap.fromTo(mainImage, 
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: duration, ease: ease }
      );
    }
  }, [currentIndex, duration, ease]);

  const currentItem = items[currentIndex];

  return (
    <div 
      ref={galleryRef}
      className="gallery"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header section */}
      {header && header}
      
      {/* Imagen principal o rotating text */}
      <div className="main-image-container">
        {currentItem.isRotatingText ? (
          <div className="rotating-text-slide">
            {rotatingTextComponent}
          </div>
        ) : (
          <img
            src={currentItem.img}
            alt={currentItem.name || `Image ${currentIndex + 1}`}
            className="main-image"
          />
        )}
        
        {/* Controles de navegación */}
        <button 
          className="nav-button nav-button-prev"
          onClick={previousImage}
          aria-label="Previous image"
        >
          &#8249;
        </button>
        
        <button 
          className="nav-button nav-button-next"
          onClick={nextImage}
          aria-label="Next image"
        >
          &#8250;
        </button>

        {/* Indicadores de posición */}
        <div className="indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Miniaturas (thumbnails) */}
      {showThumbnails && items.length > 1 && (
        <div className="thumbnails-container">
          <div className="thumbnails">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`thumbnail ${index === currentIndex ? 'active' : ''} ${item.isRotatingText ? 'rotating-text-thumbnail' : ''}`}
                onClick={() => goToImage(index)}
              >
                {item.isRotatingText ? (
                  <div className="rotating-text-icon">T</div>
                ) : (
                  <img
                    src={item.img}
                    alt={item.name || `Thumbnail ${index + 1}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control de auto-play */}
      {enableAutoplay && (
        <button 
          className="autoplay-toggle"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isAutoPlaying ? '⏸️' : '▶️'}
        </button>
      )}
    </div>
  );
};

export default Gallery;
