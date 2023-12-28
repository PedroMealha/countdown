import { useState, useEffect } from 'react';
import { ROTATION_INCREMENT } from './countdown.component';

const Dial = ({ number, initialRotation }: { number: number; initialRotation: number }) => {
	const [rotation, setRotation] = useState(initialRotation);
	const [startCountdown, setStartCountdown] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setStartCountdown(true);
		}, 1000);
		return () => clearTimeout(timeoutId);
	}, []);

	useEffect(() => {
		setRotation((prev) => prev + ROTATION_INCREMENT);
	}, [number]);

	const digit = Array.from({ length: 10 }).map((_, index) => {
		const rotationDegree = ROTATION_INCREMENT * index;
		const style = {
			transform: `rotateX(${rotationDegree}deg) translateZ(1.5em)`,
		};
		return (
			<div className='digit' style={style} key={index}>
				{index}
			</div>
		);
	});

	const dialStyle = startCountdown
		? { transform: `rotateX(${rotation}deg)` }
		: { transform: `rotateX(${rotation}deg)`, transition: 'none' };

	return (
		<div className='dial' style={dialStyle}>
			{digit}
		</div>
	);
};

export default Dial;
