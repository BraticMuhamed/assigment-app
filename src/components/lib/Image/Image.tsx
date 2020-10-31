import React from 'react';

import './Image.css';

interface Props {
  src: string;
}

const Image: React.FC<Props> = ({ src }: Props) => {
  const loadDefaultImage = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    const target = event.target as HTMLImageElement;
    target.src = '/default_image.svg';
  };

  return <img src={src} alt="" onError={loadDefaultImage} className="image" />;
};

export default Image;
