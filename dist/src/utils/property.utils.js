"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dict = exports.toPairObject = void 0;
function toPairObject(key, value) {
    const result = {};
    result[key] = value;
    return result;
}
exports.toPairObject = toPairObject;
class Dict {
    constructor() {
        this.dict = {};
    }
    set(key, value) {
        this.dict[key] = value;
        return this;
    }
    has(key) {
        return key in this.dict;
    }
    toJson() {
        try {
            return JSON.stringify(this.dict);
        }
        catch (error) {
            console.error(error);
            return '{}';
        }
    }
    get result() {
        return this.dict;
    }
}
exports.Dict = Dict;
//# sourceMappingURL=property.utils.js.map