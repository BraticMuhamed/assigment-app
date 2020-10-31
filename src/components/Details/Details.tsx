import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { RootState } from '../../redux/rootReducer';
import { Image, Button, Loader, NoResults } from '../lib';
import { fetchItem, getItemInit } from '../../redux/itemSlice';
import { Item } from '../../api/tmdbApi';
import {
  baseImageURL500,
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

    return `${baseImageURL500}${posterPath}`;
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
    let videoSrc = '';

    if (item.videos && item.videos.results.length) {
      videoSrc =
        item.videos.results[firstIndex].site === 'YouTube'
          ? `https://www.youtube.com/embed/${item.videos.results[firstIndex].key}`
          : `https://www.vimeo.com/${item.videos.results[firstIndex].key}`;
    }

    return (
      <>
        {item.videos && item.videos.results.length ? (
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
        <h1>Title: {tab === tabs.movie.key ? item.title : item.name}</h1>
        <text className="details-overview-title">Overview:</text>
        <textarea readOnly value={item.overview} className="details-textarea" />
      </>
    );
  };

  return (
    <div className="details-container">
      <Button label="Back" onClick={handlePushback} isPushBack />
      {renderChild()}
    </div>
  );
};

export default Details;
