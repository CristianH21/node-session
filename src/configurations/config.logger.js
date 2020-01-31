const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger =  createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        customFormat
    ),
    transports: [
        new transports.File({
            level: 'error',
            filename: `${__dirname}/../logs/error.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
        }),
        new transports.File({
            level: 'info',
            filename: `${__dirname}/../logs/info.log`,
            handleExceptions: true,
            json: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            colorize: false,
        }),
        new transports.Console({
            handleExceptions: true,
            json: true,
            colorize: true
        })
    ],
    exitOnError: false
});


module.exports = logger;