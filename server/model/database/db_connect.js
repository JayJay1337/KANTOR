const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path")


const fileDB = path.join(__dirname, 'Database.sqlite')
let db;
async function connect() {
    if(!db) {
        db = await sqlite.open({
            filename: fileDB,
            driver: sqlite3.Database
        });
    }
    await db.exec('PRAGMA FOREIGN_KEYS = ON')
    return db;
}
module.exports = connect;