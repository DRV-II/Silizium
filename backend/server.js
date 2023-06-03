// =================================================
// Requirements
// ================================================================================
const { createClient } = require("redis");
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passportLocal = require('passport-local');
const speakeasy = require("speakeasy");
const qrCode = require("qrcode");
const cors = require("cors");
const responseTime = require("response-time");
require('dotenv').config();

// =================================================
// Database queries
// ================================================================================

const {getUser, getUsers, setUser, deleteUser, activeUser, search, saveKey, checkKey, getAll, bookmark, getBookmark, deleteBookmark, getCertificationsFromUser} = require('./database.js');

// Redis -----------------------
const client = createClient();
// Connecting to redis
async function connectRedis() {

    client.on('error', err => console.log('Redis Client Error', err));

    await client.connect();
}
connectRedis();
// -------------------------------

// =================================================
// Encryption
// ================================================================================

const { encryptPassword, matchPassword } = require('./lib/helpers');

// =================================================
// Settings
// ================================================================================

const app = express();
const port = 5000; // 6379

app.use(responseTime());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.PARSER_SECRET));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// =================================================
// Passport
// ================================================================================

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(
    function(username, password, done) {
        try {
            getUser(username).then(async (user) => {
                if(user){
                    if(user.role === process.env.USER_DELETED){
                        console.log("User not found");
                        return done(null, false);
                    }
                    const validPassword = await matchPassword(password, user.password);
                    if (validPassword) {
                        console.log("User found");
                        return done(null, user);
                    }
                }
                console.log("User not found");
                return done(null, false);
            });
        }
        catch(error){
            console.log(error);
            return done(error);
        }   
    }
));

passport.serializeUser(function(user,done){
    done(null, user.uid);
});

passport.deserializeUser(async function(uid,done){
    getUser(uid).then((user) => {
        done(null, user);
    }); 
});

// =================================================
// Auth middlewares
// ================================================================================

// Ensure user logged in
function userLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next(); // Only users can continue
    }
    else {
        res.status(401).send('Unauthorized');
    }
}

// Validate double verification
function totpVerification(req, res, next) {
    try {
        // Retrieve user from database
        checkKey(req.user.uid).then((user)=>{
            if (user.secret != process.env.USER_NULL && user.verified === process.env.USER_VERIFIED) {
                const { token } = req.body;
                const secret = user.secret;
                const verified = speakeasy.totp.verify({
                    secret,
                    encoding: 'base32',
                    token
                });

                if (verified) {
                    return next();
                } else {
                    res.status(401).send('Unauthorized');
                }
            }
            else {
                res.status(200).send({ verified: "Not yet verified"});
            }
        });
    }
    catch(error){
        res.status(500).send({ response: 'Internal Server Error' });
    }
}

// Ensure second factor
function ensureSecondFactor(req, res, next) {
    checkKey(req.user.uid).then((user)=>{
        if (user.secret != process.env.USER_NULL && user.verified === process.env.USER_VERIFIED) {
            if (req.session.authFactors == 'totp') {
                console.log("We double auth"); 
                return next(); 
            }
            else {
                res.status(401).send('Unauthorized');
            }
        }
        else {
            console.log("Double auth not set"); 
            return next(); 
        }
  });
}

// =================================================
// Routes
// ================================================================================

// Double Verification <--------------
app.post('/verify-otp', userLoggedIn, totpVerification,
  function(req, res) {
    req.session.authFactors = [ 'totp' ];
    res.status(200).send({response: "Ok"});
});

