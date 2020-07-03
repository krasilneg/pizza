-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: 00
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: pizza
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(250) DEFAULT NULL,
  `category` varchar(10) DEFAULT NULL,
  `price_usd` decimal(5,2) DEFAULT NULL,
  `price_euro` decimal(5,2) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Carbonara','pizza',10.00,7.50,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(2,'Boloniese','pizza',11.00,7.80,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(3,'Four cheese','pizza',9.60,6.70,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(4,'Four seasons','pizza',12.50,9.40,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(5,'Marinara','pizza',11.70,8.60,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(6,'Havaii','pizza',6.80,5.40,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(7,'Ceazar','pizza',6.50,5.30,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(8,'Porky Beef','pizza',14.80,12.60,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(9,'Chicken run','pizza',11.70,10.50,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(10,'Cowboy Dream','pizza',12.70,10.50,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(11,'Coffee','drink',2.50,1.80,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(12,'Big Cola','drink',1.50,1.20,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(13,'Medium Cola','drink',1.20,1.00,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(14,'Small Cola','drink',0.70,0.50,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(15,'Tea','drink',0.50,0.30,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(16,'Ceazar','salad',2.50,2.20,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(17,'Summer Mix','salad',3.30,2.90,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(18,'Fish & Cheeze','salad',4.50,3.90,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(19,'Crunchy Mix','salad',5.50,5.10,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(20,'Ketchup','sauce',0.50,0.30,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(21,'Chili','sauce',0.50,0.30,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.'),(22,'Olive oil','sauce',0.50,0.30,'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.');
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) DEFAULT NULL,
  `when` datetime NULL,
  `status` tinyint NOT NULL,
  `contacts` TEXT DEFAULT NULL,
  `items` TEXT DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (2,'customer1@mail.com','2020-07-01 23:44:09',1,'{\"email\": \"\", \"phone\": \"89993456787\", \"address\": \"Munich Kaizer st. 67-92\"}','[{\"id\": \"2\", \"quantity\": 3, \"price_usd\": \"11.00\", \"price_euro\": \"7.80\"}, {\"id\": \"3\", \"quantity\": 1, \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}, {\"id\": \"6\", \"quantity\": 2, \"price_usd\": \"6.80\", \"price_euro\": \"5.40\"}, {\"id\": \"10\", \"quantity\": 2, \"price_usd\": \"12.70\", \"price_euro\": \"10.50\"}]'),(4,'customer1@mail.com','2020-07-01 23:59:39',1,'{\"email\": \"\", \"phone\": \"89993456787\", \"address\": \"Munich Kaizer st. 67-92\"}','[{\"id\": \"2\", \"quantity\": 2, \"price_usd\": \"11.00\", \"price_euro\": \"7.80\"}, {\"id\": \"5\", \"quantity\": 2, \"price_usd\": \"11.70\", \"price_euro\": \"8.60\"}]'),(5,'customer1@mail.com','2020-07-02 00:00:14',1,'{\"email\": \"\", \"phone\": \"89993456787\", \"address\": \"Munich Kaizer st. 67-92\"}','[{\"id\": \"5\", \"quantity\": 3, \"price_usd\": \"11.70\", \"price_euro\": \"8.60\"}, {\"id\": \"8\", \"quantity\": 3, \"price_usd\": \"14.80\", \"price_euro\": \"12.60\"}]'),(6,NULL,'2020-07-02 18:19:49',1,'{\"email\": \"anon@gmail.com\", \"phone\": \"+7800900568\", \"address\": \"Moscow, Kremlin\"}','[{\"id\": \"13\", \"quantity\": 3, \"price_usd\": \"1.20\", \"price_euro\": \"1.00\"}, {\"id\": \"8\", \"quantity\": 2, \"price_usd\": \"14.80\", \"price_euro\": \"12.60\"}]'),(7,NULL,'2020-07-02 18:22:57',1,'{\"email\": \"anon@gmail.com\", \"phone\": \"+78009004567\", \"address\": \"London Tower\"}','[{\"id\": \"3\", \"quantity\": 2, \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}, {\"id\": \"8\", \"quantity\": 2, \"price_usd\": \"14.80\", \"price_euro\": \"12.60\"}, {\"id\": \"13\", \"quantity\": 4, \"price_usd\": \"1.20\", \"price_euro\": \"1.00\"}, {\"id\": \"22\", \"quantity\": 2, \"price_usd\": \"0.50\", \"price_euro\": \"0.30\"}]'),(8,NULL,'2020-07-02 18:32:34',1,'{\"email\": \"anon@gmail.com\", \"phone\": \"+7900800\", \"address\": \"Beijing\"}','[{\"id\": \"7\", \"quantity\": 2, \"price_usd\": \"6.50\", \"price_euro\": \"5.30\"}]'),(9,NULL,'2020-07-02 18:39:16',1,'{\"email\": \"anon@mail.com\", \"phone\": \"+79008005678\", \"address\": \"Beijing\"}','[{\"id\": \"3\", \"quantity\": 1, \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}, {\"id\": \"4\", \"quantity\": 1, \"price_usd\": \"12.50\", \"price_euro\": \"9.40\"}]'),(13,'customer@gmail.com','2020-07-02 22:42:29',1,'{\"email\": \"anon@mail.com\", \"phone\": \"+79008005678\", \"address\": \"Moscow, Kremlin\"}','[{\"id\": \"3\", \"quantity\": 3, \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}, {\"id\": \"13\", \"quantity\": 2, \"price_usd\": \"1.20\", \"price_euro\": \"1.00\"}]'),(14,'customer@gmail.com','2020-07-02 22:46:47',1,'{\"email\": \"anon@mail.com\", \"phone\": \"+79008005678\", \"address\": \"Moscow, Kremlin\"}','[{\"id\": \"6\", \"quantity\": 3, \"price_usd\": \"6.80\", \"price_euro\": \"5.40\"}]'),(15,'customer@gmail.com','2020-07-02 22:48:58',1,'{\"email\": \"anon@mail.com\", \"phone\": \"+79008005678\", \"address\": \"Moscow, Kremlin\"}','[{\"id\": \"3\", \"quantity\": 2, \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}]'),(16,NULL,'2020-07-02 22:59:20',1,'{\"email\": \"anon@mail.com\", \"phone\": \"+79008005678\", \"address\": \"Moscow, Kremlin\"}','[{\"id\": \"3\", \"quantity\": 1, \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}, {\"id\": \"6\", \"quantity\": 2, \"price_usd\": \"6.80\", \"price_euro\": \"5.40\"}, {\"id\": \"12\", \"quantity\": 1, \"price_usd\": \"1.50\", \"price_euro\": \"1.20\"}, {\"id\": \"16\", \"quantity\": 1, \"price_usd\": \"2.50\", \"price_euro\": \"2.20\"}]'),(17,NULL,'2020-07-02 23:10:40',1,'{\"email\": \"anon@mail.com\", \"phone\": \"+79008005678\", \"address\": \"Moscow, Kremlin\"}','[{\"id\": \"3\", \"quantity\": 1, \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}, {\"id\": \"5\", \"quantity\": 2, \"price_usd\": \"11.70\", \"price_euro\": \"8.60\"}, {\"id\": \"1\", \"quantity\": 1, \"price_usd\": \"10.00\", \"price_euro\": \"7.50\"}, {\"id\": \"17\", \"quantity\": 1, \"price_usd\": \"3.30\", \"price_euro\": \"2.90\"}, {\"id\": \"14\", \"quantity\": 3, \"price_usd\": \"0.70\", \"price_euro\": \"0.50\"}, {\"id\": \"8\", \"quantity\": 1, \"price_usd\": \"14.80\", \"price_euro\": \"12.60\"}]'),(18,NULL,'2020-07-02 23:52:24',1,'{\"email\": \"anon@mail.com\", \"phone\": \"+79008005678\", \"address\": \"Moscow, Kremlin\"}','[{\"id\": \"14\", \"quantity\": \"6\", \"price_usd\": \"0.70\", \"price_euro\": \"0.50\"}, {\"id\": \"15\", \"quantity\": \"6\", \"price_usd\": \"0.50\", \"price_euro\": \"0.30\"}, {\"id\": \"13\", \"quantity\": \"9\", \"price_usd\": \"1.20\", \"price_euro\": \"1.00\"}, {\"id\": \"7\", \"quantity\": 2, \"price_usd\": \"6.50\", \"price_euro\": \"5.30\"}, {\"id\": \"3\", \"quantity\": 2, \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}]'),(19,NULL,'2020-07-02 23:54:17',1,'{\"email\": \"anon@mail.com\", \"phone\": \"+79008005678\", \"address\": \"Moscow, Kremlin\"}','[{\"id\": \"7\", \"quantity\": 2, \"price_usd\": \"6.50\", \"price_euro\": \"5.30\"}, {\"id\": \"3\", \"quantity\": \"1\", \"price_usd\": \"9.60\", \"price_euro\": \"6.70\"}]');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `uid` varchar(50) NOT NULL,
  `pwd` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `token_exp` datetime DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('customer@gmail.com','$2y$10$rcYY5jIQHjGBJUhALIajHetmwmD8NkEOw9iakUPPYi4Kv1J8NLC3e','bf9b42fe181576cade655140d8a2ebd76c32b8b6a840410e9d12f201307bab84','2020-07-03 23:05:37','78009005678','Moscow, Kremlin'),('customer1@mail.com','$2y$10$e4f1Bh7x5OT7T354o20tseYUjOPR4fgFM54wh.BppgG5k549CmbJ6','dd3bee3cafa8eaab61220ff4ca9c3476c90437bdc90286d5f042a1639695051c','2020-07-02 23:59:19','89993456787','Munich Kaizer st. 67-92'),('drone@mail.ru','$2y$10$enmi.jmqrGfhfzc8YLYEb.k3k4eKh5ZVPl0vXk6wb5LRBSqN8DguC','b0f8ba37e476b2a54eac1ed762c451a37e354ac361e30ff96e58e62b643ab490','2020-07-03 18:40:48',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-02 23:57:10
