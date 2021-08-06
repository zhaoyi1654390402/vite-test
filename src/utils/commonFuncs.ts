import dayjs from 'dayjs';
import BigNumber from 'bignumber.js'

export function notHas(any: any, key: any) {
	return !(any ? any[key] : false);
}
export function dateToString(date: Date, fmt: string) {
	return dayjs(date).format(fmt);
}
