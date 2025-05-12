import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fallback?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  fallback,
}) => {
  const [error, setError] = React.useState(false);

  const sizeStyles = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gray-100 overflow-hidden ${
        sizeStyles[size]
      } ${className}`}
    >
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      ) : (
        <span className="text-gray-600 font-medium">
          {fallback || getInitials(alt)}
        </span>
      )}
    </div>
  );
};

export default Avatar;