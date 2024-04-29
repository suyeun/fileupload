export const NETWORK_ERROR_CODE = {
  SUCCESS: 200, // 성공
  FAIL: 400, // 잘못된 요청
  UNAUTHORIZED: 401, // 권한이 없음
  FORBIDDEN: 403, // 서버가 요청 거부
  NOTFOUND: 404, // 찾을 수 없음
  INTERNAL_SERVER_ERROR: 500, // 서버 내부 오류
  NOT_IMPLEMENT: 501, // 구현되지 않음
  SQL_EXCEPTION: 600, // SQL 오류
  SERVER_MAINTENANCE: 1000, // 서버 점검

  NOT_FOUND_USER: 2000,
  INVALID_PASSWORD_ERROR: 2001,

  EXISTING_USER: 2003,
  EXPIRE_DATE: 3000,
  NOT_CONNECT_SERVER: 9999,

  INVALID_REQUEST_PARAMETER: 10000,
  CONTENTS_NOTFOUND: 10001, // 요청한 컨텐츠를 찾을 수 없음
  DB_INSERT_EXCEPTION: 10002, // 데이터베이스 인서트 에러
  CONTENTS_DUPLICATED: 10003,
  ROOM_USER_MAX_OVER: 10004,
  DB_UPDATE_EXCEPTION: 10005,
  AWS_CDN_INVALIDATION_EXCEPTION: 10006,
};
