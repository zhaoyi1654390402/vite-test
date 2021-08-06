
export function notHas(any: any, key: any) {
    return !(any ? any[key] : false);
}
