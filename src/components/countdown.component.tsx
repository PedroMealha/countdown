import { useState, useEffect } from 'react';
import './countdown.css';

interface DialProps {
	digit: string;
	isIncrementing: boolean;
}

const Dial: React.FC<DialProps> = ({ digit, isIncrementing }) => {
	const [rotation, setRotation] = useState(-36 * parseInt(digit, 10));

	useEffect(() => {
		setRotation((prevRotation) => {
			const expectedRotation = -36 * parseInt(digit, 10);
			let rotationIncrement = expectedRotation - (prevRotation % 360);
			if (isIncrementing) {
				if (digit === '0' && rotationIncrement > 0) {
					rotationIncrement -= 360;
				}
			} else {
				if (digit === '9' && rotationIncrement > 0) {
					rotationIncrement -= 360;
				} else if (rotationIncrement < -36) {
					rotationIncrement += 360;
				}
			}

			return prevRotation + rotationIncrement;
		});
	}, [digit, isIncrementing]);

	return (
		<div className='dial' style={{ transform: `rotateX(${rotation}deg)` }}>
			{[...Array(10)].map((_, index) => (
				<div key={index} className='number' style={{ transform: `rotateX(${index * 36}deg) translateZ(50px)` }}>
					{index}
				</div>
			))}
		</div>
	);
};

interface CountdownProps {
	startNumber: number;
	endNumber: number;
}

const Countdown: React.FC<CountdownProps> = ({ startNumber, endNumber }) => {
	const [currentNumber, setCurrentNumber] = useState(startNumber);
	const isIncrementing = endNumber > startNumber;

	useEffect(() => {
		const timeout = setTimeout(() => {
			const interval = setInterval(() => {
				setCurrentNumber((prev) => {
					if ((isIncrementing && prev === endNumber) || (!isIncrementing && prev === endNumber)) {
						clearInterval(interval);
						return prev;
					}
					return prev + (isIncrementing ? 1 : -1);
				});
			}, 1000);

			return () => clearInterval(interval);
		}, 1000);

		return () => clearTimeout(timeout);
	}, [startNumber, endNumber, isIncrementing]);

	const renderDials = () => {
		const numberString = currentNumber.toString().padStart(10, '0');

		return numberString.split('').map((digit, i) => <Dial key={i} digit={digit} isIncrementing={isIncrementing} />);
	};

	return <div className='countdown'>{renderDials()}</div>;
};

export default Countdown;
