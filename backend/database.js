const mysql = require('mysql2');
require('dotenv').config();

// ---------------
//const pool = mysql.createPool(database);
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "dash",
    password: process.env.MYSQL_PASSWORD || "Password123#",
    database: process.env.MYSQL_DATABASE || "ibm_dashboard"
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_COONECTION_LOST") {
            console.error('DATABASE CONNECTION WAS CLOSED', err);
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("DATABASE HAS TO MANY CONNECTIONS", err);
        }
        if (err.code = "ECONNREFUSED") {
            console.error('DATABASE CONNECTION WAS REFUSED', err);
        }
    }

    else {
        if (connection) connection.release();
        console.log("DB is Connected");
        return;
    }
})

// Create promises from callbacks
pool.query = promisify(pool.query);
// -----------


// Get users
async function getUsers() {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        return rows;
    }
    catch(error) {
        console.log(error);
    }
    
}

// Get user by id
async function getUser(id) {
    try {
        const [rows] = await pool.query(
        `SELECT * 
        FROM users
        WHERE uid = ?`, [id]);
        return rows[0];
    }
    catch(error) {
        console.log(error);
    }
}

// Set a user
async function setUser(id, password) {
    try {
        const [rows] = await pool.query(
        `INSERT INTO users(uid, password)
        VALUES(?, ?)`, [id, password]);
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

async function deleteUser(id){
    try{
        const [rows] = await pool.query(
            `UPDATE users SET role = 'inactive', secret='NULL', qrurl='NULL', verified='no' WHERE uid = ?`, // Reset double auth
            [id]
        );
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

async function activeUser(id, password){
    try{
        const [rows] = await pool.query(
            `UPDATE users SET password = ?, role = 'manager' WHERE uid = ?`,
            [password, id]
        );
        return rows;
    }
    catch(error){
        console.log(error);
    }
}

async function search(id, searchText){
    try {
        const [rows] = await pool.query(
            `SELECT employees.uid AS id, name, org, work_location, certification, issue_date, type, IF(certification IN (SELECT certificate FROM bookmarks WHERE userUid = ?) AND employees.uid IN (SELECT employeeUid FROM bookmarks WHERE userUid = ?), 1, 0) AS bookmarked
            FROM employees INNER JOIN certifications 
            ON employees.uid = certifications.uid 
            WHERE employees.uid LIKE ? 
            OR name LIKE ? 
            OR org LIKE ? 
            OR work_location LIKE ? 
            OR certification LIKE ? 
            OR issue_date LIKE ? 
            OR type LIKE ?`,
            [id, id, searchText, searchText, searchText, searchText, searchText, searchText, searchText]
        );
        return rows;
    }
    catch(error){
        console.log(error);
    }
}

async function saveKey(id, secret, qrurl, verified) {
    try {
        const [rows] = await pool.query(
            `UPDATE users SET secret = ?, qrurl = ?, verified = ? WHERE uid = ?`,
            [secret, qrurl, verified, id]
        );
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

async function checkKey(id) {
    try {
        const [rows] = await pool.query(
        `SELECT secret, qrurl, verified 
        FROM users
        WHERE uid = ?`, [id]);
        return rows[0];
    }
    catch(error) {
        console.log(error);
    }
}

async function getAll(id) {
    try {
        const [rows] = await pool.query(
        `SELECT employees.uid AS id, name, org, work_location, certification, issue_date, type, IF(certification IN (SELECT certificate FROM bookmarks WHERE userUid = ?) AND employees.uid IN (SELECT employeeUid FROM bookmarks WHERE userUid = ?), 1, 0) AS bookmarked 
        FROM employees INNER JOIN certifications 
        ON employees.uid = certifications.uid`, [id, id]);
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

async function bookmark(id, eid, cert) {
    try {
        const [rows] = await pool.query(
        `INSERT INTO bookmarks (userUid, employeeUid, certificate)
        VALUES (?, ?, ?)`, [id, eid, cert]);
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

async function getBookmark(id) {
    try {
        const [rows] = await pool.query(
        `SELECT employees.uid AS id, name, org, work_location, certification, issue_date, type
        FROM employees INNER JOIN certifications 
        ON employees.uid = certifications.uid
        WHERE certification IN (SELECT certificate FROM bookmarks WHERE userUid = ?)
        AND employees.uid IN (SELECT employeeUid FROM bookmarks WHERE userUid = ?)`, [id,id]);
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

async function deleteBookmark(id, uid, cert) {
    try {
        const [rows] = await pool.query(
        `DELETE FROM bookmarks WHERE employeeUid=? AND userUid=? AND certificate=?`, [id, uid, cert]); // AND USER ID
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

// klnkgyvcvj
async function getCertificationsFromUser(id, eid) {
    try {
        const [rows] = await pool.query(
        `SELECT employees.uid AS id, name, org, work_location, certification, issue_date, type, IF(certification IN (SELECT certificate FROM bookmarks WHERE userUid = ?) AND employees.uid IN (SELECT employeeUid FROM bookmarks WHERE userUid = ?), 1, 0) AS bookmarked
        FROM employees INNER JOIN certifications 
        ON employees.uid = certifications.uid
        WHERE employees.uid = ?`, [id, id, eid]);
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

async function getCerData(){
    try{
        const [rows] = await pool.query(
        `SELECT certification, COUNT(*) AS cantidad FROM certifications GROUP BY certification ORDER BY cantidad DESC`);
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

//getUsers().then(console.log);
//getUser('1234567890QW').then(console.log);

module.exports = {getUser, getUsers, setUser, deleteUser, activeUser, search, saveKey, checkKey, getAll, bookmark, getBookmark, deleteBookmark, getCertificationsFromUser, getCerData};