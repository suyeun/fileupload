export const ERROR_CODE = {
  OK: 200,
  SERVER_MAINTENANCE: 1000,
  QUERY_EXEC_ERROR: 20000,
  INVALID_INPUT: 20001, //입력값이 잘못됐을 때
  USER_NOT_FOUND_ERROR: 20002, //로그인할때 사용자 없을 때
  PAYLOAD_NOT_FOUND: 20003, //인증 페이로드가 없을 때
  TOKEN_EXPIRED_ERROR: 20004, //토큰 만료
  INVALID_TOKEN_ERROR: 20005, //토큰 인증 에러

  DUPLICATE_WORK: 30000, // 등록된 근무지
  WORK_NOT_REGISTERED: 30001, // 등록되지 않은 근무지

  CHECK_TIME_NEED: 40001, //메인화면 출퇴근 시간 아닐 때 에러
  NEED_CHECK_CALCULATION: 40002, //계산 식 확인

  POINT_CHECK_NEED: 50000, //포인트 조회 필요
  ALREADY_PAID: 50001, //포인트 이미 지급됨
};
