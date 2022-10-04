-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 08, 2022 at 12:18 PM
-- Server version: 5.7.33
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stagefive2`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `login` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `socialClub` varchar(64) NOT NULL,
  `regIP` varchar(64) NOT NULL,
  `lastIP` varchar(64) NOT NULL,
  `regDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `login`, `password`, `email`, `socialClub`, `regIP`, `lastIP`, `regDate`, `lastDate`) VALUES
(10, 'str1x', 'nehack2019', 'str@gg.gg', '403057368', '127.0.0.1', '127.0.0.1', '2022-09-03 12:05:17', '2022-09-03 12:05:17');

-- --------------------------------------------------------

--
-- Table structure for table `banip`
--

CREATE TABLE `banip` (
  `id` int(11) NOT NULL,
  `admin` varchar(64) NOT NULL,
  `player` varchar(64) NOT NULL,
  `ip` varchar(64) NOT NULL,
  `reason` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `id` int(11) NOT NULL,
  `login` text NOT NULL,
  `playerid` text NOT NULL,
  `account` text NOT NULL,
  `money` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`id`, `login`, `playerid`, `account`, `money`) VALUES
(6, 'str1x', '7', '807908', 100000);

-- --------------------------------------------------------

--
-- Table structure for table `bank_operations`
--

CREATE TABLE `bank_operations` (
  `id` int(11) NOT NULL,
  `playerid` text NOT NULL,
  `type` text NOT NULL,
  `name` text NOT NULL,
  `subname` text NOT NULL,
  `money` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bank_operations`
--

INSERT INTO `bank_operations` (`id`, `playerid`, `type`, `name`, `subname`, `money`) VALUES
(1, '7', '2', 'Пополнение счёта', 'в банке', 100),
(2, '7', '1', 'Снятие денег', 'со счёта', -5),
(3, '7', '2', 'Пополнение счёта', 'в банке', 10),
(4, '7', '2', 'Пополнение счёта', 'в банке', 1),
(5, '7', '2', 'Пополнение счёта', 'в банке', 1),
(6, '7', '2', 'Пополнение счёта', 'в банке', 100),
(7, '7', '2', 'Пополнение счёта', 'в банке', 1),
(8, '7', '2', 'Пополнение счёта', 'в банке', 12),
(9, '7', '1', 'Снятие денег', 'со счёта', -321),
(10, '7', '1', 'Снятие денег', 'со счёта', -1),
(11, '7', '2', 'Пополнение счёта', 'в банке', 1),
(12, '7', '2', 'Пополнение счёта', 'в банке', 2),
(13, '7', '2', 'Пополнение счёта', 'в банке', 5),
(14, '7', '2', 'Пополнение счёта', 'в банке', 12),
(15, '7', '2', 'Пополнение счёта', 'в банке', 1),
(16, '7', '2', 'Пополнение счёта', 'в банке', 1),
(17, '7', '2', 'Пополнение счёта', 'в банке', 1),
(18, '7', '2', 'Пополнение счёта', 'в банке', 9),
(19, '7', '2', 'Пополнение счёта', 'в банке', 1),
(20, '7', '2', 'Пополнение счёта', 'в банке', 1),
(21, '7', '2', 'Пополнение счёта', 'в банке', 56),
(22, '7', '2', 'Пополнение счёта', 'в банке', 2),
(23, '7', '2', 'Пополнение счёта', 'в банке', 100000);

-- --------------------------------------------------------

--
-- Table structure for table `characters`
--

CREATE TABLE `characters` (
  `id` int(10) UNSIGNED NOT NULL,
  `login` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Surname` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `gender` int(11) NOT NULL,
  `money` bigint(20) NOT NULL DEFAULT '0',
  `bank` bigint(20) NOT NULL DEFAULT '0',
  `lvl` int(11) NOT NULL DEFAULT '1',
  `pedFace` text NOT NULL,
  `pedDnk` text NOT NULL,
  `pedHair` text NOT NULL,
  `pedClothes` text NOT NULL,
  `lastPos` text,
  `faction` int(11) NOT NULL DEFAULT '0',
  `faction_lvl` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Dumping data for table `characters`
--

INSERT INTO `characters` (`id`, `login`, `Name`, `Surname`, `age`, `gender`, `money`, `bank`, `lvl`, `pedFace`, `pedDnk`, `pedHair`, `pedClothes`, `lastPos`, `faction`, `faction_lvl`) VALUES
(7, 'str1x', 'Clement', 'Velasco', 19, 0, 912290, 1, 1, '[-0.8786338769265556,0.5597094240610949,-0.31453713814981343,0.5408531028200154,0.8995316937944171,0.4145838050479873,-0.013411230893687787,0.6290135643011885,0.05119947369867717,-0.2885916111937754,0.7389876871223264,0.05679130820855782,-0.07028980662555906,0.7882087422774515,0.42223099426831734,0.3483836636598987,0.8921117565360674,-0.6160470400861358,-0.5006074933567186,0.16182174766387147]', '15,12,0.980555884395989,50', '{\"beard\":1,\"brows\":32,\"beardColor\":1,\"browsColor\":45,\"eyesColor\":27,\"hair\":9,\"hairColor\":1}', '{\"undershit\":15,\"shoes\":22,\"hats\":2,\"glasses\":17,\"legs\":16,\"tops\":33}', '-44.5054931640625,-1096.865966796875,26.4154052734375', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banip`
--
ALTER TABLE `banip`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bank_operations`
--
ALTER TABLE `bank_operations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `characters`
--
ALTER TABLE `characters`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `bank_operations`
--
ALTER TABLE `bank_operations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `characters`
--
ALTER TABLE `characters`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
