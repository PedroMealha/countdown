import { useEffect, useMemo, useState } from 'react';

interface DigitProps {
	value: string;
}

const Digit: React.FC<DigitProps> = ({ value }) => {
	const [justReachedZero, setJustReachedZero] = useState(false);

	useEffect(() => {
		value === '0' ? setJustReachedZero(true) : setJustReachedZero(false);
	}, [value, justReachedZero]);

	const transformValue = useMemo(() => {
		let numValue = parseInt(value, 10);
		if (justReachedZero) numValue = 10;
		return `translateY(-${numValue * (100 / 11)}%)`;
	}, [value, justReachedZero]);

	return (
		<div className='digit'>
			<div className={`digits-list ${justReachedZero ? 'no-transition' : ''}`} style={{ transform: transformValue }}>
				{[...Array(10).keys()].map((num) => (
					<div key={num} className='digit-value'>
						{num}
					</div>
				))}
				<div className='digit-value'>0</div>
			</div>
		</div>
	);
};

export default Digit;
