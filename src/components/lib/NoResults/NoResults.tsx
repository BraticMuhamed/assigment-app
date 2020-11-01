import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';

import './NoResults.css';

interface Props {
	text: string;
}

const NoResults: React.FC<Props> = ({ text }: Props) => {
	return (
		<div className="no-results-container">
			<FontAwesomeIcon icon={faFrown} className="no-results-icon" />
			<span>{text}</span>
		</div>
	)
}

export default NoResults;
