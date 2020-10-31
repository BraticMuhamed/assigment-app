import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/rootReducer';

import './Pagination.css';

interface Props {
  onPageChange: (index: number) => void;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({ onPageChange, currentPage }: Props) => {
  const totalPages = useSelector(
    (state: RootState) => state.items.results.total_pages
  );
  const ONE = 1;

  // eslint-disable-next-line @typescript-eslint/ban-types
  const renderPages = (): Array<JSX.Element> => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(<div onClick={() => onPageChange(i)}>{i}</div>);
    }

    return pages;
  };

  return (
    <div>
      {currentPage > ONE ? (
        <FontAwesomeIcon
          icon={faArrowLeft}
          onClick={() => onPageChange(currentPage - ONE)}
        />
      ) : null}
      {renderPages()}
      {currentPage === totalPages ? (
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={() => onPageChange(currentPage + ONE)}
        />
      ) : null}
    </div>
  );
};

export default Pagination;
