'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      )}
      
      {/* Main Image */}
      <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gray-200">
        {images[selectedImage] && (
          <Image
            src={images[selectedImage]}
            alt={`Gallery image ${selectedImage + 1}`}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-blue-600 ring-2 ring-blue-300'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;









