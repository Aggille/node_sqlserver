const winston = require("winston");
const { printf, combine, timestamp, errors } = winston.format;
const DailyRotateFile = require("winston-daily-rotate-file");

const customFormat = printf(({ timestamp, level, message, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: combine(timestamp(), errors({ stack: true }), customFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/warn.log", level: "warn" }),
    new DailyRotateFile({
      filename: "logs/log-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      maxSize: "20m",
      maxFiles: "1d",
    }),
  ],
});

module.exports = logger;
