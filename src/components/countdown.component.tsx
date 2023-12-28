import { useState, useEffect } from 'react';
import './countdown.css';

const Dial = ({ number, initialRotation }: { number: number; initialRotation: number }) => {
	const [rotation, setRotation] = useState(initialRotation);
	const [startCountdown, setStartCountdown] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setStartCountdown(true);
		}, 1000);
	}, []);

	useEffect(() => {
		setRotation((prev) => prev + 36);
	}, [number]);

	const faces = Array.from({ length: 10 }).map((_, index) => {
		const rotationDegree = 36 * index;
		const style = {
			transform: `rotateX(${rotationDegree}deg) translateZ(1.5em)`,
		};
		return (
			<div className='face' style={style} key={index}>
				{index}
			</div>
		);
	});

	const dialStyle = startCountdown
		? {
				transform: `rotateX(${rotation}deg)`,
		  }
		: {
				transform: `rotateX(${rotation}deg)`,
				transition: 'none',
		  };

	return (
		<div className='dial' style={dialStyle}>
			{faces}
		</div>
	);
};

const Countdown = ({ initialCount }: { initialCount: number }) => {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		if (count > 0) {
			const timer = setTimeout(() => setCount(count - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [count]);

	const numberOfDials = String(initialCount).length;

	const paddedCount = String(count).padStart(numberOfDials, '0');
	const digits = paddedCount.split('').map(Number);

	return (
		<div className='countdown' style={{minWidth: `${digits.length}ch`}}>
			{digits.map((num, index) => {
				const digit = parseInt(paddedCount[index], 10);
				const initialRotation = -36 * digit - 72; // Adjust as needed
				return <Dial key={index} number={num} initialRotation={initialRotation} />;
			})}
		</div>
	);
};

export default Countdown;
