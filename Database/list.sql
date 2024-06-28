CREATE SCHEMA `list` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `list`.`users` (
  `idusers` BINARY(16) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `list`.`roles` (
  `idroles` INT NOT NULL AUTO_INCREMENT,
  `Rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idroles`),
  UNIQUE INDEX `idroles_UNIQUE` (`idroles` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


INSERT INTO `list`.`roles` (`idroles`, `Rol`) VALUES ('1', 'admin');
INSERT INTO `list`.`roles` (`idroles`, `Rol`) VALUES ('2', 'user');
INSERT INTO `list`.`roles` (`idroles`, `Rol`) VALUES ('3', 'shopper');
INSERT INTO `list`.`roles` (`Rol`) VALUES ('');

CREATE TABLE `list`.`providers` (
  `idproviders` INT NOT NULL AUTO_INCREMENT,
  `provider` VARCHAR(45) NOT NULL,
  `DIT` INT NOT NULL,
  `address` VARCHAR(45) NULL,
  `local` VARCHAR(45) NULL,
  PRIMARY KEY (`idproviders`),
  UNIQUE INDEX `DIT_UNIQUE` (`DIT` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;



CREATE TABLE `list`.`products` (
  `idProducts` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `formato` VARCHAR(45) NULL,
  `Formato_de_venta` VARCHAR(45) NULL DEFAULT 'Libra',
  PRIMARY KEY (`idProducts`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
