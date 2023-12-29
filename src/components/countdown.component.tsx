import { useState, useEffect } from 'react';
import './countdown.css';

interface DialProps {
	digit: string;
	isIncrementing: boolean;
	speed?: number;
	isLeadingZero: boolean;
}

const Dial: React.FC<DialProps> = ({ digit, isIncrementing, speed, isLeadingZero }) => {
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
		<div className='dial' style={{ transform: `rotateX(${rotation}deg)`, transitionDuration: `${speed}ms` }}>
			{[...Array(10)].map((_, index) => (
				<div
					key={index}
					className='number'
					style={{
						transform: `rotateX(${index * 36}deg) translateZ(2em)`,
						opacity: isLeadingZero && index === 0 ? 0 : 1,
					}}>
					{index}
				</div>
			))}
		</div>
	);
};

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
