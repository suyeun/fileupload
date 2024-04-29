create table TB_RESOURCE
(
    RESOURCE_ID int auto_increment comment '자원 고유 아이디' primary key,
    SERVICE_ID  int          default 0                    not null comment '서비스 아이디 TB_SERVICE.sql.SERVICE_ID',
    DATA_ID     int          default 0                    null comment '자원 고유 번호 TB_RESOURCE_DATA.DATA_ID',
    CATEGORY    varchar(30)                               null comment '연관 데이타 타잎 TB_RESOURCE_TYPE',
    ASSOCIATION longtext collate utf8mb4_bin              null comment '연관된 하위 자원의 key:value(nano-id) 배열 JSON'
        check (json_valid(`ASSOCIATION`)),
    UPDATE_AT   int          default unix_timestamp()     null comment 'UPDATE-STAMP',
    CREATE_AT   timestamp(6) default current_timestamp(6) not null comment 'REGISTRATION AT',
    constraint REL_ea9ddacc6a3650d543673c393d unique (DATA_ID),
    constraint FK_ea9ddacc6a3650d543673c393df
        foreign key (DATA_ID) references TB_RESOURCE_DATA (DATA_ID) on update cascade
);
create index `IDX.RESOURCE.DATA_ID` on TB_RESOURCE (DATA_ID);

create table TB_RESOURCE_DATA
(
    DATA_ID   int auto_increment comment '데이타 고유 아이디' primary key,
    GROUP_ID  varchar(60)                               not null comment '단위 그룹 아이디',
    ATTRIBUTE longtext collate utf8mb4_bin              null comment '직렬화/문자열 자원(ATTRIBUTE)'
        check (json_valid(`ATTRIBUTE`)),
    CATEGORY  varchar(255)                              null comment '연관 데이타 타잎 TB_RESOURCE_TYPE',
    DATA_TAG  varchar(255)                              null comment 'file(S3) 이름',
    DATA_PATH varchar(255)                              null comment '직렬화/문자열 표현이 아닌 file(S3)등의 PATH/DATA',
    OWNER_IDX int                                       null comment '등록 계정 고유 번호',
    UPDATE_AT int          default unix_timestamp()     null on update unix_timestamp(6) comment 'UPDATE-STAMP',
    CREATE_AT timestamp(6) default current_timestamp(6) not null comment 'REGISTRATION AT'
);
create index `IDX.GROUP_ID` on TB_RESOURCE_DATA (GROUP_ID);


create table TB_RESOURCE_TYPE
(
    RESOURCE_TYPE_ID int auto_increment comment 'TABLE UNIQUE ID' primary key,
    NAME             varchar(255)                              not null comment '자원 URI PARAM/TEXT NAME',
    CODE             int          default 0                    not null comment '0:empty, 1:service/resource, 2:attribute, 3:entity',
    ATTR             longtext collate utf8mb4_bin              null comment '자원 확장 속성 객체'
        check (json_valid(`ATTR`)),
    UPDATE_AT        int          default unix_timestamp(6)    null on update unix_timestamp(6) comment 'UPDATE-STAMP',
    CREATE_AT        timestamp(6) default current_timestamp(6) not null comment 'REGISTRATION AT'
);

