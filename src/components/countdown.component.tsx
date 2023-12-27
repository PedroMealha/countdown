import React, { useEffect, useState } from 'react';
import './countdown.css';
import Digit from './digit.component';

interface CountdownProps {
	initialCount: number;
}

const Countdown: React.FC<CountdownProps> = ({ initialCount }) => {
	const [count, setCount] = useState(initialCount.toString().split(''));

	useEffect(() => {
		const interval = setInterval(() => {
			const currentCount = parseInt(count.join(''), 10);
			if (currentCount > 0) {
				const newCount = (currentCount - 1).toString().split('');
				while (newCount.length < count.length) {
					newCount.unshift('0');
				}
				setCount(newCount);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [count]);

	return (
		<div className='digit-container'>
			{count.map((digit, index) => (
				<Digit key={index} value={digit} />
			))}
		</div>
	);
};

export default Countdown;
