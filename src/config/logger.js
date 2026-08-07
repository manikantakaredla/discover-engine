import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'src', 'logs');

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const appLogStream = fs.createWriteStream(path.join(logDir, 'app.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logDir, 'error.log'), { flags: 'a' });
export const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), { flags: 'a' });

const formatMessage = (level, message) => {
  return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}\n`;
};

export const logger = {
  info: (message) => {
    const formatted = formatMessage('info', message);
    console.log(formatted.trim());
    appLogStream.write(formatted);
  },
  error: (message, error = null) => {
    const formatted = formatMessage('error', error ? `${message} - ${error.stack || error}` : message);
    console.error(formatted.trim());
    errorLogStream.write(formatted);
    appLogStream.write(formatted);
  },
  warn: (message) => {
    const formatted = formatMessage('warn', message);
    console.warn(formatted.trim());
    appLogStream.write(formatted);
  },
  debug: (message) => {
    const formatted = formatMessage('debug', message);
    console.debug(formatted.trim());
    appLogStream.write(formatted);
  }
};
