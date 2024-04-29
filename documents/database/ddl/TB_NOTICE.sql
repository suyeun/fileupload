create table MC202307.TB_NOTICE
(
    SUBJECT     varchar(256)                              not null comment '공지 제목',
    UPDATE_AT   timestamp(6) default current_timestamp(6) null on update current_timestamp(6) comment '수정일시',
    CREATE_AT   timestamp(6) default current_timestamp(6) not null comment '등록일시',
    NOTICE_ID   bigint auto_increment comment 'NOTICE UNIQUE ID' primary key,
    DELETED     tinyint      default 0                    not null comment '삭제/비활성',
    DESCRIPTION varchar(255)                              null comment '공지 설명'
);

-- TODO : SCOPE 추가(작업 예정)
