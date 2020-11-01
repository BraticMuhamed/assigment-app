import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { RootState } from '../../redux/rootReducer';
import { Image, Button, Loader, NoResults } from '../lib';
import { fetchItem, getItemInit } from '../../redux/itemSlice';
import { Item } from '../../api/tmdbApi';
import {
  baseImageURL342,
  noResultsItemText,
  tabs,
} from '../../helpers/constants';

import './Details.css';

const Details: React.FC = () => {
  const { id, tab } = useParams<{ id: string; tab: string }>();
  const item = useSelector((state: RootState) => state.item.result);
  const isLoading = useSelector((state: RootState) => state.item.isLoading);
  const error = useSelector((state: RootState) => state.item.error);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!item.id && error === null) {
      dispatch(fetchItem(tab, parseInt(id, 10)));
    }
  }, [item, tab, id, dispatch, error]);

  const getSrc = (item: Item): string => {
    let posterPath = item.poster_path;

    if (posterPath == null) {
      posterPath = '';
    }

    return `${baseImageURL342}${posterPath}`;
  };

  const handlePushback = (): void => {
    dispatch(getItemInit());
    history.push('/');
  };

  const renderChild = (): JSX.Element => {
    if (isLoading) {
      return <Loader />;
    }

    if (!item.id) {
      return <NoResults text={noResultsItemText} />;
    }

    const firstIndex = 0;
    const obj = item.videos.results[firstIndex];
    let videoSrc = '';

    if (obj) {
      videoSrc =
        obj.site === 'YouTube'
          ? `https://www.youtube.com/embed/${obj.key}`
          : `https://www.vimeo.com/${obj.key}`;
    }

    return (
      <>
        <div className="media-wrapper">
          {item.videos.results.length ? (
            <iframe
              src={videoSrc}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              className="details-video"
            />
          ) : (
            <Image src={getSrc(item)} />
          )}
        </div>
        <h1>Title: {tab === tabs.movie.key ? item.title : item.name}</h1>
        <span className="details-overview-title">Overview:</span>
        <textarea readOnly value={item.overview} className="details-textarea" />
      </>
    );
  };

  return (
    <div className="details-container" data-testid="details">
      <Button label="Back" onClick={handlePushback} isPushBack />
      {renderChild()}
    </div>
  );
};

export default Details;
