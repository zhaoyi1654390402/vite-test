import { notHas } from '../commonFuncs';
import _mapKeys from 'lodash/mapKeys';
import _mapValues from 'lodash/mapValues';

// Object.computeIfAbsent => 建立缓存对象,从对象上取key的值,如果key不存在,则运行回调函数cb,把cb的返回值复制给key,然后再返回key的值
// !!!会修改原始对象
if (notHas(Object.prototype, 'computeIfAbsent')) {
    Object.defineProperty(Object.prototype, 'computeIfAbsent', {
        value: function (key: string, cb: (k: string) => any) {
            if (!this.hasOwnProperty(key)) {
                this[key] = cb(key);
            }
            return this[key];
        },
        enumerable: false,
    });
}
// Object.isPromise => 是否为Promise 
if (notHas(Promise, 'isPromise')) {
    Object.defineProperty(Promise, 'isPromise', {
        value: function (obj: any) {
            return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
        },
        enumerable: false,
    });
}
// Object.mapKeys => 返回根据条件映射后的新对象
if (notHas(Object.prototype, 'mapKeys')) {
    Object.defineProperty(Object.prototype, 'mapKeys', {
        value: function (iteratee: Function) {
            return _mapKeys(this, iteratee);
        },
        enumerable: false,
    });
}
// Object.mapValues => 返回根据条件映射值后的新对象
if (notHas(Object.prototype, 'mapValues')) {
    Object.defineProperty(Object.prototype, 'mapValues', {
        value: function (iteratee: Function) {
            return _mapValues(this, iteratee);
        },
        enumerable: false,
    });
}
// Object.thru => 遍历对象,返回新的对象或值,类似数组的.map
if (notHas(Object.prototype, 'thru')) {
    Object.defineProperty(Object.prototype, 'thru', {
        value: function thru(interceptor: Function) {
            return interceptor(this);
        },
        enumerable: false,
    });
}
