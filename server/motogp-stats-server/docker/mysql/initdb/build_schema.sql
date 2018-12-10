# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.21)
# Database: motogp
# Generation Time: 2018-12-08 21:12:49 +0000
# ************************************************************

CREATE DATABASE IF NOT EXISTS `motogp`;
USE `motogp`;

# rider table
# ------------------------------------------------------------
DROP TABLE IF EXISTS `rider`;

CREATE TABLE `rider` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `nation` varchar(64) NOT NULL DEFAULT '',
  `number` int(11) NOT NULL,
  `team` varchar(64) NOT NULL DEFAULT '',
  `bike` varchar(64) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# race table
# ------------------------------------------------------------
DROP TABLE IF EXISTS `race`;

CREATE TABLE `race` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `location` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# race_result table
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race_result`;

CREATE TABLE `race_result` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `position` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL,
  `time` varchar(32) NOT NULL DEFAULT '',
  `rider_key` int(11) unsigned NOT NULL,
  `race_key` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `race_key` (`race_key`),
  KEY `rider_key` (`rider_key`),
  CONSTRAINT `race_result_ibfk_2` FOREIGN KEY (`race_key`) REFERENCES `race` (`id`),
  CONSTRAINT `race_result_ibfk_3` FOREIGN KEY (`rider_key`) REFERENCES `rider` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
