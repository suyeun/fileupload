"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTime = void 0;
class CTime {
    static getUTC() {
        return new Date();
    }
    static getServerTime(zone = CTime.Zone.Code.UTC) {
        return this.getUTC().getTime() + CTime.Zone.Offset.get(zone);
    }
    static getServerDate(zone = CTime.Zone.Code.UTC) {
        return new Date(this.getUTC().getTime() + CTime.Zone.Offset.get(zone));
    }
    static getPassedMondayDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        return date.getTime() - (date.getTime() % CTime.Milliseconds.Week) + CTime.Zone.Offset.get(zone);
    }
    static getPassedMidnightDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        return date.getTime() - (date.getTime() % CTime.Milliseconds.Day) + CTime.Zone.Offset.get(zone);
    }
    static getApproachMidnightDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        return (date.getTime() - (date.getTime() % CTime.Milliseconds.Day) + CTime.Milliseconds.Day + CTime.Zone.Offset.get(zone));
    }
    static getPassedMondayMidnightDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        const monday = new Date(date.setDate(diff));
        return this.getPassedMidnightDate(zone, monday);
    }
    static getApproachMondayMidnightDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
        const monday = new Date(date.setDate(diff));
        return this.getPassedMidnightDate(zone, monday) + this.Milliseconds.Week;
    }
    static getToday(zone = CTime.Zone.Code.UTC) {
        const today = this.getServerDate(zone).getDay();
        return CTime.Day.get(today);
    }
    static getPassedWeekDate(zone = CTime.Zone.Code.UTC, date = this.getServerDate(zone)) {
        return date.getTime() - CTime.Milliseconds.Week + CTime.Zone.Offset.get(zone);
    }
}
CTime.Seconds = (_a = class {
    },
    __setFunctionName(_a, "Seconds"),
    _a.Min = 60,
    _a.Hour = 60 * 60,
    _a.Day = 60 * 60 * 24,
    _a);
CTime.Milliseconds = (_b = class {
    },
    __setFunctionName(_b, "Milliseconds"),
    _b.Tick = 100,
    _b.Sec = 1000,
    _b.Min = 60 * 1000,
    _b.Hour = 60 * 60 * 1000,
    _b.Day = 60 * 60 * 24 * 1000,
    _b.Week = 60 * 60 * 24 * 7 * 1000,
    _b);
