-- Created by Redgate Data Modeler (https://datamodeler.redgate-platform.com)
-- Last modification date: 2025-12-23 21:24:09.269

-- Table: Uzytkownik
CREATE TABLE Uzytkownik
(
    ID       integer      NOT NULL
        CONSTRAINT Uzytkownik_pk PRIMARY KEY AUTOINCREMENT,
    Imie     varchar(50)  NOT NULL,
    Nazwisko varchar(50)  NOT NULL,
    Email    varchar(50)  NOT NULL,
    Haslo    varchar(255) NOT NULL,
    CONSTRAINT email UNIQUE (Email)
);

-- Table: Waluta
CREATE TABLE Waluta
(
    ID     integer        NOT NULL
        CONSTRAINT Waluta_pk PRIMARY KEY AUTOINCREMENT,
    Nazwa  varchar(20)    NOT NULL,
    Symbol varchar(10)    NOT NULL,
    Kurs   decimal(18, 8) NOT NULL,
    CONSTRAINT nazwa_unique UNIQUE (Nazwa),
    CONSTRAINT symbol_unique UNIQUE (Symbol)
);

-- Table: Portfel
CREATE TABLE Portfel
(
    ID            integer        NOT NULL
        CONSTRAINT Porfel_pk PRIMARY KEY AUTOINCREMENT,
    Waluta_ID     integer        NOT NULL,
    Uzytkownik_ID integer        NOT NULL,
    Saldo         decimal(18, 8) NOT NULL,
    Data_otwarcia TEXT           NOT NULL,
    CONSTRAINT Porfel_unique UNIQUE (Waluta_ID, Uzytkownik_ID),
    CONSTRAINT Porfel_Uzytkownik FOREIGN KEY (Uzytkownik_ID)
        REFERENCES Uzytkownik (ID) ON DELETE CASCADE,
    CONSTRAINT Porfel_Waluta FOREIGN KEY (Waluta_ID)
        REFERENCES Waluta (ID) ON DELETE CASCADE
);

