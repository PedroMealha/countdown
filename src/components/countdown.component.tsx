import React, { useState, useEffect } from 'react';
import './Countdown.css';

interface CountdownProps {
	initialCount: number;
}

const Countdown: React.FC<CountdownProps> = ({ initialCount }) => {
	const [time, setTime] = useState<number>(initialCount);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const getDialRotation = (digit: number): number => {
		return digit * 36;
	};

	const formatTime = (time: number): number[] => {
		const hundreds = Math.floor(time / 100);
		const tens = Math.floor((time % 100) / 10);
		const ones = time % 10;
		return [hundreds, tens, ones];
	};

	const displayDigits = formatTime(time);

	return (
		<div className='countdown-container'>
			{displayDigits.map((digit, index) => (
				<div key={index} className='dial'>
					<div className='numbers' style={{ transform: `rotateX(${getDialRotation(digit)}deg)` }}>
						{Array.from({ length: 10 }).map((_, numIndex) => (
							<div key={numIndex} className='number'>
								{numIndex}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default Countdown;
