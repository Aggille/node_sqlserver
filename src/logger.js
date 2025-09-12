//logger.js
const winston = require("winston");
const { WinstonRotatingFile } = require("winston-rotating-file");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "info.log", level: "info" }),
    new winston.transports.File({
      filename: "error.log",
      maxsize: 1024 * 1024 * 10,
      maxFiles: 1,
      tailable: true,
    }),
    new winston.transports.File({
      filename: "info.log",
      maxsize: 1024 * 1024 * 10,
      maxFiles: 1,
      tailable: true,
    }),

    new WinstonRotatingFile({
      filename: "info.log",
      rfsOptions: { size: "500M", maxFiles: 1, path: "logs" },
    }),

    new WinstonRotatingFile({
      filename: "error.log",
      rfsOptions: { size: "500M", maxFiles: 1, path: "logs" },
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = logger;