// Two factor setup <-----------------
app.post('/tfsetup', userLoggedIn, ensureSecondFactor, function(req, res){
    try {
        checkKey(req.user.uid).then((user)=>{
            // User already verified
            if (user.secret != process.env.USER_NULL && user.verified === process.env.USER_VERIFIED) {
                qrCode.toDataURL(user.qrurl, function(err, data) {
                    if (err) {
                        console.log("No proporciona");
                        res.status(500).send({ response: 'Internal Server Error' });
                    }
                    else {
                        console.log("Si proporciona");
                        res.status(200).send({ response: "Ok", qrCode: data, secret: user.secret});
                    }
                });
            }
            // User hasn't setup two factor
            else {
                // new two-factor setup.  generate and save a secret secret
                const secret = speakeasy.generateSecret({
                    name: "IBM_Dashboard"
                });
                
                qrCode.toDataURL(secret.otpauth_url, function(err, data) {
                    if (err) {
                        console.log("No hace setup");
                        res.status(500).send({ response: 'Internal Server Error' });
                    }
                    else {
                        saveKey(req.user.uid, secret.base32, secret.otpauth_url, process.env.USER_NOT_VERIFIED).then((success) => {
                            if (success) { 
                                console.log("Hace setup");
                                res.status(200).send({ response: "Ok", qrCode: data, secret: secret.base32});
                            }
                            else {
                                console.log("No hace setup");
                                res.status(500).send({ response: "Internal Server Error" });
                            }
                        });
                    } 
                });
            }
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
});


// We verify just before topt setup
app.post("/verify", userLoggedIn, (req,res,next) => {
    try {
        // Retrieve user from database
        checkKey(req.user.uid).then((user)=>{
            if (user.secret != process.env.USER_NULL && user.verified === process.env.USER_NOT_VERIFIED) {
                const { token } = req.body;
                const secret = user.secret;
                const verified = speakeasy.totp.verify({
                    secret,
                    encoding: 'base32',
                    token
                });

                if (verified) {
                    // Update user data
                    saveKey(req.user.uid, user.secret, user.qrurl, process.env.USER_VERIFIED).then((success)=>{
                        if (success){
                            return next(); // We continue to assign user two factor confirmation
                        }
                        else {
                            res.status(500).send({ verified: false});
                        }
                    });
                } else {
                    // Update user data
                    saveKey(user.uid, process.env.USER_NULL, process.env.USER_NULL, process.env.USER_NOT_VERIFIED).then((success)=>{
                        if (success){
                            res.status(200).send({ verified: false});
                        }
                        else {
                            res.status(500).send({ verified: false});
                        }
                    });
                }
            } else {
                res.status(200).send({ verified: "Already verified"});
            }
        });
    } 
    catch(error) {
        console.error(error);
        res.status(500).send({ message: 'Error retrieving user'});
    }
}, function(req, res) {
    req.session.authFactors = [ 'totp' ];
    res.status(200).send({response: "Ok"});
});


// Login
app.post('/login', (req, res, next) => {
    if(req.isAuthenticated()){
        res.status(200).send('Ok'); // If it's already logged in
    }
    else {
        return next(); // We continue if not
    }
}, passport.authenticate('local'),
function(req, res) {
    res.status(200).send({ response: 'Ok' }); // We return Ok if we log in
});

// Logout
app.post('/logout', (req, res, next) => {
    if(req.isAuthenticated()){
        return next(); // If i't authenticated it may continue
    }
    else {
        res.status(200).send('Ok'); // If it's already logged off we stop him there
    }
}, function(req, res, next){ // We use passport logout
    req.logout(function(err) {
      if (err) { return next(err); }
        req.session.authFactors = [ '' ];
        res.status(200).send('Ok');
    });
  });

// Register 
app.post('/register', userLoggedIn, ensureSecondFactor, async (req, res) => {
    try {
        // If user is authorized to modify table
        if (req.user.role === process.env.USER_POWER) {
            console.log("Enter register");
            const password = await encryptPassword(req.body.password);
            console.log("Encrypt password");
            // Verify if user already exists
            getUser(req.body.username).then((user) => {
                console.log("We search user");
                console.log(req.body.username);
                console.log(user);
                if(user){
                    console.log("We get user");
                    if(user.role === process.env.USER_DELETED){
                        activeUser(req.body.username, password).then((success)=>{
                            if(success){
                                res.status(201).send({ response: 'Created'});
                            }
                            else{
                                res.status(500).send({ response: 'Internal Server Error' });
                            }
                        });
                    }
                    else {
                        res.status(200).send({ response: 'Already created'});
                    }
                }
                else{
                    console.log("Setting new user");
                    // We add new user
                    setUser(req.body.username, password).then((success)=>{
                        if (success) {
                            res.status(201).send({ response: 'Created' });
                        }
                        else {
                            res.status(500).send({ response: 'Internal Server Error' });
                        }
                    });
                }
            });
            
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
});

// Delete
app.post('/delete', userLoggedIn, ensureSecondFactor, async (req, res) => {
    try {
        // If user is authorized to modify table and different from itself
        if (req.user.role === process.env.USER_POWER && req.body.username != req.user.uid) {
            // We update table
            deleteUser(req.body.username).then((success)=>{
                if(success){
                    res.status(201).send({ response: 'User deleted' });
                }
                else{
                    res.status(500).send({ response: 'Internal Server Error '});
                }
            });
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
    catch(error){
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
});

// Get search
app.post('/search', userLoggedIn, ensureSecondFactor, async (req,res) => {
    try {
        const searchInput = '%' + req.body.searchText + '%';
        search(req.user.uid , searchInput).then((results)=>{
            if (results) {
                res.status(200).send(results);
            }
            else {
                res.status(200).send({});
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
    
});

// Get logged in check
app.get('/login', (req,res) => {
    if (req.isAuthenticated()) {
        res.status(200).send(true);
    }
    else {
        res.status(401).send(false);
    }
});

// Get double auth check
app.get('/verify-otp', (req,res) => {
    if (req.session.authFactors == 'totp') {
        res.status(200).send(true);
    }
    else {
        res.status(401).send(false);
    }
});

// Get Users
app.get('/users', userLoggedIn, ensureSecondFactor, async (req,res) => {
    res.send(await getUsers());
});

// Test
app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Get All
app.get('/general', userLoggedIn, ensureSecondFactor, async (req,res) => {
    try {
        console.log("general");
        // Search Data in Redis
        const reply = await client.get("general");
        // if exists returns from redis and finish with response
        if (reply) {
            console.log("Redis returns");
            return res.status(200).send(JSON.parse(reply));
        }

        // Fetching Data from Database
        getAll(req.user.uid).then(async (response)=>{
            if (response){
                // Saving the results in Redis. The "EX" and 10, sets an expiration of 10 Seconds
                const saveResult = await client.set(
                    "general",
                    JSON.stringify(response),
                    {
                    EX: 10,
                    }
                );
                console.log(saveResult)
            
                // resond to client
                res.status(200).send(response);
            }
            else {
                res.status(400).send("Error");
            }     
        });
        //res.status(200).send();
    }
    catch(error){
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
});

// Get Bookmarks
app.get('/get-bookmarks', userLoggedIn, ensureSecondFactor, async (req,res) => {
    try {
        console.log("bookmarks");
        // Search Data in Redis
        const reply = await client.get("bookmarks");
        // if exists returns from redis and finish with response
        if (reply) {
            console.log("Redis returns");
            return res.status(200).send(JSON.parse(reply));
        }
        //res.status(200).send(await getBookmark(req.user.uid));
        // Fetching Data from Database
        getBookmark(req.user.uid).then(async (response)=>{
            if (response){
                // Saving the results in Redis. The "EX" and 10, sets an expiration of 10 Seconds
                const saveResult = await client.set(
                    "bookmarks",
                    JSON.stringify(response),
                    {
                    EX: 10,
                    }
                );
                console.log(saveResult)
            
                // resond to client
                res.status(200).send(response);
            }
            else {
                res.status(400).send("Error");
            }     
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
});

// Uncheck bookmark
app.delete('/unbook', userLoggedIn, ensureSecondFactor, async (req,res) => {
    try {
        deleteBookmark(req.body.employee, req.user.uid, req.body.certificate).then((results) =>{
            if (results) {
                res.status(200).send({ response: 'Ok' });
            }
            else {
                res.status(500).send({ response: 'Internal Server Error' });
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
});

// Check bookmark
app.post('/check', userLoggedIn, ensureSecondFactor, async (req,res) => {
    try {
        bookmark(req.user.uid, req.body.employee, req.body.certificate).then((results) =>{
            if (results) {
                res.status(200).send({ response: 'Ok' });
            }
            else {
                res.status(500).send({ response: 'Internal Server Error' });
            }
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
});

// Get All Certifications from Users
app.get('/certifications', userLoggedIn, ensureSecondFactor, async (req,res) => {
    try {
        console.log("certifications");
        // Search Data in Redis
        const reply = await client.get("certifications");
        // if exists returns from redis and finish with response
        if (reply) {
            console.log("Redis returns");
            return res.status(200).send(JSON.parse(reply));
        }
        //res.status(200).send(await getCertificationsFromUser(req.user.uid, req.body.employee));
        // Fetching Data from Database
        getCertificationsFromUser(req.user.uid, req.body.employee).then(async (response)=>{
            if (response){
                // Saving the results in Redis. The "EX" and 10, sets an expiration of 10 Seconds
                const saveResult = await client.set(
                    "certifications",
                    JSON.stringify(response),
                    {
                    EX: 10,
                    }
                );
                console.log(saveResult)
            
                // resond to client
                res.status(200).send(response);
            }
            else {
                res.status(400).send("Error");
            }     
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({ response: 'Internal Server Error' });
    }
});

// Port listening
app.listen(port, () => {
    console.log('IBM server listening on port ' + port)
});

//TODO: 'DELETE' (REALMENTE ES UN UPDATE) a los usuarios "COMPLETE"
//TODO: 'cambio de password' PROBABLEMENTE
//TODO: 'en el login verificar si el usuario ya esta eliminado' "COMPLETE"
//TODO: 'en caso de volver a registrar un usuario ya borrado hacer update al status' "COMPLETE"
//TODO: 'QUERYS RELACIONADAS AL EXCEL' (EN CURSO)
//TODO: 'DOBLE AUTENTIFICACION' "COMPLETE"
//TODO: 'BUSCADOR (ENDPOINT-QUERY BUSCADOR)' "COMPLETE"