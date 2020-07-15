-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2020 at 05:05 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `slash_the_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `str_options`
--

CREATE TABLE `str_options` (
  `profile_groups` text NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`options`)),
  `type` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `str_options`
--

INSERT INTO `str_options` (`profile_groups`, `options`, `type`) VALUES
('sex', '[{\"name\":\"Male\", \"id\":\"1\"}, {\"name\":\"Female\",\"id\":\"2\"},{\"name\":\"Both\",\"id\":\"3\"}]', 'select'),
('Sexual Orientation', '[{\"name\":\"Heterosexual\",\"id\":\"1\"},{\"name\":\"Homosexual\",\"id\":\"2\"},{\"name\":\"Bisexual\",\"id\":\"3\"},{\"name\":\"Others\",\"id\":\"4\"}]', 'rank'),
('Education', '[{\"name\":\"High school\", \"id\":\"1\"},{\"name\":\"BA\", \"id\":\"2\"},{\"name\":\"MA\", \"id\":\"3\"},{\"name\":\"PHD\", \"id\":\"4\"}]', 'rank'),
('Age', '[{\"name\":\"20-24\",\"id\":\"1\"},{\"name\":\"25-29\",\"id\":\"2\"},{\"name\":\"30-34\",\"id\":\"3\"},{\"name\":\"35-39\",\"id\":\"4\"},{\"name\":\"40+\",\"id\":\"5\"}]', 'rank'),
('Employment', '[{\"name\":\"Full-time\",\"id\":\"1\"},{\"name\":\"Part-time\",\"id\":\"2\"},{\"name\":\"Self-employed\",\"id\":\"3\"},{\"name\":\"Unemployed\",\"id\":\"4\"}]', 'rank'),
('House Type', '[{\"name\":\"Apartment\",\"id\":\"1\"},{\"name\":\"House\",\"id\":\"2\"}]', 'rank'),
('Maximum Roomates', '[{\"name\":\"1\",\"id\":\"1\"},{\"name\":\"2\",\"id\":\"2\"},{\"name\":\"3\",\"id\":\"3\"},{\"name\":\"4\",\"id\":\"4\"},{\"name\":\"4\",\"id\":\"5\"}]', 'select'),
('Rent Length', '[{\"name\":\"4\",\"id\":\"1\"},{\"name\":\"8\",\"id\":\"2\"},{\"name\":\"12\",\"id\":\"3\"}]', 'rank'),
('Pet Friendly', '[{\"name\":\"Cats\",\"id\":\"1\"},{\"name\":\"Dogs\",\"id\":\"2\"},{\"name\":\"Wild Pets\",\"id\":\"3\"},{\"name\":\"No Pets\",\"id\":\"4\"},{\"name\":\"Other Pets\",\"id\":\"5\"}]', 'rank'),
('Ethnicity', '[{\"name\":\"White\",\"id\":\"1\"},{\"name\":\"Black\",\"id\":\"2\"},{\"name\":\"Latino\",\"id\":\"3\"},{\"name\":\"Asian\",\"id\":\"4\"}, {\"name\":\"Other\",\"id\":\"5\"}]', 'rank'),
('Salary', '[{\"name\":\"20k-39k\",\"id\":\"1\"},{\"name\":\"40k-59k\",\"id\":\"2\"},{\"name\":\"60k-79k\",\"id\":\"3\"},{\"name\":\"80k-99k\",\"id\":\"4\"}, {\"name\":\"100k+\",\"id\":\"5\"}]', 'select'),
('Industry', '[{\"name\":\"Information Technology\",\"id\":\"1\"},{\"name\":\"Finance\",\"id\":\"2\"},{\"name\":\"Service\",\"id\":\"3\"},{\"name\":\"Health\",\"id\":\"4\"},{\"name\":\"Engineering\",\"id\":\"5\"},{\"name\":\"Other\",\"id\":\"6\"}]', 'select');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `str_options`
--
ALTER TABLE `str_options`
  ADD UNIQUE KEY `group` (`profile_groups`) USING HASH;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
