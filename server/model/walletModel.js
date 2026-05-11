const connect = require('./database/db_connect')
async function getWalletsPagination(page=1, pageSize=5){
    const db = await connect();
    const result = await db.get("SELECT COUNT(*) AS count FROM PORTFEL")
    const offset=(page-1)*pageSize
    const wallets = await  db.all(`
        SELECT
            P.ID AS portfel_id,
            CONCAT(U.IMIE, ' ',U.NAZWISKO) AS uzytkownik,
            W.NAZWA AS waluta,
            P.SALDO AS saldo,
            P.DATA_OTWARCIA AS data_otwarcia
        FROM PORTFEL P
                 JOIN UZYTKOWNIK U ON P.UZYTKOWNIK_ID = U.ID
                 JOIN WALUTA W ON P.WALUTA_ID = W.ID
    LIMIT ? OFFSET ? `, pageSize, offset);
    return {wallets, total: result.count}
}
async function getAllWallets(){
    const db = await connect();
    return db.all(`
        SELECT
            P.ID AS portfel_id,
            CONCAT(U.IMIE, ' ',U.NAZWISKO) AS uzytkownik,
            W.NAZWA AS waluta,
            P.SALDO AS saldo,
            P.DATA_OTWARCIA AS data_otwarcia
        FROM PORTFEL P
                 JOIN UZYTKOWNIK U ON P.UZYTKOWNIK_ID = U.ID
                 JOIN WALUTA W ON P.WALUTA_ID = W.ID
    `);
}
async function getWallet(id){
    const db = await connect();
    return db.get(`
        SELECT
            P.ID AS portfel_id,
            P.SALDO AS saldo,
            P.DATA_OTWARCIA AS data_otwarcia,
            P.UZYTKOWNIK_ID AS Uzytkownik_ID,
            CONCAT(U.IMIE, ' ',U.NAZWISKO) AS uzytkownik,
            U.EMAIL AS email,
            P.WALUTA_ID AS Waluta_ID,
            W.NAZWA AS nazwa,
            W.SYMBOL AS symbol,
            W.KURS AS kurs
            
        FROM PORTFEL P
                 JOIN UZYTKOWNIK U ON P.UZYTKOWNIK_ID = U.ID
                 JOIN WALUTA W ON P.WALUTA_ID = W.ID
        WHERE P.ID=?
    `, id);
}
async function createWallet(waluta_id, uzytkownik_id,saldo,data_otwarcia){
    const db = await connect();
    return db.run("INSERT INTO PORTFEL(Waluta_ID, Uzytkownik_ID, Saldo, Data_otwarcia) VALUES (?,?,?,?)", waluta_id, uzytkownik_id, saldo, data_otwarcia);
}

async function deleteWallet(id){
    const db= await connect();
    return db.run("Delete from PORTFEL WHERE ID=?", id)
}

async function getWalletsUser(user_id){
    const db = await connect();
    return db.all(`SELECT
    P.ID AS portfel_id,
    W.NAZWA AS waluta,
    P.SALDO AS saldo,
    P.DATA_OTWARCIA AS data_otwarcia
    FROM PORTFEL P
    JOIN UZYTKOWNIK U ON P.UZYTKOWNIK_ID = U.ID
    JOIN WALUTA W ON P.WALUTA_ID = W.ID
    WHERE P.UZYTKOWNIK_ID=?`, user_id)
}
async function getWalletsCurrency(currency_id){
    const db = await connect();
    return db.all(`SELECT
    P.ID AS portfel_id,
    CONCAT(U.IMIE, ' ',U.NAZWISKO) AS uzytkownik,
    P.SALDO AS saldo,
    P.DATA_OTWARCIA AS data_otwarcia
    FROM PORTFEL P
    JOIN UZYTKOWNIK U ON P.UZYTKOWNIK_ID = U.ID
    JOIN WALUTA W ON P.WALUTA_ID = W.ID
    WHERE P.WALUTA_ID=?`, currency_id)
}
async function updateWallet(user_id, currency_id, amount, date, id){
    const db = await connect();
    return db.run("UPDATE PORTFEL SET UZYTKOWNIK_ID=?, WALUTA_ID=?, SALDO=?, DATA_OTWARCIA=? WHERE ID=?", user_id, currency_id, amount, date, id);
}


module.exports = {getAllWallets, getWallet, createWallet, deleteWallet, getWalletsUser, getWalletsCurrency, updateWallet, getWalletsPagination}