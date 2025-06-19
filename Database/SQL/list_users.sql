-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 192.168.18.10    Database: list
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` binary(16) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(65) NOT NULL,
  `IdTienda` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `FKidTienda_idx` (`IdTienda`),
  CONSTRAINT `FKidTienda` FOREIGN KEY (`IdTienda`) REFERENCES `tablatienda` (`IdTienda`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (_binary 'Z\Ô\Ó\ÍFtÆ \0]\0\r','Vala','$2b$08$NP.nwsp1flkeOiFGYPyuUO26rnzxIrYNuuhqFtoMh8Z3H64U.uCuq',NULL),(_binary 'ﬁπFlÉ\…\0]\0\r','Andres','$2b$08$QCtdHopTYTRFU4i1HLi6ZunsBwQvJGok4jEe/YZaXcN2FjuYPDKqy',1),(_binary '¿T~D\∆∑\0]\0\r','Luisa','$2b$08$Yf1eCn4L0hqD/tWC/nec9.3wB5g8F.K5YpbWVYh6e0NZz9Q4mufou',1),(_binary '\Ÿ\0ÅEº∑\0]\0\r','Antonia','$2b$08$Web.TbCTQvPdSHDwymOmkeuFcic6l8UuFuD7zuhv9C93Up4o1cHV2',NULL),(_binary '\Âº\›;D\ﬁ∑\0]\0\r','sebastian','$2b$08$NknSxh0l2X/5.M9B0LxSteC5YKDip1ObXXEbYeIAmaBQnnqYd2dGu',1),(_binary '\Ô™\ﬂ\‰D\ﬁ∑\0]\0\r','tian','$2b$08$ErTXr5LOPzjyi8jxYzi6nuJ7pwGY6aTtfPiY11UMlap3XA6wPcDhW',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-19 15:52:40
