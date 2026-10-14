import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: ['req.headers.cookie', 'req.headers.authorization'],
});

export default logger;
