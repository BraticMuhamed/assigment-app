import React from 'react';

import { Item } from '../../../api/tmdbApi';
import Image from '../Image';

import './Card.css';

interface Props {
  item: Item;
  tab: string;
  onClick: (id: number) => void;
}

function Card({ item, tab, onClick }: Props): JSX.Element {
  const baseURL = 'https://image.tmdb.org/t/p/w500';
  let posterPath = item.poster_path;

  if (posterPath == null) {
    posterPath = '';
  }

  const path = `${baseURL}${posterPath}`;

  return (
    <div
      className="card-wrapper"
      onClick={() => onClick(item.id)}
      data-testid={`card-${item.id}`}
    >
      <Image src={path} />
      <div className="title">{tab === 'movie' ? item.title : item.name}</div>
    </div>
  );
}

export default Card;
