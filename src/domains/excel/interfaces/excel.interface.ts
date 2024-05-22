export interface ExcelData {
  id: number;
  name: string;
  email: string;
  channelId: string;
  platform: string;
  role: string;
  provider: string;
  accessToken: string;
  phone: string;
  birthday: string;
  isCertification: boolean;
  isTerms: boolean;
  isPrivacy: boolean;
  isWork: boolean;
  isPush: boolean;
  pushToken: string;
}
//정산내역
export interface DataEntry {
  month: string; //정산월
  companyCnt: number; //업체수
  userCnt: number; //인원수
  amount: string; //청구금액
  charge: string; //수수료
  deposit: Date; //입금일자
  settlement: string; //정산 수수료 금액
  amountDay: Date; //정산 수수료 정산일자
}

export interface ExcelDispatch {
  month: string; //정산월
  name: string; //거래처명
  personnelCount: number; //인원수
  amount: string; //청구금액
  commission: string; //수수료
  commissionPaymentStandard: string; //수수료 지급기준
  claimPeriod: string; //청구기간
  depositDate: Date; //입금일자
  issueDate: Date; //세금계산서 발행일
  settlementCommission: string; //정산 수수료
  settlementDate: Date; //정산일자
}

//파견
//정산월, 거래처명, 인원수, 청구금액, 수수료, 수수료 지급기준, 청구기간, 입금일자, 세금계산서 발행일, 정산 수수료, 정산일자

//채용대행
//정산월, 거래처명, 인원수, 청구금액, 수수료, 수수료 지급기준, 청구기간, 입금일자, 세금계산서 발행일, 정산 수수료, 정산일자
