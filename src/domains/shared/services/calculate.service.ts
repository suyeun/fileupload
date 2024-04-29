import { Injectable } from "@nestjs/common";
import moment from "moment";

@Injectable()
export class CalculateService {
  //  private readonly jwtService: NestJwtService;

  //주휴수당 계산
  async getCalculatePay(hours: any, rate: any) {
    const pay = (hours / 40) * 8 * rate;
    return pay;
  }
  //월-일 값 입력하고 한달전 구하기
  getDayStr(dateStr: string): string | undefined {
    const date = new Date(dateStr);
    // 날짜를 한 달 전으로 설정
    date.setMonth(date.getMonth() - 1);
    // 한 달 전의 날짜를 YYYY-MM-DD 형식의 문자열로 변환
    const oneMonthAgo = date.toISOString().slice(0, 10);
    return oneMonthAgo;
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
}