CTime.Zone = (_c = class {
    },
    __setFunctionName(_c, "Zone"),
    _c.Code = (_d = class {
            static Array() {
                return [
                    this.UTC,
                    this.KR,
                    this.JP,
                    this.CN,
                    this.ID,
                    this.TH,
                    this.VN,
                    this.RU,
                    this.ES,
                    this.FR,
                    this.DE,
                    this.PT,
                    this.NL,
                    this.IT,
                    this.US,
                ];
            }
        },
        __setFunctionName(_d, "Code"),
        _d.UTC = 0,
        _d.KR = 1 // 대한민국
    ,
        _d.JP = 2 // 일본
    ,
        _d.CN = 3 // 중국
    ,
        _d.ID = 4 // 인도네시아 (서부)
    ,
        _d.TH = 5 // 태국
    ,
        _d.VN = 6 // 베트남
    ,
        _d.RU = 7 // 러시아
    ,
        _d.ES = 8 // 스페인
    ,
        _d.FR = 9 // 프랑스
    ,
        _d.DE = 10 // 독일
    ,
        _d.PT = 11 // 포르투칼
    ,
        _d.NL = 12 // 네덜란드
    ,
        _d.IT = 13 // 이탈리아
    ,
        _d.US = 14 // 미국 (동부)
    ,
        _d.Names = [
            'UTC',
            'KR',
            'JP',
            'CN',
            'ID',
            'TH',
            'VN',
            'RU',
            'ES',
            'FR',
            'DE',
            'PT',
            'NL',
            'IT',
            'US',
        ],
        _d),
    _c.Offset = (_e = class {
            static get(zone) {
                switch (zone) {
                    case CTime.Zone.Code.UTC: {
                        return CTime.Zone.Offset.UTC;
                    }
                    case CTime.Zone.Code.KR: {
                        return CTime.Zone.Offset.KR;
                    }
                    case CTime.Zone.Code.JP: {
                        return CTime.Zone.Offset.JP;
                    }
                    case CTime.Zone.Code.CN: {
                        return CTime.Zone.Offset.CN;
                    }
                    case CTime.Zone.Code.ID: {
                        return CTime.Zone.Offset.ID;
                    }
                    case CTime.Zone.Code.TH: {
                        return CTime.Zone.Offset.TH;
                    }
                    case CTime.Zone.Code.VN: {
                        return CTime.Zone.Offset.VN;
                    }
                    case CTime.Zone.Code.RU: {
                        return CTime.Zone.Offset.RU;
                    }
                    case CTime.Zone.Code.ES: {
                        return CTime.Zone.Offset.ES;
                    }
                    case CTime.Zone.Code.FR: {
                        return CTime.Zone.Offset.FR;
                    }
                    case CTime.Zone.Code.DE: {
                        return CTime.Zone.Offset.DE;
                    }
                    case CTime.Zone.Code.PT: {
                        return CTime.Zone.Offset.PT;
                    }
                    case CTime.Zone.Code.NL: {
                        return CTime.Zone.Offset.NL;
                    }
                    case CTime.Zone.Code.IT: {
                        return CTime.Zone.Offset.IT;
                    }
                    case CTime.Zone.Code.US: {
                        return CTime.Zone.Offset.US;
                    }
                }
                return CTime.Zone.Offset.UTC;
            }
        },
        __setFunctionName(_e, "Offset"),
        _e.UTC = 0,
        _e.KR = CTime.Milliseconds.Hour * 9,
        _e.JP = CTime.Milliseconds.Hour * 9,
        _e.CN = CTime.Milliseconds.Hour * 8,
        _e.ID = CTime.Milliseconds.Hour * 7,
        _e.TH = CTime.Milliseconds.Hour * 7,
        _e.VN = CTime.Milliseconds.Hour * 7,
        _e.RU = CTime.Milliseconds.Hour * 3,
        _e.ES = CTime.Milliseconds.Hour,
        _e.FR = CTime.Milliseconds.Hour,
        _e.DE = CTime.Milliseconds.Hour,
        _e.PT = CTime.Milliseconds.Hour,
        _e.NL = CTime.Milliseconds.Hour,
        _e.IT = CTime.Milliseconds.Hour,
        _e.US = CTime.Milliseconds.Hour * -5,
        _e),
    _c);
CTime.Util = class {
    static convertPassedMidnightDate(date, zone = CTime.Zone.Code.UTC) {
        return date - (date % CTime.Milliseconds.Day) + CTime.Zone.Offset.get(zone);
    }
    static convertApproachMidnightDate(date, zone = CTime.Zone.Code.UTC) {
        return date - (date % CTime.Milliseconds.Day) + CTime.Milliseconds.Day + CTime.Zone.Offset.get(zone);
    }
};
CTime.Day = (_f = class {
        static get(day) {
            switch (day) {
                case CTime.Day.Server.Mon: {
                    return CTime.Day.Data.Mon;
                }
                case CTime.Day.Server.Tue: {
                    return CTime.Day.Data.Tue;
                }
                case CTime.Day.Server.Wed: {
                    return CTime.Day.Data.Wed;
                }
                case CTime.Day.Server.Thr: {
                    return CTime.Day.Data.Thr;
                }
                case CTime.Day.Server.Fri: {
                    return CTime.Day.Data.Fri;
                }
                case CTime.Day.Server.Sat: {
                    return CTime.Day.Data.Sat;
                }
                case CTime.Day.Server.Sun: {
                    return CTime.Day.Data.Sun;
                }
                default: {
                    return -1;
                }
            }
        }
    },
    __setFunctionName(_f, "Day"),
    _f.Server = (_g = class {
        },
        __setFunctionName(_g, "Server"),
        _g.Mon = 1,
        _g.Tue = 2,
        _g.Wed = 3,
        _g.Thr = 4,
        _g.Fri = 5,
        _g.Sat = 6,
        _g.Sun = 7,
        _g),
    _f.Data = (_h = class {
        },
        __setFunctionName(_h, "Data"),
        _h.Mon = 1,
        _h.Tue = 2,
        _h.Wed = 3,
        _h.Thr = 4,
        _h.Fri = 5,
        _h.Sat = 6,
        _h.Sun = 7,
        _h),
    _f);
exports.CTime = CTime;
//# sourceMappingURL=CTime.js.map