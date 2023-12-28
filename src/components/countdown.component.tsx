import React, { useState, useEffect } from 'react';
import './countdown.css';

interface CountdownProps {
	startNumber: number;
	endNumber: number;
}

const Countdown: React.FC<CountdownProps> = ({ startNumber, endNumber }) => {
	const [currentNumber, setCurrentNumber] = useState(startNumber);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentNumber((prev) => {
				if (prev === endNumber) {
					clearInterval(interval);
					return prev;
				}
				return endNumber > startNumber ? prev + 1 : prev - 1;
			});
		}, 1000); // Adjust time for faster/slower animation

		return () => clearInterval(interval);
	}, [startNumber, endNumber]);

	const renderDials = () => {
		const dials = [];
		const numberString = currentNumber.toString().padStart(10, '0');
		for (let i = 0; i < numberString.length; i++) {
			const rotation = -36 * parseInt(numberString[i]);
			dials.push(
				<div key={i} className='dial' style={{ transform: `rotateX(${rotation}deg)` }}>
					{Array.from({ length: 10 }).map((_, index) => (
						<div key={index} className='number' style={{ transform: `rotateX(${index * 36}deg) translateZ(50px)` }}>
							{index}
						</div>
					))}
				</div>
			);
		}
		return dials;
	};

	return <div className='counter-slot-machine'>{renderDials()}</div>;
};

export default Countdown;
