import React, { useState, useEffect } from 'react';
import FileServices from 'services/FileServices';

const ImagePreview = ({
  imageName,
  alt = 'Image Preview',
  className,
  width = 200,
  height = 200,
  fallbackSrc = '/assets/images/no-header-img.jpg',
  onClick,
  showFullscreen = false
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        const imageUrl = await FileServices.getIncidentImage(imageName);
        setImageUrl(imageUrl);
        setIsLoading(false);
      } catch (err) {
        console.error('Image loading error:', err);
        setError('Failed to load image');
        setIsLoading(false);
      }
    }
    if (imageName) {
      loadImage();
    }
  }, [imageName]);

  const handleImageClick = () => {
    if (showFullscreen) {
      setIsFullscreen(!isFullscreen);
    }
    if (onClick) {
      onClick();
    }
  }

  const renderImage = (fullscreen = false) => {
    if (isLoading) {
      return (
        <div >
          <span className="text-white">Loading...</span>
        </div>
      );
    }
    if (error || !imageUrl) {
      return (
        <img
          src={fallbackSrc}
          alt="Fallback"
          width={fullscreen ? '100%' : width}
          height={fullscreen ? 'auto' : height}

          onClick={handleImageClick}
        />
      );
    }
    return (
      <img
        src={imageUrl}
        alt={alt}
        width={fullscreen ? '100%' : width}
        height={fullscreen ? 'auto' : height}

        onClick={handleImageClick}
      />
    );
  }

  return (
    <>
      {renderImage(false)}
      {isFullscreen && (
        <div

          onClick={() => setIsFullscreen(false)}
        >
          {renderImage(true)}
        </div>
      )}
    </>
  );
}

ImagePreview.propTypes = {
  imageName: (props, propName, componentName) => {
    if (!props[propName]) {
      return new Error(`Prop ${propName} is required in ${componentName}`);
    }
    if (typeof props[propName] !== 'string') {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Expected string.`);
    }
  }
}

export default ImagePreview;
