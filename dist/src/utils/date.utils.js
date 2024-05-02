"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localDatetime = exports.datetime = exports.timestamp = void 0;
const timestamp = () => Math.floor(new Date().getTime() / 1000);
exports.timestamp = timestamp;
const dateFormatter = new Intl.DateTimeFormat('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 24시간 형식
});
const datetime = () => dateFormatter.format(new Date());
exports.datetime = datetime;
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
const localDatetime = () => {
    return formatDate(new Date());
};
exports.localDatetime = localDatetime;
//# sourceMappingURL=date.utils.js.map