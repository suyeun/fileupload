-- ########################################[ DB 생성 정보 ]########################################
CREATE DATABASE `INCHUN_AR_NAVI` CHARACTER SET 'utf8' COLLATE 'utf8_unicode_ci'; -- 기본 DATABASE 생성

CREATE USER 'ar_navi'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON INCHUN_AR_NAVI.* TO 'ar_navi'@'%';
FLUSH PRIVILEGES;


# mysql.mtown-dev.mirrorcity.io
# mtown-mysql.mtown-dev.svc.cluster.local
