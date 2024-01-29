const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session')
app.use(express.json());
app.use(require('./routes'));

const {initialaizingPassportJWT} = require('./config/passportJwt');
initialaizingPassportJWT();
app.listen(process.env.port || "5000");



//<!---Used for only Web Session---!>
//const {initialaizingPassportLocal} = require('./config/passport-local');
//initialaizingPassportLocal(passport);

// app.use(session({
//     secret: "secret",
//     resave: false ,
//     saveUninitialized: true ,
//   }))
// app.use(passport.initialize());
// app.use(passport.session());
