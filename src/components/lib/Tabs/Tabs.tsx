import React from 'react';
import { node } from 'prop-types';

import './Tabs.css';

const Tabs: React.FC = ({ children }) => {
  return (
    <div className="tabs-wrapper">
      {children}
    </div>
  );
};

Tabs.propTypes = {
  children: node,
};

Tabs.defaultProps = {
  children: null,
}

export default Tabs;
