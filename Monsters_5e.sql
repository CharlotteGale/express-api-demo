CREATE DATABASE Monsters_5e;

USE Monsters_5e;

CREATE TABLE Monsters (
MonsterID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
CR varchar(10),
Name varchar(255) UNIQUE,
Type ENUM("Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Fey", "Fiend", "Giant", "Humanoid", "Monstrosity", "Ooze", "Plant", "Undead"),
Size ENUM("Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"),
Environ varchar(255)
);

INSERT INTO Monsters 
	(CR, Name, Type, Size, Environ)
VALUES
	(0, "Spider", "Beast", "Tiny", NULL),
    ("1/8", "Noble", "Humanoid", "Medium", "Urban"),
    ("1/4", "Axe Beak", "Beast", "Large", "Grassland & Hill"),
    ("1/2", "Warhorse Skeleton", "Undead", "Large", NULL),
    (1, "Giant Vulture", "Beast", "Large", "Desert & Grassland"),
    (2, "Sea Hag", "Fey", "Medium", "Coastal & Underwater"),
    (3, "Spectator", "Aberration", "Medium", "Underdark"),
    (4, "Incubus", NULL, "Medium", "Urban"),
    (5, "Unicorn", "Celestial", "Large", "Forest");

-- Monster to be inserted when creating a new monster
--  (6, "Drider", "Monstrosity", "Large", "Underdark");

-- Monster that has had information missed out on purpose
-- (4, "Incubus", "Fiend", "Medium", "Urban")