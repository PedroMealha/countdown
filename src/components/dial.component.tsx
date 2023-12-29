import { useState, useEffect } from 'react';

interface DialProps {
	currentDigit: string;
	finalDigit: string;
	duration: number;
}

const Dial: React.FC<DialProps> = ({ currentDigit, finalDigit, duration }) => {
	const getRandomRotation = (digit: string, finalDigit: string) => {
		const extraRotations = Math.floor(Math.random() * 3 + 1);
		const startRotation = -36 * parseInt(digit, 10);
		const finalRotation = -36 * parseInt(finalDigit, 10);
		return startRotation - 360 * extraRotations + (finalRotation - startRotation);
	};

	const [rotation, setRotation] = useState(getRandomRotation(currentDigit, finalDigit));

	useEffect(() => {
		setRotation(-36 * parseInt(finalDigit, 10));
	}, [finalDigit, duration]);

	return (
		<div className='dial' style={{ transform: `rotateX(${rotation}deg)`, transitionDuration: `${duration}ms` }}>
			{[...Array(10)].map((_, index) => (
				<div
					key={index}
					className='number'
					style={{
						transform: `rotateX(${index * 36}deg) translateZ(1.5em)`,
					}}>
					{index}
				</div>
			))}
		</div>
	);
};

export default Dial;
