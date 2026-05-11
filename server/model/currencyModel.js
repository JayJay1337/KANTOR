const connect = require('./database/db_connect')
async function getAllCurrencies(){
    const db = await connect();
    return db.all('SELECT * FROM WALUTA');
}
async function getCurrenciesPagination(page=1, pageSize=5){
    const db = await connect();
    const result = await db.get("SELECT COUNT(*) AS count FROM WALUTA")
    const offset=(page-1)*pageSize
    const currencies = await db.all('SELECT * FROM WALUTA LIMIT ? OFFSET ?', pageSize, offset);
    return {currencies, total: result.count}
}
async function getCurrency(id){
    const db = await connect();
    return db.get('SELECT * FROM WALUTA WHERE ID = ?', id);
}
async function createCurrency(name, mark, rate){
    const db = await connect();
    return db.run('INSERT INTO WALUTA(Nazwa, Symbol, Kurs) VALUES(?,?,?)', name,mark,rate);
}
async function deleteCurrency(id){
    const db = await connect();
    return db.run('DELETE FROM WALUTA WHERE ID = ?', id)
}
async function updateCurrency(nazwa, symbol, kurs, id){
    const db = await connect();
    return db.run('UPDATE WALUTA SET NAZWA = ?, SYMBOL = ?, KURS= ? WHERE ID = ?', nazwa, symbol, kurs, id)
}



module.exports= {getAllCurrencies, getCurrency, deleteCurrency, createCurrency, updateCurrency,getCurrenciesPagination}