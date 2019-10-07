# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: motogp
# Generation Time: 2019-01-14 20:43:22 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP DATABASE IF EXISTS `motogp`;
CREATE DATABASE IF NOT EXISTS `motogp`;
USE `motogp`;

# Dump of table circuit
# ------------------------------------------------------------

DROP TABLE IF EXISTS `circuit`;

CREATE TABLE `circuit` (
                         `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                         `code` varchar(32) NOT NULL DEFAULT '',
                         `name` varchar(128) NOT NULL DEFAULT '',
                         `title` varchar(128) NOT NULL DEFAULT '',
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `uk_circuit` (`code`,`name`,`title`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table race
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race`;

CREATE TABLE `race` (
                      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                      `date` date NOT NULL DEFAULT '0000-00-00',
                      `circuit_key` int(11) unsigned NOT NULL,
                      PRIMARY KEY (`id`),
                      UNIQUE KEY `uk_race` (`date`,`circuit_key`),
                      KEY `fk_circuit` (`circuit_key`),
                      CONSTRAINT `fk_circuit` FOREIGN KEY (`circuit_key`) REFERENCES `circuit` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table race_result
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race_result`;

CREATE TABLE `race_result` (
                             `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                             `position` int(11) DEFAULT NULL,
                             `points` int(11) NOT NULL DEFAULT '0',
                             `time` varchar(32) NOT NULL DEFAULT '',
                             `rider_key` int(11) unsigned NOT NULL,
                             `race_key` int(11) unsigned NOT NULL,
                             PRIMARY KEY (`id`),
                             UNIQUE KEY `uk_race_result` (`position`,`rider_key`,`race_key`),
                             KEY `fk_race` (`race_key`),
                             KEY `fk_rider` (`rider_key`),
                             CONSTRAINT `fk_race` FOREIGN KEY (`race_key`) REFERENCES `race` (`id`),
                             CONSTRAINT `fk_rider` FOREIGN KEY (`rider_key`) REFERENCES `rider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table rider
# ------------------------------------------------------------

DROP TABLE IF EXISTS `rider`;

CREATE TABLE `rider` (
                       `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
                       `name` varchar(64) NOT NULL DEFAULT '',
                       `nation` varchar(64) NOT NULL DEFAULT '',
                       `number` int(11) NOT NULL,
                       `team` varchar(64) NOT NULL DEFAULT '',
                       `bike` varchar(64) NOT NULL DEFAULT '',
                       PRIMARY KEY (`id`),
                       UNIQUE KEY `uk_rider` (`name`,`number`, `team`, `bike`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
