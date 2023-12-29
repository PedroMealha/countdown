import { useState, useEffect } from "react";

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

export default Dial;