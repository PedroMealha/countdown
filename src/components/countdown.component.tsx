import { useEffect, useState } from 'react';
import Dial from './dial.component';
import './countdown.css';

interface CountdownProps {
	endNumber: number;
	duration?: number;
}

const Countdown: React.FC<CountdownProps> = ({ endNumber, duration = 1000 }) => {
	const getRandomNumber = (digits: number) =>
		Math.floor(Math.random() * (9 * Math.pow(10, digits - 1))) + Math.pow(10, digits - 1);
	const [currentNumber] = useState(getRandomNumber(endNumber.toString().length).toString());
	const maxDigits = endNumber.toString().length;

	const [blur, setBlur] = useState(.7);

	useEffect(() => {
		const blurTimeout = setTimeout(() => setBlur(0), 1);
		return () => clearTimeout(blurTimeout);
	}, [duration]);

	const renderDials = () => {
		const numberString = currentNumber.toString().padStart(maxDigits, '0');

		return numberString.split('').map((digit, i) => {
			return (
				<Dial
					key={i}
					currentDigit={digit}
					finalDigit={endNumber.toString().padStart(maxDigits, '0')[i]}
					duration={duration}
				/>
			);
		});
	};

	return (
		<div className='countdown' style={{ width: `${maxDigits}ch`, filter: `blur(${blur}px)`, transitionDuration: `${duration}ms` }}>
			{renderDials()}
		</div>
	);
};

export default Countdown;
