import dayjs from 'dayjs';

export function notHas(any: any, key: any) {
	return !(any ? any[key] : false);
}
// 日期转字符串
export function dateToString(date: Date, fmt: string) {
	return dayjs(date).format(fmt);
}
//经纬度转角度
export function rad(angle: number) {
	let radian = (angle * Math.PI) / 180;
	return radian;
}
// 经纬度计算距离(输出为米)
export function getDistance(
	lng1: number,
	lat1: number,
	lng2: number,
	lat2: number
) {
	let earchRadius = 6378137.0; //地球平均半径
	let s =
		2 *
		Math.asin(
			Math.sqrt(
				Math.pow(Math.sin((rad(lat1) - rad(lat2)) / 2), 2) +
					Math.cos(rad(lat1)) *
						Math.cos(rad(lat2)) *
						Math.pow(Math.sin((rad(lng1) - rad(lng2)) / 2), 2)
			)
		);
	s = earchRadius * s;
	s = Math.ceil(Math.round(s * 10000) / 10000); //输出为米
	return s;
}
