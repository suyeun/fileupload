# CREATE SCHEMA IF NOT EXIST `mirrorcity` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

# USE `mirrorcity`;

-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: 15.165.241.67    Database: mirrorcity
-- ------------------------------------------------------
-- Server version	5.7.42-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tb_accounts`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_accounts` (
  `account_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `shard` int(11) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_id`),
  KEY `tb_accounts_account_id_index` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48192 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_accuses`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_accuses` (
  `accuse_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` bigint(20) NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `reason` varchar(200) NOT NULL DEFAULT '',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`accuse_id`),
  KEY `tb_accuses_account_id_index` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_admins`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_admins` (
  `admin_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `corporation_number` varchar(200) DEFAULT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `channel_id` varchar(100) DEFAULT NULL,
  `profile_image` varchar(200) DEFAULT NULL,
  `last_login` bigint(20) DEFAULT NULL,
  `last_logout` bigint(20) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `tb_admins_email_uindex` (`email`),
  KEY `tb_admins_admin_id_index` (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_assets`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_assets` (
  `asset_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `platform` varchar(20) NOT NULL DEFAULT '',
  `description` varchar(200) NOT NULL DEFAULT '',
  `filename` varchar(200) NOT NULL DEFAULT '',
  `version` varchar(100) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`asset_id`),
  KEY `tb_users_asset_id_index` (`asset_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_avatars`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_avatars` (
  `account_id` bigint(20) NOT NULL,
  `properties` varchar(3000) NOT NULL DEFAULT '',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_id`),
  KEY `tb_avatars_account_id_index` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_bookmarks`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_bookmarks` (
  `bookmark_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `room_id` int(11) NOT NULL,
  `mark` tinyint(1) NOT NULL DEFAULT '1',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bookmark_id`),
  UNIQUE KEY `tb_bookmarks_pk` (`account_id`,`room_id`),
  KEY `tb_bookmarks_bookmark_id_index` (`bookmark_id`)
) ENGINE=InnoDB AUTO_INCREMENT=380 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_channels`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_channels` (
  `channel_id` bigint(20) NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `users` int(11) unsigned DEFAULT '0',
  `deleted` tinyint(3) unsigned DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`channel_id`,`room_id`),
  KEY `tb_channels_tb_rooms_room_id_fk` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_events`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_events` (
  `event_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `background_color` varchar(100) DEFAULT NULL,
  `font_color` varchar(100) DEFAULT NULL,
  `thumbnail` varchar(200) NOT NULL DEFAULT '',
  `deleted` tinyint(1) DEFAULT '0',
  `update_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  `reg_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  `schema_url` varchar(400) DEFAULT NULL,
  `is_show` tinyint(1) DEFAULT '0',
  `room_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `tb_events_event_id_uindex` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_files`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_files` (
  `file_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `indicator` varchar(200) NOT NULL,
  `filename` varchar(200) NOT NULL DEFAULT '',
  `description` varchar(200) NOT NULL DEFAULT '',
  `locked` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_id`),
  UNIQUE KEY `tb_files_indicator_uindex` (`indicator`),
  KEY `tb_files_file_id_index` (`file_id`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_maintenance`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_maintenance` (
  `maintenance_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `actived` tinyint(1) NOT NULL DEFAULT '0',
  `message` longtext NOT NULL,
  `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`maintenance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_notices`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_notices` (
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `notice_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  PRIMARY KEY (`notice_id`),
  KEY `tb_notices_notice_id_index` (`notice_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_pois`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_pois` (
  `gisNo` varchar(50) NOT NULL,
  `docId` varchar(50) DEFAULT NULL,
  `buildName` varchar(50) NOT NULL,
  `originSource` varchar(10) NOT NULL,
  `location` varchar(3000) NOT NULL,
  `bbox` varchar(100) DEFAULT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gisNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_pushs`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_pushs` (
  `push_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `message` varchar(2000) NOT NULL,
  `image` varchar(200) DEFAULT '',
  `description` varchar(200) DEFAULT '',
  `deleted` tinyint(1) unsigned DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`push_id`),
  KEY `tb_pushs_push_id_index` (`push_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_roominfos`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_roominfos` (
  `room_id` bigint(20) DEFAULT NULL,
  `sub_title` varchar(200) DEFAULT NULL,
  `sub_description` varchar(1000) DEFAULT NULL,
  `room_provide` varchar(1000) DEFAULT '[]',
  `gallery_url` varchar(1000) DEFAULT '[]',
  `total_visit_cnt` int(11) DEFAULT NULL COMMENT '누적접속자',
  `address` varchar(200) DEFAULT NULL,
  `shortcut_title` varchar(100) DEFAULT NULL,
  `shortcut_url` varchar(200) DEFAULT NULL,
  `update_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) DEFAULT '0',
  `reg_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  KEY `tb_roominfos_room_id_index` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_rooms`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_rooms` (
  `room_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `video_type` int(11) DEFAULT '0',
  `room_type` varchar(20) NOT NULL DEFAULT 'room',
  `users` int(11) NOT NULL DEFAULT '0',
  `is_channel` tinyint(1) DEFAULT '0',
  `file_link` varchar(200) DEFAULT NULL,
  `description` varchar(200) NOT NULL DEFAULT '',
  `passcode` varchar(10) DEFAULT NULL,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `video_link` varchar(200) DEFAULT NULL,
  `thumbnail` varchar(200) NOT NULL DEFAULT '',
  `asset_id_ios` int(11) NOT NULL DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `json_link` varchar(200) DEFAULT NULL,
  `private` tinyint(4) DEFAULT '0' COMMENT '1 is public, 0 is private room with passcode',
  `lat` varchar(20) NOT NULL DEFAULT '',
  `category` varchar(50) NOT NULL DEFAULT '',
  `user_max` int(10) NOT NULL DEFAULT '10',
  `channels` varchar(2000) DEFAULT '[]',
  `deleted` tinyint(1) unsigned DEFAULT '0',
  `title` varchar(200) NOT NULL,
  `big_thumbnail` varchar(200) NOT NULL,
  `asset_id_android` int(11) NOT NULL DEFAULT '0',
  `gis_no` varchar(50) NOT NULL,
  `lon` varchar(20) NOT NULL DEFAULT '',
  `room_level` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`room_id`),
  KEY `tb_rooms_room_id_index` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_users` (
  `account_id` bigint(20) NOT NULL,
  `device_id` varchar(200) NOT NULL DEFAULT '',
  `provider` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `channel_id` varchar(200) DEFAULT NULL,
  `platform` varchar(10) DEFAULT NULL,
  `nickname` varchar(200) DEFAULT '',
  `username` varchar(200) NOT NULL DEFAULT '',
  `push_allow` tinyint(1) NOT NULL DEFAULT '1',
  `push_allow_dt` bigint(20) DEFAULT NULL,
  `push_token` varchar(200) DEFAULT NULL,
  `push_token_dt` bigint(20) DEFAULT NULL,
  `push_type` varchar(50) DEFAULT NULL,
  `policy_allow` tinyint(1) NOT NULL DEFAULT '0',
  `policy_allow_dt` bigint(20) DEFAULT NULL,
  `last_login` bigint(20) DEFAULT NULL,
  `last_logout` bigint(20) DEFAULT NULL,
  `profile_image` varchar(200) DEFAULT '',
  `role` varchar(20) DEFAULT 'user',
  `deleted` tinyint(4) NOT NULL DEFAULT '0',
  `update_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reg_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` int(100) DEFAULT NULL,
  `complete_dt` datetime DEFAULT NULL,
  PRIMARY KEY (`account_id`),
  KEY `tb_users_account_id_index` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_usersquest`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usersquest` (
  `account_id` bigint(20) NOT NULL,
  `room_id` bigint(20) DEFAULT NULL,
  `quest_data` varchar(1000) DEFAULT NULL,
  `is_complete` tinyint(1) DEFAULT '0',
  `deleted` tinyint(4) DEFAULT '0',
  `update_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  `reg_dt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tb_words`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_words` (
  `word` varchar(20) NOT NULL DEFAULT '',
  KEY `tb_words_word_index` (`word`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-19 18:16:13
