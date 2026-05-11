const fs = require('fs')
const path = require('path')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const fileDB = path.join(__dirname, 'Database.sqlite')
const create_DB = path.join(__dirname, 'TIN_db_create.sql')

async function initDB() {
    const sql = fs.readFileSync(create_DB, 'utf-8')

    const db = await sqlite.open({
       filename : fileDB,
       driver : sqlite3.Database
    });

    await db.exec(sql);
}

initDB()