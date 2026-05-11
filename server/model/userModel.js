const connect = require('./database/db_connect')

async function getAllUsers() {
    const db = await connect();
    return db.all("SELECT * FROM Uzytkownik")
}
async function getUsersPagination(page=1, pageSize=5){
    const db = await connect();
    const result = await db.get("SELECT COUNT(*) AS count FROM UZYTKOWNIK")
    const offset=(page-1)*pageSize
    const users = await db.all('SELECT * FROM UZYTKOWNIK LIMIT ? OFFSET ?', pageSize, offset);
    return {users, total: result.count}
}
async function getUser(id) {
    const db = await connect();
    return db.get('SELECT * FROM UZYTKOWNIK WHERE UZYTKOWNIK.ID=?', id);
}

async function deleteUser(id) {
    const db = await connect();
    return db.run('DELETE FROM UZYTKOWNIK WHERE UZYTKOWNIK.ID = ?', id)
}

async function createUser(name, surname, email, password) {
    const db = await connect();
    return db.run('INSERT INTO UZYTKOWNIK(imie, nazwisko, email, haslo) values(?,?,?,?)', name, surname, email, password)
}

async function updateUser(name, surname, email, password, id) {
    const db = await connect();
    return db.run('UPDATE Uzytkownik SET IMIE=?, NAZWISKO = ?, EMAIL = ?, HASLO = ? WHERE ID=?', name, surname, email, password, id)
}
async function loginUser(email){
    const db = await connect();
    return db.get("SELECT * FROM Uzytkownik WHERE Email=?", email)
}

module.exports = {deleteUser, createUser, getAllUsers, getUser, updateUser, loginUser, getUsersPagination};