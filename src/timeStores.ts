import { derived, get, readable, writable } from 'svelte/store';
import { DateTime, Duration } from "luxon";
import { isNil, round } from 'lodash';
import { color } from 'd3-color';
import query from "./query-store";
import { derivedMemo, derivedWithKey } from './derivedMemo';

export const nowSecond = readable(DateTime.now(), function start(set) {
	const interval = setInterval(() => {
		set(DateTime.now());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

export const now = readable(DateTime.now(), function start(set) {
	const interval = setInterval(() => {
		set(DateTime.now());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});

export const zones = writable([
	// DateTime.now().toLocal().zoneName,
	"America/New_York",
	"America/Chicago",
	"America/Denver",
	"America/Los_Angeles",
	"Europe/London",
	"Japan",
	"UTC",
].map(tz => DateTime.now().setZone(tz).zoneName)
)

export const localTimeZone = derived(query,
	$query => $query.tz ?? DateTime.now().toLocal().zoneName
)


export const nowMinute = derivedWithKey(
	now,
	$now => $now.startOf('minute'),
	$nowMinute => $nowMinute.toISO(),
)
export const nowHour = derivedWithKey(
	nowMinute,
	$nowMinute => $nowMinute.startOf('hour'),
	$nowHour => $nowHour.toISO(),
)
export const localDayStart = derived(
	[nowHour, localTimeZone],
	([$nowHour, $localTimeZone]) => $nowHour.setZone($localTimeZone).startOf('day')
)


export const MINUTES_PER_DAY = 24 * 60;

export const barStartHour = derived(query, $query => Number($query.start ?? 7))
export const barEndHour = derived(
	[query, barStartHour],
	([$query, $barStartHour]) => Math.max(Number($query.end ?? 19), $barStartHour + 1),
)

export const dayFraction = derived(
	[nowMinute, localDayStart, barStartHour, barEndHour, localTimeZone],
	([$nowMinute, $localDayStart, $barStartHour, $barEndHour, $localTimeZone]) => {
		const barStartTime = $localDayStart.plus({ hours: $barStartHour }).setZone($localTimeZone)
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
	// console.log('localDayStart.zoneName', localDayStart.zoneName)

	const colors = hours.map((hour, i) => {
		const zoneHour = localDayStart.plus({ hours: hour }).setZone(zone).hour
		const color = baseColor.darker(hourDarkness(zoneHour))

		const start = round(100 * i / length)
		const end = round(100 * (i + 1) / length)
		return `linear-gradient(to right, transparent ${start}%, ${color} ${start}% ${end}%, transparent ${end}%)`
	})

	return colors.join(',\n')
}


export const cursorPosition = writable({
	active: false,
	marginLeft: 0,
	ratio: 0.0,
	time: DateTime.now(),
})
