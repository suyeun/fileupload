export class CTime {
  public static Seconds = class {
    public static readonly Min: number = 60;
    public static readonly Hour: number = 60 * 60;
    public static readonly Day: number = 60 * 60 * 24;
  };

  public static Milliseconds = class {
    public static readonly Tick: number = 100;
    public static readonly Sec: number = 1000;
    public static readonly Min: number = 60 * 1000;
    public static readonly Hour: number = 60 * 60 * 1000;
    public static readonly Day: number = 60 * 60 * 24 * 1000;
    public static readonly Week: number = 60 * 60 * 24 * 7 * 1000;
  };

  public static Zone = class {
    public static Code = class {
      public static readonly UTC: number = 0;
      public static readonly KR: number = 1; // 대한민국
      public static readonly JP: number = 2; // 일본
      public static readonly CN: number = 3; // 중국
      public static readonly ID: number = 4; // 인도네시아 (서부)
      public static readonly TH: number = 5; // 태국
      public static readonly VN: number = 6; // 베트남
      public static readonly RU: number = 7; // 러시아
      public static readonly ES: number = 8; // 스페인
      public static readonly FR: number = 9; // 프랑스
      public static readonly DE: number = 10; // 독일
      public static readonly PT: number = 11; // 포르투칼
      public static readonly NL: number = 12; // 네덜란드
      public static readonly IT: number = 13; // 이탈리아
      public static readonly US: number = 14; // 미국 (동부)

      public static readonly Names: string[] = [
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
      ];

      public static Array(): number[] {
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
    };

    public static Offset = class {
      public static readonly UTC: number = 0;
      public static readonly KR: number = CTime.Milliseconds.Hour * 9;
      public static readonly JP: number = CTime.Milliseconds.Hour * 9;
      public static readonly CN: number = CTime.Milliseconds.Hour * 8;
      public static readonly ID: number = CTime.Milliseconds.Hour * 7;
      public static readonly TH: number = CTime.Milliseconds.Hour * 7;
      public static readonly VN: number = CTime.Milliseconds.Hour * 7;
      public static readonly RU: number = CTime.Milliseconds.Hour * 3;
      public static readonly ES: number = CTime.Milliseconds.Hour;
      public static readonly FR: number = CTime.Milliseconds.Hour;
      public static readonly DE: number = CTime.Milliseconds.Hour;
      public static readonly PT: number = CTime.Milliseconds.Hour;
      public static readonly NL: number = CTime.Milliseconds.Hour;
      public static readonly IT: number = CTime.Milliseconds.Hour;
      public static readonly US: number = CTime.Milliseconds.Hour * -5;

      public static get(zone: number): number {
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
    };
  };

  public static Util = class {
    public static convertPassedMidnightDate(date: number, zone: number = CTime.Zone.Code.UTC): number {
      return date - (date % CTime.Milliseconds.Day) + CTime.Zone.Offset.get(zone);
    }

    public static convertApproachMidnightDate(date: number, zone: number = CTime.Zone.Code.UTC): number {
      return date - (date % CTime.Milliseconds.Day) + CTime.Milliseconds.Day + CTime.Zone.Offset.get(zone);
    }
  };

  public static Day = class {
    public static Server = class {
      public static readonly Mon: number = 1;
      public static readonly Tue: number = 2;
      public static readonly Wed: number = 3;
      public static readonly Thr: number = 4;
      public static readonly Fri: number = 5;
      public static readonly Sat: number = 6;
      public static readonly Sun: number = 7;
    };

    public static Data = class {
      public static readonly Mon: number = 1;
      public static readonly Tue: number = 2;
      public static readonly Wed: number = 3;
      public static readonly Thr: number = 4;
      public static readonly Fri: number = 5;
      public static readonly Sat: number = 6;
      public static readonly Sun: number = 7;
    };

    public static get(day: number) {
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
  };

  protected static getUTC(): Date {
    return new Date();
  }

  public static getServerTime(zone: number = CTime.Zone.Code.UTC): number {
    return this.getUTC().getTime() + CTime.Zone.Offset.get(zone);
  }

  public static getServerDate(zone: number = CTime.Zone.Code.UTC): Date {
    return new Date(this.getUTC().getTime() + CTime.Zone.Offset.get(zone));
  }

  public static getPassedMondayDate(zone: number = CTime.Zone.Code.UTC, date: Date = this.getServerDate(zone)): number {
    return date.getTime() - (date.getTime() % CTime.Milliseconds.Week) + CTime.Zone.Offset.get(zone);
  }

  public static getPassedMidnightDate(
    zone: number = CTime.Zone.Code.UTC,
    date: Date = this.getServerDate(zone),
  ): number {
    return date.getTime() - (date.getTime() % CTime.Milliseconds.Day) + CTime.Zone.Offset.get(zone);
  }

  public static getApproachMidnightDate(
    zone: number = CTime.Zone.Code.UTC,
    date: Date = this.getServerDate(zone),
  ): number {
    return (
      date.getTime() - (date.getTime() % CTime.Milliseconds.Day) + CTime.Milliseconds.Day + CTime.Zone.Offset.get(zone)
    );
  }

  public static getPassedMondayMidnightDate(
    zone: number = CTime.Zone.Code.UTC,
    date: Date = this.getServerDate(zone),
  ): number {
    const diff: number = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const monday: Date = new Date(date.setDate(diff));
    return this.getPassedMidnightDate(zone, monday);
  }

  public static getApproachMondayMidnightDate(
    zone: number = CTime.Zone.Code.UTC,
    date: Date = this.getServerDate(zone),
  ): number {
    const diff: number = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const monday: Date = new Date(date.setDate(diff));
    return this.getPassedMidnightDate(zone, monday) + this.Milliseconds.Week;
  }

  public static getToday(zone: number = CTime.Zone.Code.UTC): number {
    const today: number = this.getServerDate(zone).getDay();

    return CTime.Day.get(today);
  }

  public static getPassedWeekDate(zone: number = CTime.Zone.Code.UTC, date: Date = this.getServerDate(zone)): number {
    return date.getTime() - CTime.Milliseconds.Week + CTime.Zone.Offset.get(zone);
  }
}
