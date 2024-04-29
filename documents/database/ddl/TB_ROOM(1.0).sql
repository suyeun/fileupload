create table TB_ROOM
(
    ROOM_ID       bigint auto_increment primary key,
    VIDEO_TYPE    int           default 0                    not null,
    ROOM_TYPE     varchar(20)   default 'room'               not null,
    USERS         int           default 0                    not null,
    IS_CHANNEL    tinyint       default 0                    not null,
    FILE_LINK     varchar(200)                               null,
    DESCRIPTION   varchar(200)                               not null,
    PASSCODE      varchar(10)                                null,
    VIDEO_LINK    varchar(200)                               null,
    THUMBNAIL     varchar(200)  default ''                   not null,
    ASSET_ID_IOS  int           default 0                    not null,
    JSON_LINK     varchar(200)                               null,
    PRIVATE       tinyint       default 0                    not null comment '1 is public 0 is private room with passcode',
    LAT           varchar(20)   default ''                   not null,
    LON           varchar(20)   default ''                   not null,
    CATEGORY      varchar(50)   default ''                   not null,
    USER_MAX      int           default 10                   not null,
    CHANNELS      varchar(2000) default '[]'                 not null,
    TITLE         varchar(200)                               not null,
    BIG_THUMBNAIL varchar(200)                               not null,
    ASSET_ID_AOS  int           default 0                    not null,
    GIS_NO        varchar(50)                                not null,
    ROOM_LV       int           default 1                    not null,
    DELETED       tinyint       default 0                    not null,
    UPDATE_AT     timestamp(6)  default current_timestamp(6) null on update current_timestamp(6),
    CREATE_AT     timestamp(6)  default current_timestamp(6) not null
);

-- TODO : ROOM, DATA 에서 테이블 분산 관리 할 것 (작업 예정)
