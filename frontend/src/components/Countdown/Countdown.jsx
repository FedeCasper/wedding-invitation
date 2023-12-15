import './Countdown.css'
import React, { Component } from 'react';

const AnimatedCard = ({ animation, digit }) => (
	<div className={`flipCard ${animation}`}>
		<span>{digit}</span>
	</div>
);

const StaticCard = ({ position, digit }) => (
	<div className={position}>
		<span>{digit}</span>
	</div>
);

const FlipUnitContainer = ({ digit, shuffle, unit }) => {
	let currentDigit = digit;
	let previousDigit = digit - 1;

	if (unit === 'days') {
		previousDigit = previousDigit === 0 ? 30 : previousDigit;
	} else if (unit !== 'months') {
		previousDigit = previousDigit === -1 ? 59 : previousDigit;
	} else {
		previousDigit = previousDigit === 0 ? 12 : previousDigit;
	}

	if (currentDigit < 10) {
		currentDigit = `0${currentDigit}`;
	}
	if (previousDigit < 10) {
		previousDigit = `0${previousDigit}`;
	}

	const digit1 = shuffle ? previousDigit : currentDigit;
	const digit2 = !shuffle ? previousDigit : currentDigit;

	const animation1 = shuffle ? 'fold' : 'unfold';
	const animation2 = !shuffle ? 'fold' : 'unfold';

	return (
		<div className={'flipUnitContainer'}>
			<StaticCard position={'upperCard'} digit={currentDigit} />
			<StaticCard position={'lowerCard'} digit={previousDigit} />
			<AnimatedCard digit={digit1} animation={animation1} />
			<AnimatedCard digit={digit2} animation={animation2} />
		</div>
	);
};

class FlipClock extends Component {
	constructor(props) {
		super(props);
		this.state = {
			months: 0,
			monthsShuffle: true,
			days: 0,
			daysShuffle: true,
			hours: 0,
			hoursShuffle: true,
			minutes: 0,
			minutesShuffle: true,
			seconds: 0,
			secondsShuffle: true,
		};
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.updateTime(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	updateTime() {
		const targetDate = new Date(2024, 2, 9, 18, 0, 0);

		// Fecha actual
		const currentDate = new Date();
	
		// Diferencia en milisegundos entre las dos fechas
		const difference = targetDate - currentDate;
		const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44)); // Promedio de días en un mes
		const days = Math.floor(difference / (1000 * 60 * 60 * 24) % 30);
		const hours = Math.floor(difference / (1000 * 60 * 60) % 24);
		const minutes = Math.floor((difference / (1000 * 60)) % 60);
		const seconds = Math.floor((difference / 1000) % 60);
		

		if (months !== this.state.months) {
			const monthsShuffle = !this.state.monthsShuffle;
			this.setState({ months, monthsShuffle });
		}

		if (days !== this.state.days) {
			const daysShuffle = !this.state.daysShuffle;
			this.setState({ days, daysShuffle });
		}

		if (hours !== this.state.hours) {
			const hoursShuffle = !this.state.hoursShuffle;
			this.setState({ hours, hoursShuffle });
		}

		if (minutes !== this.state.minutes) {
			const minutesShuffle = !this.state.minutesShuffle;
			this.setState({ minutes, minutesShuffle });
		}

		if (seconds !== this.state.seconds) {
			const secondsShuffle = !this.state.secondsShuffle;
			this.setState({ seconds, secondsShuffle });
		}
	}


	render() {
		const { months, days, hours, minutes, seconds, monthsShuffle, daysShuffle, hoursShuffle, minutesShuffle, secondsShuffle } = this.state;

		return (
			<>
				<h5  className='text-xl text-center font-medium w-64 text-white tracking-wide mb-4
					lg:text-2xl lg:pb-8'>Faltan...</h5>
				<div className={'flipClock'}>
					<FlipUnitContainer unit={'months'} digit={months} shuffle={monthsShuffle} />
					<FlipUnitContainer unit={'days'} digit={days} shuffle={daysShuffle} />
					<FlipUnitContainer unit={'hours'} digit={hours} shuffle={hoursShuffle} />
					<FlipUnitContainer unit={'minutes'} digit={minutes} shuffle={minutesShuffle} />
					<FlipUnitContainer unit={'seconds'} digit={seconds} shuffle={secondsShuffle} />
				</div>
				<div className='grid grid-rows-1 grid-cols-5 gap-1 text-xs w-full md:w-[764px] mt-3 text-center
					lg:text-base'>
					<div>meses</div>
					<div>días</div>
					<div>hrs</div>
					<div>min</div>
					<div>seg</div>
				</div>
			</>
		);
	}
}

export default FlipClock;
