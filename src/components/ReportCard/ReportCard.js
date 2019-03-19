import React from 'react';
import './ReportCard.css';

const ReportCard = ({ country, onCountryClick }) => {
	const { name, population } = country;
	return (
		<div onClick={onCountryClick} className="reportCard">
			<p>{name}</p>
			<p>{population}</p>
		</div>
	);
};

export default ReportCard;
