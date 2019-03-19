import React from 'react';
import './Filter.css';

const englishAlphabet = [
	'ALL',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

const ReportFilter = ({ activeFilter, isSorted, onAlphabetClick, onInputChange, onSortClick }) => {
	const letterChoice = englishAlphabet.map((letter, idx) => (
		<span
			className={`letter${activeFilter === letter ? ' active' : ''}`}
			onClick={() => onAlphabetClick(letter)}
			key={idx}
		>
			{letter}
		</span>
	));
	return (
		<div className="filter">
			<button type="button" onClick={onSortClick}>
				{isSorted ? 'SORT BY NAME' : 'SORT BY POPULATION'}
			</button>
			<div>
				{letterChoice}
				<input placeholder="Search" onChange={onInputChange} />
			</div>
		</div>
	);
};
export default ReportFilter;
