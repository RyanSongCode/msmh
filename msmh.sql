-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: msmh
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `msmh_admin`
--

DROP TABLE IF EXISTS `msmh_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msmh_admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `acc` varchar(90) NOT NULL DEFAULT '',
  `key` varchar(255) NOT NULL DEFAULT '',
  `roles` int(11) unsigned NOT NULL,
  `is_enable` tinyint(1) unsigned NOT NULL,
  `created` bigint(20) NOT NULL,
  `lastlogintime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `msmh_childcategory`
--

DROP TABLE IF EXISTS `msmh_childcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msmh_childcategory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(90) NOT NULL DEFAULT '',
  `maincategory_id` int(11) unsigned NOT NULL DEFAULT '0',
  `sort_index` tinyint(1) unsigned NOT NULL DEFAULT '50',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `icon_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_childcategory` (`maincategory_id`),
  CONSTRAINT `fk_childcategory` FOREIGN KEY (`maincategory_id`) REFERENCES `msmh_maincategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1008023 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `msmh_goods`
--

DROP TABLE IF EXISTS `msmh_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msmh_goods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `goods_brand` varchar(90) NOT NULL DEFAULT '',
  `whole_sale` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `retail_sale` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `belongto_supplier` varchar(90) NOT NULL DEFAULT '',
  `goods_categoryid` int(11) DEFAULT NULL,
  `display_pic` varchar(255) NOT NULL DEFAULT '',
  `detail_pic` varchar(255) NOT NULL DEFAULT '',
  `goods_size` varchar(255) NOT NULL DEFAULT '',
  `goods_color` varchar(255) NOT NULL DEFAULT '',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `is_expire` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_sellshort` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `goods_created` bigint(20) DEFAULT NULL,
  `goods_code` varchar(90) NOT NULL DEFAULT '',
  `goods_categoryname` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `goods_categoryid` (`goods_categoryid`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `msmh_maincategory`
--

DROP TABLE IF EXISTS `msmh_maincategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msmh_maincategory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(90) NOT NULL DEFAULT '',
  `sort_index` tinyint(1) unsigned NOT NULL DEFAULT '50',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1006008 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `msmh_size`
--

DROP TABLE IF EXISTS `msmh_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `msmh_size` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `size_alisa` varchar(90) NOT NULL DEFAULT '',
  `size_set` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-31  8:52:30
