import { derived, readable, writable } from 'svelte/store';
import { DateTime, Duration } from "luxon";
import { round } from 'lodash';
import { color } from 'd3-color';

export const now = readable(DateTime.now(), function start(set) {
	const interval = setInterval(() => {
		set(DateTime.now());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

export const zones = writable([
	"US/Eastern",
	"US/Central",
	"US/Mountain",
	"US/Pacific",
	"Europe/London",
	"Japan",
	"UTC",
	// "America/New_York",
	// "America/Chicago",
])

export const nowMinute = derived(now, $now => $now.startOf('minute'))
export const nowHour = derived(nowMinute, $nowMinute => $nowMinute.startOf('hour'))
export const localDayStart = derived(nowHour, $nowHour => $nowHour.startOf('day'))
export const localTimeZone = derived(nowHour, $nowHour => $nowHour.toLocal().zoneName)


export const MINUTES_PER_DAY = 24 * 60;

export const barStartHour = writable(6)
export const barEndHour = writable(12 + 8)

export const dayFraction = derived(
	[nowMinute, localDayStart, barStartHour, barEndHour],
	([$nowMinute, $localDayStart, $barStartHour, $barEndHour]) => {
		const barStartTime = $localDayStart.plus({ hours: $barStartHour }).toLocal()
		const barTotalMinutes = ($barEndHour - $barStartHour) * 60
		const { minutes } = $nowMinute.diff(barStartTime, "minutes")
		const ratio = Math.round(minutes) / barTotalMinutes
		return ratio
	})

export const hours = derived([barStartHour, barEndHour], ([$barStartHour, $barEndHour]) => {
	const hours_ = [];
	for (let hour = $barStartHour; hour < $barEndHour; hour++) {
		hours_.push(hour)
	}
	return hours_
})

export const hourDarkness = (hour: number) => {
	while (hour < 0) { hour += 24 }
	while (hour >= 24) { hour -= 24 }

	if (hour < 8) {
		return 2
	} else if (hour < 9) {
		return 1
	} else if (hour < 12) {
		return 0
	} else if (hour < 12 + 1) {
		return 1
	} else if (hour < 12 + 5) {
		return 0
	} else if (hour < 12 + 6) {
		return 1
	} else {
		return 2
	}
}

export const hourGradient = (localDayStart: DateTime, zone: string, backgroundColor: string, hours: number[]) => {
	const length = hours.length
	const baseColor = color(backgroundColor)!

	const colors = hours.map((hour, i) => {
		const zoneHour = localDayStart.plus({ hours: hour }).setZone(zone).hour
		const color = baseColor.darker(hourDarkness(zoneHour))

		const start = round(100 * i / length)
		const end = round(100 * (i + 1) / length)
		if (i == 0) {
			return `${color} ${end}%`
		} else if (i + 1 == length) {
			return `${color} ${start}%`
		} else {
			return `${color} ${start}% ${end}%`
		}
	})

	return `linear-gradient(to right, ${colors.join(', ')})`
}


export const cursorPosition = writable({
	active: false,
	marginLeft: 0,
	ratio: 0.0,
	time: DateTime.now(),
})
