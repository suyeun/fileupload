create table TB_REFERENCE
(
    REFERENCE_ID int auto_increment comment 'TABLE UNIQUE ID' primary key,
    SERVICE_ID   int                                       not null comment '서비스 아이디, TB_SERVICE.SERVICE_ID',
    SERVICE_TYPE int          default 0                    not null comment '서비스 타잎, TB_RESOURCE_TYPE.TB_IDX',
    RESULT_DATA  longtext collate utf8mb4_bin              not null comment '서비스 조회 결과 데이타'
        check (json_valid(`RESULT_DATA`)),
    RES_VERSION  int(6)       default current_timestamp()  null comment '서비스 현제 버전(TABLE.UPDATE_AT/UNIX-TIMESTAMP)',
    UPDATE_AT    timestamp(6) default current_timestamp(6) null on update current_timestamp(6) comment '수정일시',
    CREATE_AT    timestamp(6) default current_timestamp(6) not null comment '등록일시',
    constraint `IDX_TB_REFERENCE.SERVICE_ID` unique (SERVICE_ID)
);

create index `IDX_TB_REFERENCE.RES_VERSION` on TB_REFERENCE (RES_VERSION);


