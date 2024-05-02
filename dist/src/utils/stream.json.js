"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToJson = exports.objectToJson = exports.toJsonPrint = void 0;
const stream_1 = require("stream");
const toJsonPrint = (jsonData, pretty = true) => {
    const readableStream = new stream_1.Readable();
    if (pretty)
        readableStream.push(JSON.stringify(jsonData, null, 2));
    else
        readableStream.push(JSON.stringify(jsonData));
    readableStream.push(null);
    readableStream.pipe(process.stdout);
    readableStream.push('');
};
exports.toJsonPrint = toJsonPrint;
function objectToJson(jsonObject) {
    return JSON.stringify(jsonObject);
}
exports.objectToJson = objectToJson;
const stringToJson = (jsonString) => {
    return JSON.parse(jsonString);
};
exports.stringToJson = stringToJson;
//# sourceMappingURL=stream.json.js.map