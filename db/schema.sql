DROP DATABASE IF EXISTS HistoryOf_FamousPeople;
CREATE database HistoryOf_FamousPeople;

USE HistoryOf_FamousPeople;

CREATE TABLE FamousPeople (
  id INT NOT NULL AUTO_INCREMENT,
  Full_Name VARCHAR(100) NOT NULL,
  Personality_Color VARCHAR(100) NOT NULL,
  ColorType_Strengths VARCHAR(255) NOT NULL,
  True_Color_Holiday_Gift_Ideas VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM FamousPeople;
-- where Personality_Color like 'Oran%';

