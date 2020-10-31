import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import './Button.css';

interface Props {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  isPushBack?: boolean;
}

export const Button: React.FC<Props> = ({
  label,
  onClick,
  selected,
  isPushBack,
}: Props) => {
  let className = 'button';

  if (selected ?? true) {
    className += ' button-selected';
  }

  if (isPushBack ?? true) {
    className = 'pushback-button';
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {isPushBack ?? true ? (
        <FontAwesomeIcon icon={faChevronLeft} className="pushback-icon" />
      ) : null}
      {label}
    </button>
  );
};

Button.defaultProps = {
  selected: false,
  isPushBack: false,
};

export default Button;
