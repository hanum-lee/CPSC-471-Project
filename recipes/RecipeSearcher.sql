-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: recipesearcher
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `consists_of_ing`
--

DROP TABLE IF EXISTS `consists_of_ing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `consists_of_ing` (
  `ing_name` char(45) NOT NULL,
  `amount` char(45) NOT NULL,
  `recipe_no` smallint(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ing_name`),
  KEY `i_name_idx` (`ing_name`),
  KEY `r_no_idx` (`recipe_no`),
  CONSTRAINT `i_name` FOREIGN KEY (`ing_name`) REFERENCES `ingredients` (`iname`),
  CONSTRAINT `r_no_fk3` FOREIGN KEY (`recipe_no`) REFERENCES `recipe` (`num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consists_of_ing`
--

LOCK TABLES `consists_of_ing` WRITE;
/*!40000 ALTER TABLE `consists_of_ing` DISABLE KEYS */;
INSERT INTO `consists_of_ing` VALUES ('[\"Eggs\"]','[\"1\"]',58),('Eggs','1',1),('Milk','10',1);
/*!40000 ALTER TABLE `consists_of_ing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cookware_used`
--

DROP TABLE IF EXISTS `cookware_used`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cookware_used` (
  `cookware` char(45) NOT NULL,
  `r_no` smallint(11) NOT NULL AUTO_INCREMENT,
  KEY `fk_r_no_idx` (`r_no`),
  CONSTRAINT `fk_r_no` FOREIGN KEY (`r_no`) REFERENCES `recipe` (`num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cookware_used`
--

LOCK TABLES `cookware_used` WRITE;
/*!40000 ALTER TABLE `cookware_used` DISABLE KEYS */;
INSERT INTO `cookware_used` VALUES ('\"Whisk\"',1),('\" Pan\"',1),('Frying Pan',58);
/*!40000 ALTER TABLE `cookware_used` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `favorites` (
  `user_id` char(45) NOT NULL,
  `r_no` smallint(11) NOT NULL AUTO_INCREMENT,
  `f_name` char(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `r_no_idx` (`r_no`),
  KEY `u_id_idx` (`user_id`),
  KEY `f_name_fk_idx` (`f_name`),
  CONSTRAINT `food_name_fk` FOREIGN KEY (`f_name`) REFERENCES `food` (`fname`),
  CONSTRAINT `r_no_fk2` FOREIGN KEY (`r_no`) REFERENCES `recipe` (`num`) ON DELETE CASCADE,
  CONSTRAINT `u_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user_recipesearcher` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES ('test',1,'Pancakes');
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food` (
  `fname` char(45) NOT NULL,
  `r_no` smallint(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`fname`),
  KEY `r_no_idx` (`r_no`),
  CONSTRAINT `r_no_fk` FOREIGN KEY (`r_no`) REFERENCES `recipe` (`num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES ('Pancakes',1),('\"Fried Eggs\"',58);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_type`
--

DROP TABLE IF EXISTS `food_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_type` (
  `f_name` char(45) NOT NULL,
  `f_type` varchar(45) NOT NULL,
  KEY `r_name_fk_idx` (`f_name`) /*!80000 INVISIBLE */,
  CONSTRAINT `f_name` FOREIGN KEY (`f_name`) REFERENCES `food` (`fname`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_type`
--

LOCK TABLES `food_type` WRITE;
/*!40000 ALTER TABLE `food_type` DISABLE KEYS */;
INSERT INTO `food_type` VALUES ('Pancakes','Cake'),('\"Fried Eggs\"','[\"Breakfast\"]');
/*!40000 ALTER TABLE `food_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ingredients` (
  `iname` char(45) NOT NULL,
  `itype` char(45) NOT NULL,
  PRIMARY KEY (`iname`),
  UNIQUE KEY `name_UNIQUE` (`iname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES ('[\"Eggs\"]','[\"Protein\"]'),('Artichokes','Vegetable'),('Asparagus','Vegetable'),('Baking powder','Misc'),('Baking soda','Misc'),('Beet','Vegetable'),('Blueberry','Fruit'),('Broccoli','Vegetable'),('Brown Sugar','Sugar'),('Brussels sprouts','Vegetable'),('Butter','Dairy'),('Cabbage','Vegetable'),('Cane Sugar','Sugar'),('Cantaloupe','Fruit'),('Carrot','Vegetable'),('Cauliflower','Vegetable'),('Celery','Vegetable'),('Chedder Cheese','Dairy'),('Chicken(breast)','Poultry'),('Chicken(drumstick)','Poultry'),('Chicken(whole)','Poultry'),('Chicken(wings)','Poultry'),('Chilli peppers','Vegetable'),('Cucumber','Vegetable'),('Eggplant','Vegetable'),('Eggs','Protein'),('Flour','Grain'),('Garlic','Vegetable'),('Green onion','Vegetable'),('Honey','Sugar'),('Honeydew(Melon)','Fruit'),('Kale','Vegetable'),('Milk','Dairy'),('Onion','Vegetable'),('Peas','Vegetable'),('Potatoes','Vegetable'),('Pumpkin','Vegetable'),('Rhubarb','Vegetable'),('Rice','Grain'),('Rice flour','Grain'),('Sea Salt','Salt'),('Spinach','Vegetable'),('Steak(t-bone)','Beef'),('Strawberry','Fruit'),('Sweet Rice','Grain'),('Sweet Rice flour','Grain'),('Table Salt','Salt'),('Tomatoes','Fruit'),('Turkey(whole)','Poultry'),('Water','Misc'),('Watermelon','Fruit'),('White Sugar','Sugar'),('Yams','Vegetable');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `recipe` (
  `NUM` smallint(11) NOT NULL AUTO_INCREMENT,
  `user_id` char(45) NOT NULL,
  `rname` char(45) NOT NULL,
  `time_taken` char(45) NOT NULL,
  `directions` text NOT NULL,
  PRIMARY KEY (`NUM`),
  UNIQUE KEY `NUM._UNIQUE` (`NUM`),
  KEY `u_id_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe`
--

LOCK TABLES `recipe` WRITE;
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` VALUES (1,'test','Pancakes','10','1)Mix the flour, baking powder, salt and sugar 2)Add in the milk, egg and melted butter, until no chunks are seen 3) Heat a frying pan, melt a little butter to oil said pan and cook the batter until golden on both sides before serving '),(58,'test','\"Fried Eggs\"','\"10\"','\" Fry the eggs in the pan\"');
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `review` (
  `r_no` smallint(11) NOT NULL,
  `u_id` char(45) NOT NULL,
  `rating` text NOT NULL,
  `stars` smallint(5) NOT NULL,
  UNIQUE KEY `u_id_UNIQUE` (`u_id`),
  UNIQUE KEY `r_no_UNIQUE` (`r_no`),
  KEY `recipe_num_fk_idx` (`r_no`),
  CONSTRAINT `recipe_num_fk` FOREIGN KEY (`r_no`) REFERENCES `recipe` (`num`) ON DELETE CASCADE,
  CONSTRAINT `user_id_fk2` FOREIGN KEY (`u_id`) REFERENCES `user_recipesearcher` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,'test','asdf',4);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_recipesearcher`
--

DROP TABLE IF EXISTS `user_recipesearcher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_recipesearcher` (
  `ID` char(45) NOT NULL,
  `pswd` char(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_recipesearcher`
--

LOCK TABLES `user_recipesearcher` WRITE;
/*!40000 ALTER TABLE `user_recipesearcher` DISABLE KEYS */;
INSERT INTO `user_recipesearcher` VALUES ('',''),('a','a'),('anothertest','tester'),('test','test'),('test2','a'),('testa','test'),('tester','tester');
/*!40000 ALTER TABLE `user_recipesearcher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'recipesearcher'
--
/*!50003 DROP PROCEDURE IF EXISTS `addedit_cookware` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addedit_cookware`(cookw json, rnum smallint(11))
BEGIN
	declare counter int;
    declare endind int;
    set counter = 0;
    delete from cookware_used
    where r_no = rnum;
   
    select json_extract(cookw, '$.cookware') into @ar;
    set endind = json_length(@ar);
    while counter < endind do
		insert into cookware_used(cookware, r_no)
        value (json_unquote(json_extract(@ar, concat('$[',counter,']'))), rnum);
        set counter = counter + 1;
    end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addedit_food` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addedit_food`(foodname char(45), rnum smallint(11))
BEGIN
	insert into food(fname, r_no)
    value (foodname, rnum)
    on duplicate key update
    fname = foodname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addedit_ingredients` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addedit_ingredients`(ing_array json, rnum smallint(11))
BEGIN
    declare _ind int default 0;
    declare endind int;
    
    delete from consists_of_ing
    where recipe_no = rnum;
	
    select json_extract(ing_array, '$.ingredients') into @ai;
   
	set endind = json_length(@ai);

    while _ind < endind do
		insert into ingredients(iname, itype)
		value (json_unquote(json_extract(ing_array, concat('$[ ',`_ind`, ' ].ingredients'))),
				json_unquote(json_extract(ing_array, concat('$[',`_ind`, '].ingType'))))
		on duplicate key update
		itype = json_unquote(json_extract(ing_array, concat('$[',`_ind`, '].ingType')));
	
		insert into consists_of_ing(ing_name, amount, recipe_no)
		value (json_unquote(json_extract(ing_array, concat('$[',`_ind`, '].ingredients'))),
			json_unquote(json_extract(ing_array, concat('$[',`_ind`, '].ingAmount'))),
			rnum);
		set _ind = _ind + 1;
	end while;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `addedit_review` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `addedit_review`(r_no smallint(11), id char(45), review text, s smallint(5))
BEGIN
	insert into review(r_no, u_id, rating, stars)
    value (r_no, id, review, s)
    on duplicate key update
    rating = review, stars = s;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_favorites` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_favorites`(rnum smallint(11), id char(45))
BEGIN
	insert into favorites(user_id, r_no, f_name)
    values(id, rnum, (select fname
						from food
						where r_no = rnum))
	on duplicate key update
    user_id = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_foodtype` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_foodtype`(foodname char(45), foodtype char(45))
BEGIN
	insert into food_type(f_name, f_type)
    value (foodname, foodtype);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_recipe` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_recipe`(recipedata json, id varchar(45))
BEGIN
	declare rnum smallint(11);
    declare _ind int default 0;
    declare endind int;
    select json_extract(recipedata, '$.title') into @title;
    select json_extract(recipedata, '$.foodType') into @ft;
    select json_extract(recipedata, '$.title') into @fn;
    select json_extract(recipedata, '$.timeTake') into @tt;
    select json_extract(recipedata, '$.steps') into @step;
    
    set endind = json_length(@ft);
    
	insert into recipe(user_id, rname, time_taken, directions)
    values (id,	@title,	@tt, @step);
   
    set rnum = (select MAX(NUM)
					from recipe);
     
    call addedit_food (@fn, rnum); 
    while _ind < endind do
		call add_foodtype(@fn, json_unquote(json_extract(recipedata, concat('$[',`_ind`, '].foodType'))));
		set _ind = _ind + 1;
    end while;
    
	
    call addedit_ingredients(recipedata, rnum);
    call addedit_cookware(recipedata, rnum);
      
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(p_username char(45), p_pass char(45))
BEGIN
	declare numuser int;
    
	select count(ID) into numuser 
    from user_recipesearcher
    where ID = p_username;
    
    if numuser < 1
    then 
        insert into user_recipesearcher(ID, pswd)
        values(p_username, p_pass);
	end if;
    
    select case when
    count(id) = 1
		then 'false'
		else 'true'
		end as userexists
    from user_recipesearcher
    where ID = p_username;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_recipe` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `delete_recipe`(rno smallint(11), id char(45))
BEGIN
	delete from recipe
    where NUM = rno AND user_id = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_review` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `delete_review`(rno smallint(11), id char(45))
BEGIN
	delete from review
    where r_no = rno 
		AND
        u_id = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `edit_recipe` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_recipe`(recipedata json, rnum smallint(11))
BEGIN
    declare _ind int default 0;
    declare endind int;
    select json_extract(recipedata, '$.title') into @title;
    select json_extract(recipedata, '$.foodType') into @ft;
    select json_extract(recipedata, '$.title') into @fn;
    select json_extract(recipedata, '$.timeTake') into @ft;
    select json_extract(recipedata, '$.steps') into @step;
    set endind = json_length(@ft);
	
    update recipe
    set rname = json_extract(@ai, concat('$["',`0`, '"].title')),
		time_taken = json_extract(@ai, concat('$[',`0`, '].timetaken')),
        directions = json_extract(@ai, concat('$[',`0`, '].steps'))
	where NUM = rnum;
		
		
    call addedit_food (json_extract(@fn, concat('$[',`0`, '].foodname'), rnum));
	
    call addedit_ingredients(recipedata, rnum);
    call addedit_cookware(recipedata, rnum);
    
    delete from food_type
    where f_name = json_extract(@fn, concat('$[',`0`, '].foodname'));
    
    while _ind < endind do
		call add_foodtype(json_extract(@fn, concat('$[',`0`, '].foodname')),
							json_extract(@ft, concat('$[',`_ind`, '].foodType')));
    end while;
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_full_recipe` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `get_full_recipe`(rnum smallint(11),id varchar(45))
BEGIN
	select *
    from recipe
    where NUM = rnum;
    
    select cookware
    from cookware_used
    where r_no = rnum;
    
    select f_type
    from food_type
    where f_name in (select fname
					from food
					where r_no = rnum);
    
    select ing_name, amount, ingredients.itype
    from (consists_of_ing join ingredients on consists_of_ing.ing_name = ingredients.iname)
    where consists_of_ing.recipe_no = rnum;
    
    select case when count(user_id)=1
		then 'true'
		else 'false'
		end as bool
    from favorites
    where user_id = id 
		AND
        r_no = rnum;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_review` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_review`(rnum smallint(11))
BEGIN
	select u_id as author, rating as description, stars as point
    from review
    where r_no = rnum;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `log_in` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `log_in`(p_id char(45), p_pswd char(45))
BEGIN
	select case when
    count(ID) = 1
    then 'true'
    else
    'false'
    end as userexists
    from user_recipesearcher
    where ID = p_id
		AND
			pswd = p_pswd;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `remove_favorites` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `remove_favorites`(id char(45), rnum smallint(11))
BEGIN
	delete from favorites
    where user_id = id AND r_no = rnum;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `remove_ingredient` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `remove_ingredient`(rnum smallint(11), ingname varchar(45))
BEGIN
	delete from consists_of_ing
    where recipe_no = rnum 
		AND
        ing_name = ingname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_cookware` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_cookware`(cookw json)
BEGIN
	declare counter int;
    declare endind int;
    set counter = 0;
    create temporary table temp as
    select cookware from cookware_used where cookware = '';
    select json_extract(cookw, '$.cookware') into @ar;
    set endind = json_length(@ar);
    while counter < endind do
		insert into temp(cookware)
        value (json_extract(@ar, concat('$[',counter,']')));
        set counter = counter + 1;
    end while;
    
    
    select NUM, rname as title, user_id as username
    from recipe 
    where NUM in (select r_no
					from cookware_used
                    where cookware in (select *
										from temp));
	drop temporary table temp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_favorites` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `search_favorites`(id char(45))
BEGIN
	select NUM, rname as title, user_id as username
    from recipe
    where NUM IN (select r_no
					from favorites
					where user_id = id);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_food` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_food`(aname char(45))
BEGIN
	select NUM, rname as title, user_id as username
    from recipe as R
    where NUM IN (select r_no
					from food
                    where fname = aname);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_foodtype` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_foodtype`(ftype json)
BEGIN
	declare counter int;
    declare endind int;
    set counter = 0;
    create temporary table temp as
    select f_type from food_type where f_type = '';
    select json_extract(ftype, '$.foodtype') into @aft;
	set endind = json_length(@aft);
    while counter < endind do
		insert into temp
        value (json_extract(@aft, concat('$[',counter,']')));
        set counter = counter + 1;
    end while;
    
    
    select NUM, rname as title, user_id as username
    from recipe 
    where NUM in (select r_no
					from food
                    where fname IN (select f_name
								from food_type
								where f_type in (select *
													from temp)));
	drop temporary table temp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_ingredient` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `search_ingredient`(ing_list json)
BEGIN
	declare counter int;
    declare endind int;
    set counter = 0;
    create temporary table temp as
    select iname from ingredients where iname = '';
    select json_extract(ing_list, '$.ingredients') into @ar;
	set endind = json_length(@ar);
    while counter < endind do
		insert into temp
        value (json_extract(@ar, concat('$[',counter,']')));
        set counter = counter + 1;
    end while;
    
    
    select NUM, rname as title, user_id as username
    from recipe 
    where NUM in (select recipe_no
					from consists_of_ing
                    where ing_name in (select *
										from temp));
	drop temporary table temp;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_recipe` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `search_recipe`(rn char(45))
BEGIN
	select NUM, rname as title, user_id as username
    from recipe 
    where rname = rn;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sally`@`%` PROCEDURE `search_user`(userid char(45))
BEGIN
	select NUM, rname as title, user_id as username
    from recipe
    where user_id = userid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-05  2:55:03
