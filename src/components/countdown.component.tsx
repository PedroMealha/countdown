import { useState, useEffect } from 'react';
import Dial from './dial.component';
import './countdown.css';

interface CountdownProps {
	startNumber: number;
	endNumber: number;
	speed?: number;
}

const Countdown: React.FC<CountdownProps> = ({ startNumber, endNumber, speed = 1000 }) => {
	const [currentNumber, setCurrentNumber] = useState(startNumber);
	const isIncrementing = endNumber > startNumber;

	const maxDigits = Math.max(startNumber.toString().length, endNumber.toString().length);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentNumber((prev) => {
				if ((isIncrementing && prev === endNumber) || (!isIncrementing && prev === endNumber)) {
					clearInterval(interval);
					return prev;
				}
				return prev + (isIncrementing ? 1 : -1);
			});
		}, speed);

		return () => clearInterval(interval);
	}, [startNumber, endNumber, isIncrementing]);

	const renderDials = () => {
		const numberString = currentNumber.toString().padStart(maxDigits, '0');

		return numberString.split('').map((digit, i) => {
			const isLeadingZero = i === 0;
			return <Dial key={i} digit={digit} isIncrementing={isIncrementing} speed={speed} isLeadingZero={isLeadingZero} />;
		});
	};

	return <div className='countdown'>{renderDials()}</div>;
};

export default Countdown;
