import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './InputField.css';


interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="input-wrapper">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="input"
      />
    </div>
  );
};

export default InputField;
