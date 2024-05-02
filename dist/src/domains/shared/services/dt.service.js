"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DtService = void 0;
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
let DtService = class DtService {
    //  private readonly jwtService: NestJwtService;
    //constructor() {}
    //YYYY-MM
    getDayStr(dateStr) {
        const result = new Date(dateStr).toISOString().split("T")[0];
        return result;
    }
    getTimeStr(timeStr) {
        const result = new Date(timeStr).toISOString().split("T")[1];
        return result;
    }
    //00:00, 00:00 사이시간 구하기
    getIntervalTime(startTime, endTime) {
        const startParts = startTime.split(":").map(Number);
        if (startParts.length !== 2) {
            console.log("Invalid start time format");
            return 0;
        }
        const [startHour, startMinute] = startParts;
        const endParts = endTime.split(":").map(Number);
        if (endParts.length !== 2) {
            console.log("Invalid end time format");
            return 0;
        }
        let [endHour, endMinute] = endParts;
        if (endHour == null ||
            endMinute == null ||
            startHour == null ||
            startMinute == null)
            return 0;
        if (endHour < startHour ||
            (endHour === startHour && endMinute < startMinute)) {
            // endTime이 startTime보다 이전 시간인 경우, endTime에 24시간을 더해줍니다.
            endHour += 24;
        }
        let totalHoursPerDay = endHour + endMinute / 60 - (startHour + startMinute / 60);
        //소수점 버림
        totalHoursPerDay = Math.floor(totalHoursPerDay);
        return Math.abs(totalHoursPerDay);
    }
    //현재 시간 구하기
    currentTime() {
        const date = new Date(+new Date() + 3240 * 10000)
            .toISOString()
            .replace("T", " ")
            .replace(/\..*/, "");
        return date;
    }
    currentTimeFour() {
        const currentDate = new Date(+new Date() + 3240 * 10000); // 현재 시간
        const currentHour = currentDate.getHours(); // 현재 시간의 시간 부분 (0-23)
        const modifiedDate = new Date(currentDate); // 현재 시간을 기준으로 새로운 Date 객체 생성
        modifiedDate.setHours(currentHour - 4); // 4시간 전의 00:00 시간 설정
        const modifiedTime = modifiedDate
            .toISOString()
            .replace("T", " ")
            .replace(/\..*/, "");
        return modifiedTime;
    }
    //현재 날짜 구하기 2023-01-01
    getToDay() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const toDay = year +
            "-" +
            ("00" + month.toString()).slice(-2) +
            "-" +
            ("00" + day.toString()).slice(-2);
        return toDay;
    }
    getYesterday() {
        let date = new Date();
        date.setDate(date.getDate() - 1);
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }
    getTodayPay(hourlyPay, startCheckTime, currentTime) {
        //hourlyPay: number, startCheckTime: Date, currentTime: string
        //startCheckTime시간을 확인하고 currentTime시간을 확인해서 사이시간에 급여를 곱해서 총 급여를 계산한다.
        //10000 2023-10-07T15:58:21.000Z 2023-10-08 02:05:20
        const startMoment = (0, moment_1.default)(startCheckTime).subtract(9, "hours");
        const currentMoment = (0, moment_1.default)(currentTime);
        // Calculate the difference in hours between the two times
        const hoursWorked = currentMoment.diff(startMoment, "hours");
        // Calculate total pay
        const todayPay = hoursWorked * hourlyPay;
        if (todayPay < 0) {
            return Math.abs(todayPay);
        }
        return todayPay;
    }
    //한달에 마지막 일자 구하기, 월급 계산 식에 사용
    getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }
    //월급계산식
    getTotalPayMonth(pay, startDay, paybackDay) {
        const today = new Date();
        // 만약 paybackDay가 주어지지 않았다면 한 달 후의 날짜로 설정
        if (!paybackDay) {
            paybackDay = this.getDaysInMonth(startDay.getFullYear(), startDay.getMonth());
        }
        let workDays;
        if (today.getDate() >= paybackDay) {
            workDays = today.getDate() - startDay.getDate();
        }
        else {
            const daysInLastMonth = this.getDaysInMonth(today.getFullYear(), today.getMonth() - 1);
            workDays = today.getDate() + (daysInLastMonth - startDay.getDate());
        }
        // 하루치 급여 계산
        const daysInCurrentMonth = this.getDaysInMonth(today.getFullYear(), today.getMonth());
        const dailyPay = pay / daysInCurrentMonth;
        return dailyPay * workDays;
    }
    //휴게시간, 월급, 시급인지 계산이 필요함
    //급여일 기준으로 계산해야함
    getTotalPay(hourlyPay, startDay, workDays, startTime, endTime, breakTime, paybackDay) {
        //시간당 급여를 확인하고 startDay로 근무시작일을 확인하고 workDay로 오늘 날짜까지 근무 일수를 확인한다.
        //startTime, endTime 사이에 시간을 확인해서 사이시간에 급여를 곱해서 총 급여를 계산한다.
        //10000 2023-07-06T00:00:00.000Z [ '1', '2', '3', '4' ] 01:00 03:00
        //breakTime 휴게시간 이있으면 계산시 휴게시간을 뺀다
        if (!paybackDay)
            paybackDay = 5;
        const startParts = startTime.split(":").map(Number);
        if (startParts.length !== 2) {
            console.log("Invalid start time format");
            return 0;
        }
        const [startHour, startMinute] = startParts;
        const endParts = endTime.split(":").map(Number);
        if (endParts.length !== 2) {
            console.log("Invalid end time format");
            return 0;
        }
        const [endHour, endMinute] = endParts;
        if (endHour == null ||
            endMinute == null ||
            startHour == null ||
            startMinute == null)
            return 0;
        let totalHoursPerDay = endHour + endMinute / 60 - (startHour + startMinute / 60);
        if (totalHoursPerDay < 0) {
            totalHoursPerDay += 24; // Adjust if the work period extends to the next day
        }
        // Calculate number of work days from start day to today
        const startDateMoment = (0, moment_1.default)(startDay);
        const todayMoment = (0, moment_1.default)();
        let totalWorkDays = 0;
        while (startDateMoment.isSameOrBefore(todayMoment)) {
            const refine = workDays.map(Number);
            if (refine.includes(parseInt(startDateMoment.format("E")))) {
                totalWorkDays++;
            }
            startDateMoment.add(1, "days");
        }
        // Calculate total pay
        let totalPay = totalWorkDays * totalHoursPerDay * hourlyPay;
        //휴게시간 계산해서 빼기
        let refineBreakTime = 0;
        if (breakTime == "00-30") {
            refineBreakTime = 0.5;
            totalPay = totalPay - totalWorkDays * refineBreakTime;
        }
        if (breakTime == "01-00") {
            refineBreakTime = 1;
            //refineBreakTime * totalWorkDays * hourlyPay;
            totalPay = totalPay - totalWorkDays * (hourlyPay * refineBreakTime);
        }
        if (breakTime == "01-30") {
            refineBreakTime = 1.5;
            totalPay = totalPay - totalWorkDays * refineBreakTime;
        }
        if (totalPay < 0) {
            return Math.abs(totalPay);
        }
        return Math.floor(totalPay);
    }
    //출근체크 시 근무시간 30분 전후에 출근체크 가능
    getWorkStartTime(startTime, endTime, currentTime) {
        // Convert your times to moment objects
        //20:00 03:00 2023-10-08 00:40:28
        const startMoment = (0, moment_1.default)(startTime, "HH:mm");
        const endMoment = (0, moment_1.default)(endTime, "HH:mm");
        const currentMoment = (0, moment_1.default)(currentTime);
        // Adjust the start and end moments based on the current date
        startMoment
            .year(currentMoment.year())
            .month(currentMoment.month())
            .date(currentMoment.date());
        endMoment
            .year(currentMoment.year())
            .month(currentMoment.month())
            .date(currentMoment.date());
        // If the end time is before the start time, assume it's for the next day
        if (endMoment.isBefore(startMoment)) {
            endMoment.add(1, "days");
        }
        // Create moments for 30 minutes before and after the start time
        const beforeStart = startMoment.clone().subtract(30, "minutes");
        const afterStart = startMoment.clone().add(30, "minutes");
        // Check if current time is within 30 minutes of the start time
        if (currentMoment.isBetween(beforeStart, afterStart)) {
            return "OK";
        }
        else {
            return "NO";
        }
    }
    getFirstDayOfWeek(year, month, week) {
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const firstDay = new Date(firstDayOfMonth);
        firstDay.setDate(firstDay.getDate() + (week - 1) * 7);
        while (firstDay.getDay() !== 1) {
            firstDay.setDate(firstDay.getDate() - 1);
        }
        return firstDay;
    }
    getLastDayOfWeek(year, month, week) {
        const firstDay = this.getFirstDayOfWeek(year, month, week);
        const lastDay = new Date(firstDay);
        lastDay.setDate(lastDay.getDate() + 6);
        return lastDay;
    }
    formatMonth(date) {
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${month}-${day}`;
    }
    getWeekDates(year, month, numWeeks) {
        const weeks = [];
        for (let week = 1; week <= numWeeks; week++) {
            const firstDay = this.getFirstDayOfWeek(year, month, week);
            const lastDay = this.getLastDayOfWeek(year, month, week);
            const formattedFirstDay = this.formatMonth(firstDay);
            const formattedLastDay = this.formatMonth(lastDay);
            weeks.push({
                week: week,
                start: formattedFirstDay,
                end: formattedLastDay,
                totalHours: 0,
            });
        }
        return weeks;
    }
};
DtService = __decorate([
    (0, common_1.Injectable)()
], DtService);
exports.DtService = DtService;
//# sourceMappingURL=dt.service.js.map