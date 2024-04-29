create table TB_SERVICE
(
    SERVICE_ID int auto_increment comment '서비스 아이디' primary key,
    OWNER_IDX  int          default 0                    not null comment '서비스 생성 계정 아이디',
    CATEGORY   varchar(255)                              not null comment '서비스 타잎, TB_RESOURCE_TYPE.NAME',
    STAT       tinyint      default 0                    not null comment '대기/활성/비활성/삭제 : 0, 1, 2, 3',
    ATTRIBUTE  longtext collate utf8mb4_bin              null comment '서비스 생성시 일반화 처리에 따른 잔여 데이타(DynamicData, MetaData 아닌) 필드'
        check (json_valid(`ATTRIBUTE`)),
    SUBJECT    varchar(200)                              null comment '제목/이름/구분값 등의 서비스 구분값',
    UPDATE_AT  int          default unix_timestamp()     not null comment 'UNIX-TIMESTAMP/s - 자원/데이타 등의 수정시 연계 되여아 하는 값',
    CREATE_AT  timestamp(6) default current_timestamp(6) not null comment '등록일',
    constraint IDX_19067e53cfa7b7336efa408504 unique (SERVICE_ID, CATEGORY)
);

create index IDX_18f4f91c9634db28859f0e6c7a on TB_SERVICE (OWNER_IDX);

