create table TB_USER
(
    ACCOUNT_ID      int auto_increment comment '사용자 고유 아이디' primary key,
    DEVICE_ID       varchar(255)                             not null comment '사용자 디바이스 아이디',
    PROVIDER        varchar(255)                             not null comment '제공자',
    EMAIL           varchar(255)                             null comment '사용자 이메일 주소',
    PASSWORD        varchar(255)                             null comment '사용자 비밀번호',
    CHANNEL_ID      varchar(255)                             null comment 'CHANNEL ID',
    PLATFORM        varchar(255)                             null comment 'AOS, IOS, WINDOWS, LINUX...',
    NICK_NAME       varchar(255)                             null comment '사용자 닉네임',
    USER_NAME       varchar(255)                             not null comment '사용자 이름',
    PUSH_ALLOW      varchar(255)                             not null comment '푸시 허용 동의 여부',
    PUSH_ALLOW_AT   bigint                                   null comment '푸시 허용 일시',
    PUSH_TOKEN      varchar(255)                             null comment '유저 디바이스 푸시 토큰',
    PUSH_TOKEN_AT   bigint                                   null comment 'push_token_dt',
    PUSH_TYPE       varchar(255)                             null comment 'PUSH TYPE',
    POLICY_ALLOW    tinyint                                  null comment '개인정보 사용 동의 여부',
    POLICY_ALLOW_AT bigint                                   null comment '개인정보 이용 정책 동의 일시',
    LAST_LOGIN      bigint                                   null comment 'LAST LOGIN',
    LAST_LOGOUT     bigint                                   null comment 'last logout',
    PROFILE_IMG     varchar(255)                             null comment '사용자 아바타 이미지 뎡로',
    ROLE            varchar(255)                             null comment '사용자 역할(등급)',
    PHONE_NUM       varchar(255)                             null comment '전화번호',
    COMPLETE_AT     datetime                                 null comment '등록 완료 여부',
    IS_DELETE       tinyint     default 0                    not null comment '삭제(비활성) 여부 0:유지, 1:삭제',
    UPDATE_AT       datetime(6) default current_timestamp(6) not null on update current_timestamp(6) comment '수정 일시',
    CREATE_AT       datetime(6) default current_timestamp(6) null comment '등록 일시'
);

-- TODO : USER, DATA, PUSH 분산 관리 할 것 (작업 예정)
# 효과적인 데이터베이스 모델링을 위해서는 테이블을 분산하거나 분할하는 것이 중요합니다. 이를 위해서는 데이터베이스의
# 크기, 액세스 패턴, 성능 요구 사항 등을 고려해야 합니다. 주어진 TB_USER 테이블의 구조를 분석하고 효과적인 모델링
# 방법을 제안하겠습니다.

# User 정보 분리: 사용자 정보는 주로 자주 액세스되는 데이터입니다. 따라서 사용자 정보를 별도의 테이블로 분리하여
# 성능을 향상시킬 수 있습니다. 아래와 같이 TB_USER_INFO 테이블을 생성하여 사용자 정보를 저장할 수 있습니다.

CREATE TABLE TB_USER_INFO
(
    ACCOUNT_ID  INT AUTO_INCREMENT COMMENT '사용자 고유 아이디' PRIMARY KEY,
    EMAIL       VARCHAR(255) NULL COMMENT '사용자 이메일 주소',
    NICK_NAME   VARCHAR(255) NULL COMMENT '사용자 닉네임',
    USER_NAME   VARCHAR(255) NOT NULL COMMENT '사용자 이름',
    PHONE_NUM   VARCHAR(255) NULL COMMENT '전화번호',
    PROFILE_IMG VARCHAR(255) NULL COMMENT '사용자 아바타 이미지 URL',
    CREATE_AT   DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) NULL COMMENT '등록 일시'
    -- 다른 필드 추가
);
# User 인증 정보 분리: 사용자 인증 정보는 보안적인 이유로 분리해야 합니다. 이를 위해 TB_USER_AUTH 테이블을 생성할 수 있습니다.

CREATE TABLE TB_USER_AUTH
(
    ACCOUNT_ID  INT PRIMARY KEY,
    PASSWORD    VARCHAR(255) NULL COMMENT '사용자 비밀번호',
    PUSH_TOKEN  VARCHAR(255) NULL COMMENT '유저 디바이스 푸시 토큰',
    PUSH_TYPE   VARCHAR(255) NULL COMMENT 'PUSH TYPE',
    -- 다른 필드 추가
    FOREIGN KEY (ACCOUNT_ID) REFERENCES TB_USER_INFO (ACCOUNT_ID)
);
# User 활동 로그 분리: 사용자의 활동 로그는 로그 테이블에 분리하여 저장하는 것이 좋습니다.
# 로그 테이블을 별도로 생성하여 사용자 활동을 기록할 수 있습니다.

CREATE TABLE TB_USER_ACTIVITY_LOG
(
    LOG_ID      INT AUTO_INCREMENT PRIMARY KEY,
    ACCOUNT_ID  INT NOT NULL COMMENT '사용자 고유 아이디',
    ACTIVITY    VARCHAR(255) NOT NULL COMMENT '활동 종류',
    ACTIVITY_AT DATETIME(6) NOT NULL COMMENT '활동 일시',
    -- 다른 필드 추가
    FOREIGN KEY (ACCOUNT_ID) REFERENCES TB_USER_INFO (ACCOUNT_ID)
);
# User 상태 관리: 사용자의 상태(예: 로그인 상태)를 관리하려면 상태 관리 테이블을 만들 수 있습니다.

CREATE TABLE TB_USER_STATUS
(
    ACCOUNT_ID INT PRIMARY KEY,
    LAST_LOGIN BIGINT NULL COMMENT '최종 로그인 시간',
    LAST_LOGOUT BIGINT NULL COMMENT '최종 로그아웃 시간',
    -- 다른 필드 추가
    FOREIGN KEY (ACCOUNT_ID) REFERENCES TB_USER_INFO (ACCOUNT_ID)
);
# User 권한 및 설정: 사용자의 권한 및 설정은 별도의 테이블에 저장할 수 있습니다.

CREATE TABLE TB_USER_PERMISSION
(
    ACCOUNT_ID  INT PRIMARY KEY,
    ROLE        VARCHAR(255) NULL COMMENT '사용자 역할(등급)',
    POLICY_ALLOW TINYINT NULL COMMENT '개인정보 사용 동의 여부',
    POLICY_ALLOW_AT BIGINT NULL COMMENT '개인정보 이용 정책 동의 일시',
    -- 다른 필드 추가
    FOREIGN KEY (ACCOUNT_ID) REFERENCES TB_USER_INFO (ACCOUNT_ID)
);
# DB Normalization 원칙을 따름
# 데이터 일관성, 보안, 성능 등을 개선할 수 있으며, 복잡한 쿼리를 최소화
# 모델을 더 세분화하거나 조정할 수 있지만, 기본적인 아이디어는 데이터를 관련성 있는 테이블로만 분리
