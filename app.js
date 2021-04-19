let express = require('express');
let helmet = require('helmet');
let cors = require('cors')
let path = require('path');
let fs = require('fs');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
let config = require("./config");
let useragent = require('express-useragent');

let indexRouter = require('./routes/index')();
process.env.TZ = 'Europe/Istanbul';
let app = express();

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

app.use(helmet());
app.use(cors({
    origin: config.frontendURL, //whitelist
    methods: ["GET"], //available methods
    allowedHeaders: ['content-type', 'x-access-token']
}));
app.use(logger('dev', {stream: accessLogStream}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/build')));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(useragent.express());

app.use('/api', indexRouter);
app.use(function (req, res) {
    res.status(404).sendFile(path.join(__dirname + '/staticpagetemplates/error_page_400.html'));
});

mongoose.set('useCreateIndex', true);
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 300000,
    keepAlive: true,
    useFindAndModify: false
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected to db at:", new Date());
});

module.exports = app;
