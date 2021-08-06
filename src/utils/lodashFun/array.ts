import { notHas } from '../commonFuncs';
import * as _ from 'lodash';
import _keyBy from 'lodash/keyBy';
import _countBy from 'lodash/countBy';
import _drop from 'lodash/drop';
import _dropRight from 'lodash/dropRight';
import _findLast from 'lodash/findLast';
import _findLastIndex from 'lodash/findLastIndex';
import _groupBy from 'lodash/groupBy';
import _maxBy from 'lodash/maxBy';
import _minBy from 'lodash/minBy';
import _partition from 'lodash/partition';
import _sortBy from 'lodash/sortBy';
import _sumBy from "lodash/sumBy";
import _take from 'lodash/take';
import _takeRight from 'lodash/takeRight';
import _uniqBy from 'lodash/uniqBy';

// Array.all=> Promise.all
if (notHas(Array.prototype, 'all')) {
	Object.defineProperty(Array.prototype, 'all', {
		value: function () {
			return Promise.all(this);
		},
		enumerable: false,
	});
}
// Array.associate => Array=> Object 数组转对象
if (notHas(Array.prototype, 'associate')) {
	Object.defineProperty(Array.prototype, 'associate', {
		value: function (cb: (item: any) => [string, any]) {
			return this.reduce(
				(previousValue: { [k: string]: any }, currentValue: any) => {
					let [key, value] = cb(currentValue);
					previousValue[key] = value;
					return previousValue;
				},
				{}
			);
		},
		enumerable: false,
	});
}
// Array.keyBy => loadsh keyBy  Array=> Object  按函数/属性数组转对象
if (notHas(Array.prototype, 'keyBy')) {
	Object.defineProperty(Array.prototype, 'keyBy', {
		value: function (
			iteratee: Array<string | symbol> | Function | Object | string
		) {
			return _keyBy(this, iteratee);
		},
		enumerable: false,
	});
}
// Array.compact => !Array.includes(''|0|false|null|undefined) 去除无意义值
if (notHas(Array.prototype, 'compact')) {
	Object.defineProperty(Array.prototype, 'compact', {
		value: function () {
			return this.filter((item: any) => !!item);
		},
		enumerable: false,
	});
}
// Array.countBy => lodash countBy 批量处理
if (notHas(Array.prototype, 'countBy')) {
	Object.defineProperty(Array.prototype, 'countBy', {
		value: function (iteratee: Array<string> | Function | Object | string) {
			return _countBy(this, iteratee);
		},
		enumerable: false,
	});
}
// Array.drop => lodash drop 切片前n项
if (notHas(Array.prototype, 'drop')) {
	Object.defineProperty(Array.prototype, 'drop', {
		value: function (n?: number) {
			return _drop(this, n);
		},
		enumerable: false,
	});
}
// Array.dropRight => lodash dropRight 切片后n项
if (notHas(Array.prototype, 'dropRight')) {
	Object.defineProperty(Array.prototype, 'dropRight', {
		value: function (n?: number) {
			return _dropRight(this, n);
		},
		enumerable: false,
	});
}
// Array.filterNonNullable => !Array.includes(null|undefined) 去除null|undefined
if (notHas(Array.prototype, 'filterNonNullable')) {
	Object.defineProperty(Array.prototype, 'filterNonNullable', {
		value: function () {
			return (this as any[]).filter(
				(item) => item !== null && item !== undefined
			);
		},
		enumerable: false,
	});
}
// Array.filterType => Array.filter 按回调函数过滤
if (notHas(Array.prototype, 'filterType')) {
	Object.defineProperty(Array.prototype, 'filterType', {
		value: function (cb: (item: any) => boolean) {
			return (this as any[]).filter((item) => cb(item));
		},
		enumerable: false,
	});
}
// Array.findLastBy => lodash findLast 返回符合传入要求的元素的下标
if (notHas(Array.prototype, 'findLastBy')) {
	Object.defineProperty(Array.prototype, 'findLastBy', {
		value: function (
			predicate: (item: any) => boolean,
			fromIndex?: number
		) {
			return _findLast(this, predicate, fromIndex);
		},
		enumerable: false,
	});
}
// Array.findLastIndexBy => lodash findLastIndex 寻找符合传入要求的最后一个元素的index
if (notHas(Array.prototype, 'findLastIndexBy')) {
	Object.defineProperty(Array.prototype, 'findLastIndexBy', {
		value: function (
			predicate: (item: any) => boolean,
			fromIndex?: number
		) {
			return _findLastIndex(this, predicate, fromIndex);
		},
		enumerable: false,
	});
}
// Array.firstBy => Array.includes(undefined) return error 返回第一个不为空的,为空则抛异常
if (notHas(Array.prototype, 'firstBy')) {
	Object.defineProperty(Array.prototype, 'firstBy', {
		value: function (
			predicate: (value: any, index: number, obj: any[]) => unknown,
			thisArg?: any
		) {
			const result = (this as any[]).find(predicate, thisArg);
			if (result !== undefined) return result;
			else throw new Error('result can not be undefined');
		},
		enumerable: false,
	});
}
// Array.groupBy => lodash groupBy 按某属性/条件分组
if (notHas(Array.prototype, 'groupBy')) {
	Object.defineProperty(Array.prototype, 'groupBy', {
		value: function (iteratee: _.ValueIteratee<any>) {
			return _groupBy(this, iteratee);
		},
		enumerable: false,
	});
}
// Array.groupByAndToPairs => 按回调函数返回值分组的数组
if (notHas(Array.prototype, 'groupByAndToPairs')) {
	Object.defineProperty(Array.prototype, 'groupByAndToPairs', {
		value: function (iteratee: (it: any) => number | string) {
			return Object.values(
				(this as any[]).reduce<{
					[k: string]: { key: number | string; value: any[] };
				}>((previousValue, currentValue) => {
					const key = iteratee(currentValue);
					if (!previousValue[key]) {
						previousValue[key] = {
							key: typeof key === 'number' ? key : String(key),
							value: [],
						};
					}
					previousValue[key].value.push(currentValue);
					return previousValue;
				}, {})
			).map((it) => [it.key, it.value]);
		},
		enumerable: false,
	});
}
// Array.head => Array[0]||undefined 获取数组的第一个值,数组长度为0时,返回undefined
if (notHas(Array.prototype, 'head')) {
	Object.defineProperty(Array.prototype, 'head', {
		value: function head() {
			return this && this.length ? this[0] : undefined;
		},
		enumerable: false,
	});
}
// Array.head => Array[Array.length-1]||undefined 获取数组的最后一个值,数组长度为0时,返回undefined
if (notHas(Array.prototype, 'last')) {
	Object.defineProperty(Array.prototype, 'last', {
		value: function () {
			return this && this.length ? this[this.length - 1] : undefined;
		},
		enumerable: false,
	});
}
// Array.includesAll => 判断数组包含的子集,用于判断一个数组是否包含另外一个数组中的所有项
if (notHas(Array.prototype, 'includesAll')) {
	Object.defineProperty(Array.prototype, 'includesAll', {
		value: function <T, U extends T>(
			array: U[],
			cb?: (item: U, it: T) => boolean
		) {
			return array.every((item, index, arr) =>
				(this as T[]).find((it) => (cb ? cb(item, it) : item === it))
			);
		},
		enumerable: false,
	});
}
// Array.isEmpty => Array==[] 判断数组是否为空
if (notHas(Array.prototype, 'isEmpty')) {
	Object.defineProperty(Array.prototype, 'isEmpty', {
		value: function () {
			return this.length === 0;
		},
		enumerable: false,
	});
}
// Array.mapNonNullable => Array.map.filter(item!==null&&item!== undefined) 遍历并过滤
if (notHas(Array.prototype, 'mapNonNullable')) {
	Object.defineProperty(Array.prototype, 'mapNonNullable', {
		value: function (iteratee: (value: any) => unknown) {
			return (this as any[])
				.map((it) => iteratee(it))
				.filter((temp) => temp !== null && temp !== undefined);
		},
		enumerable: false,
	});
}
// Array.maxBy => loadsh maxBy Array.filterMaxBy 按属性/函数排序返回最大的一项
if (notHas(Array.prototype, 'maxBy')) {
	Object.defineProperty(Array.prototype, 'maxBy', {
		value: function (iteratee: Function | string) {
			return _maxBy(this, iteratee);
		},
		enumerable: false,
	});
}
// Array.minBy = > loadsh minBy Array.filterMinBy 按属性/函数排序返回最小的一项
if (notHas(Array.prototype, 'minBy')) {
	Object.defineProperty(Array.prototype, 'minBy', {
		value: function (iteratee: Function | string) {
			return _minBy(this, iteratee);
		},
		enumerable: false,
	});
}
// Array.partition => loadsh partition 返回按元素分组后的数组
if (notHas(Array.prototype, 'partition')) {
	Object.defineProperty(Array.prototype, 'partition', {
		value: function (iteratee: (it: any) => boolean) {
			return _partition(this, iteratee);
		},
		enumerable: false,
	});
}
// Array.none => 回调函数返回值每一个都是false则返回true
if (notHas(Array.prototype, 'none')) {
	Object.defineProperty(Array.prototype, 'none', {
		value: function (predicate: (arr: any) => boolean) {
			return this.every((item: any) => {
				return !predicate(item);
			});
		},
		enumerable: false,
	});
}
// Array.sortedBy => loadsh sortBy 返回按条件排序后的数组
if (notHas(Array.prototype, 'sortedBy')) {
	Object.defineProperty(Array.prototype, 'sortedBy', {
		value: function (...iteratees: Array<_.Many<_.ListIteratee<any>>>) {
			return _sortBy(this, ...iteratees);
		},
		enumerable: false,
	});
}
// Array.strictGroupBy => 严格分组,string/number值相同不合并分组
if (notHas(Array.prototype, 'strictGroupBy')) {
	Object.defineProperty(Array.prototype, 'strictGroupBy', {
		value: function (iteratee: (it: any) => number | string) {
			return Object.values(
				(this as any[]).reduce<{
					[k: string]: { key: any; value: any[] };
				}>((previousValue, currentValue) => {
					const key = iteratee(currentValue);
					const typeKey = typeof key + '_' + key;
					if (!previousValue[typeKey]) {
						previousValue[typeKey] = {
							key,
							value: [],
						};
					}
					previousValue[typeKey].value.push(currentValue);
					return previousValue;
				}, {})
			).map((it) => [it.key, it.value]);
		},
		enumerable: false,
	});
}
// Array.sumBy => loadsh sumBy 按条件/属性求和
if (notHas(Array.prototype, 'sumBy')) {
    Object.defineProperty(Array.prototype, 'sumBy', {
        value: function (iteratee?: ((value: any) => number) | string) {
            return _sumBy(this, iteratee);
        },
        enumerable: false,
    });
}
// Array.take => loadsh take 返回前n项,不修改原始数组
if (notHas(Array.prototype, 'take')) {
    Object.defineProperty(Array.prototype, 'take', {
        value: function (n?: number) {
            return _take(this, n);
        },
        enumerable: false,
    });
}
// Array.takeRight => loadsh takeRight 返回后n项,不修改原始数组
if (notHas(Array.prototype, 'takeRight')) {
    Object.defineProperty(Array.prototype, 'takeRight', {
        value: function (n?: number) {
            return _takeRight(this, n);
        },
        enumerable: false,
    });
}
// Array.uniqBy => loadsh uniqBy 返回按条件去重后的新数组
if (notHas(Array.prototype, 'uniqBy')) {
    Object.defineProperty(Array.prototype, 'uniqBy', {
        value: function (iteratee: any[] | Function | Object | string) {
            return _uniqBy(this, iteratee);
        },
        enumerable: false,
    });
}