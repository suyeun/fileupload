import { Injectable } from "@nestjs/common";
import moment from "moment";
import { createSecureContext } from "tls";
import { DtService } from "./dt.service";

@Injectable()
export class SalaryService {
  constructor(private readonly dtService: DtService) {}
  //20240116 일당 계산기 main, calender 에 사용됨
  //hourlyPay: 시급, startCheckTime: 00:00 , currentTime: 00:00
  //시급인 경우

  //15분 단위로 계산했을 경우
  calculateMinutes(minutes: number): number {
    if (minutes > 57) {
      return 1;
    }
    if (minutes <= 7.5) {
      return 0;
    } else if (minutes <= 22.5) {
      return 15;
    } else if (minutes <= 37.5) {
      return 30;
    } else {
      return 45;
    }
  }

  getTodayPay(
    hourlyPay: number,
    startCheckTime: string,
    endCheckTime: string
  ): number {
    //main에서 검색할때는 실시간이라 endCheckTime이 없다, 현재 시간을 넣어준다
    if (!endCheckTime) {
      const currentTime = this.dtService.currentTime();
      let checkTime = new Date(currentTime)
        .toLocaleTimeString("en-US", { timeZone: "Asia/Seoul", hour12: false })
        .slice(0, 5);
      endCheckTime = checkTime;
    }
    // startCheckTime과 endCheckTime의 시간 차이 계산
    const [startHour = 0, startMinute = 0] = startCheckTime
      .split(":")
      .map(Number);
    const [endHour = 0, endMinute = 0] = endCheckTime.split(":").map(Number);

    let hourDifference = endHour - startHour;
    let minuteDifference = endMinute - startMinute;

    if (minuteDifference < 0) {
      minuteDifference += 60;
      hourDifference--;
    }

    if (hourDifference < 0) {
      hourDifference += 24;
    }

    //8시간 이상이면 1시간을 빼준다
    //4.5시간부터 30분을 빼준다
    if (hourDifference >= 5 && minuteDifference == 0 && hourDifference < 9) {
      hourDifference = hourDifference - 1;
      minuteDifference = 30;
    } else if (hourDifference >= 8) {
      hourDifference = hourDifference - 1;
    } else if (hourDifference >= 4 && minuteDifference >= 30) {
      minuteDifference = minuteDifference - 30;
    }

    if (minuteDifference < 0) {
      hourDifference -= 1;
      minuteDifference += 60;
    }

    let minute = this.calculateMinutes(minuteDifference);
    let totalPay = 0;
    if (minute == 0) {
      totalPay = hourDifference * hourlyPay;
    } else if (minute == 1) {
      hourDifference = hourDifference + 1;
      totalPay = hourDifference * hourlyPay;
    } else {
      const quarter = minute / 15;
      totalPay = hourDifference * hourlyPay + quarter * (hourlyPay / 4);
    }

    return totalPay;
  }

  //휴게시간, 월급, 시급인지 계산이 필요함
  //급여일 기준으로 계산해야함
  getTotalPay(
    hourlyPay: number,
    startDay: Date,
    workDays: number[],
    startTime: string,
    endTime: string,
    breakTime?: string,
    paybackDay?: number
  ): number {
    //시간당 급여를 확인하고 startDay로 근무시작일을 확인하고 workDay로 오늘 날짜까지 근무 일수를 확인한다.
    //startTime, endTime 사이에 시간을 확인해서 사이시간에 급여를 곱해서 총 급여를 계산한다.
    //10000 2023-07-06T00:00:00.000Z [ '1', '2', '3', '4' ] 01:00 03:00
    //breakTime 휴게시간 이있으면 계산시 휴게시간을 뺀다
    if (!paybackDay) paybackDay = 5;
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
    if (
      endHour == null ||
      endMinute == null ||
      startHour == null ||
      startMinute == null
    )
      return 0;

    let totalHoursPerDay =
      endHour + endMinute / 60 - (startHour + startMinute / 60);

    if (totalHoursPerDay < 0) {
      totalHoursPerDay += 24; // Adjust if the work period extends to the next day
    }

    // Calculate number of work days from start day to today
    const startDateMoment = moment(startDay);
    const todayMoment = moment();
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

  WeeklyAllowance(pay: number, weekTotalHours: number[]) {
    const weekHours = weekTotalHours.reduce(
      (total: number, hours: number) => total + hours,
      0
    );
    const res =
      weekHours >= 40
        ? weekTotalHours.map((hours: number) => hours * pay)
        : weekTotalHours.map((hours: number) => (hours / 40) * 8 * pay);
    return res;
  }
}
