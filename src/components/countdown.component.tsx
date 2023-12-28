import { useState, useEffect } from 'react';
import Dial from './dial.component';
import './countdown.css';

export const ROTATION_INCREMENT = 36;

const Countdown = ({ initialCount }: { initialCount: number }) => {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		if (count > 0) {
			const timer = setTimeout(() => setCount((prevCount) => prevCount - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [count]);

	const numberOfDials = String(initialCount).length;
	const paddedCount = String(count).padStart(numberOfDials, '0');
	const digits = paddedCount.split('').map(Number);

	return (
		<div className='countdown' style={{ minWidth: `${digits.length}ch` }}>
			{digits.map((num, index) => {
				const initialRotation = -ROTATION_INCREMENT * num - 2 * ROTATION_INCREMENT;
				return <Dial key={index} number={num} initialRotation={initialRotation} />;
			})}
		</div>
	);
};

export default Countdown;
