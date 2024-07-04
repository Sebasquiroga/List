CREATE SCHEMA `list` DEFAULT CHARACTER SET utf8 ;




CREATE TABLE `list`.`Roles` (
  `idRoles` INT NOT NULL AUTO_INCREMENT,
  `Rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRoles`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `list`.`Provider's` (
  `idProvider` INT NOT NULL AUTO_INCREMENT,
  `provider` VARCHAR(45) NOT NULL,
  `DIT` INT NOT NULL,
  `Address` VARCHAR(45) NULL,
  `Local` VARCHAR(15) NULL,
  PRIMARY KEY (`idProvider`),
  UNIQUE INDEX `DIT_UNIQUE` (`DIT` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;




CREATE TABLE `list`.`Products` (
  `idProducts` INT NOT NULL AUTO_INCREMENT,
  `Product` VARCHAR(45) NOT NULL,
  `Formato de compra` VARCHAR(15) NULL DEFAULT 'Bulto',
  `Formato de venta` VARCHAR(15) NULL DEFAULT 'libra',
  PRIMARY KEY (`idProducts`),
  UNIQUE INDEX `Product_UNIQUE` (`Product` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE `list`.`Tiendas` (
  `idTiendas` INT NOT NULL AUTO_INCREMENT,
  `Tienda` VARCHAR(25) NOT NULL,
  `address` VARCHAR(45) NULL,
  PRIMARY KEY (`idTiendas`),
  UNIQUE INDEX `Tienda_UNIQUE` (`Tienda` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE `list`.`users` (
  `idusers` BINARY(16) NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
  `username` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusers`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

ALTER TABLE `list`.`users` 
ADD COLUMN `password` VARCHAR(50) NOT NULL AFTER `username`,
ADD COLUMN `Tienda` INT NULL AFTER `password`,
ADD COLUMN `Rol` INT NULL DEFAULT 1 AFTER `Tienda`,
ADD INDEX `TiendaRelation_idx` (`Tienda` ASC) VISIBLE,
ADD INDEX `RolRelation_idx` (`Rol` ASC) VISIBLE;
;
ALTER TABLE `list`.`users` 
ADD CONSTRAINT `TiendaRelation`
  FOREIGN KEY (`Tienda`)
  REFERENCES `list`.`Tiendas` (`idTiendas`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
ADD CONSTRAINT `RolRelation`
  FOREIGN KEY (`Rol`)
  REFERENCES `list`.`Roles` (`idRoles`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

  INSERT INTO `list`.`Roles` (`idRoles`, `Rol`) VALUES ('1', 'general');
INSERT INTO `list`.`Roles` (`idRoles`, `Rol`) VALUES ('2', 'cajero');
INSERT INTO `list`.`Roles` (`idRoles`, `Rol`) VALUES ('3', 'comprador');
INSERT INTO `list`.`Roles` (`idRoles`, `Rol`) VALUES ('4', 'admin');
INSERT INTO `list`.`Roles` (`idRoles`, `Rol`) VALUES ('5', 'sudo');