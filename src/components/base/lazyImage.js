import React, { useState, useEffect, useRef } from 'react';
import './lazyImage.scss';

/**
 * LazyImage Component
 * Implements lazy loading with intersection observer and progressive image loading
 * Improves performance by deferring image loads until they're needed
 */
const LazyImage = ({
  src,
  alt = 'Image',
  placeholder = null,
  width = 'auto',
  height = 'auto',
  className = '',
  onLoad = null,
  onError = null,
  quality = 80,
  sizes = null,
  srcSet = null,
  lowQualitySrc = null, // For blur-up effect
}) => {
  const [imageSrc, setImageSrc] = useState(lowQualitySrc || placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Image is in viewport, load the actual image
            const imgElement = entry.target;
            setImageSrc(src);
            imgElement.src = src;
            observer.unobserve(imgElement);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setHasError(true);
    if (onError) onError();
  };

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={`lazy-image ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''} ${className}`}
      onLoad={handleImageLoad}
      onError={handleImageError}
      sizes={sizes}
      srcSet={srcSet}
      loading="lazy"
    />
  );
};

export default LazyImage;
