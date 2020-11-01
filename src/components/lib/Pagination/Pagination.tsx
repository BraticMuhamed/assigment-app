import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/rootReducer';

import './Pagination.css';

interface Props {
  onPageChange: (index: number | undefined) => void;
  currentPage: number;
}

const ONE = 1;
const TWO = 1;
const range = (from: number, to: number, step = ONE): [number?] => {
  let i = from;
  const range: [number?] = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Pagination: React.FC<Props> = ({ onPageChange, currentPage }: Props) => {
  const totalPages = useSelector(
    (state: RootState) => state.items.results.total_pages
  );

  if (!totalPages) {
    return null;
  }

  const renderChild = (
    child: JSX.Element | number | string | null = null,
    id?: number
  ): JSX.Element => (
    <li
      key={id}
      className={`pagination-child ${
        id === currentPage ? 'pagination-child-selected' : ''
      }`}
      onClick={() => onPageChange(id)}
    >
      {child}
    </li>
  );

  const fetchPageNumbers = (): [number?] => {
    const pageNeighbours = 2;
    const totalNumbers = 7;
    const totalBlocks = 9;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(ONE, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages, currentPage + pageNeighbours);
      let pages = range(startPage, endPage);
      const hasLeftSpill = startPage > TWO;
      const hasRightSpill = totalPages - endPage > ONE;
      const spillOffset = totalNumbers - (pages.length + ONE);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - ONE);
          pages = [...extraPages, ...pages];
          break;
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + ONE, endPage + spillOffset);
          pages = [...pages, ...extraPages];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [...pages];
          break;
        }
      }

      return [...pages];
    }

    return range(ONE, totalPages);
  };

  return (
    <ul className="pagination-container">
      {currentPage !== ONE && renderChild('First page', ONE)}
      {currentPage > ONE
        ? renderChild(<FontAwesomeIcon icon={faArrowLeft} />, currentPage - ONE)
        : null}
      {fetchPageNumbers().map(item => renderChild(item, item))}
      {currentPage < totalPages
        ? renderChild(
            <FontAwesomeIcon icon={faArrowRight} />,
            currentPage + ONE
          )
        : null}
      {currentPage !== totalPages && renderChild('Last page', totalPages)}
    </ul>
  );
};

export default Pagination;
