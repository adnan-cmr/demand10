import { createClient } from "redis";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

// Validate Redis configuration
const validateRedisConfig = () => {
  if (!process.env.REDIS_URL) {
    logger.warn('REDIS_URL not found; using local Redis default');
  }
  return process.env.REDIS_URL || "redis://127.0.0.1:6379";
};

const redisUrl = validateRedisConfig();

const client = createClient({
  url: redisUrl,
});

client.on("error", (err) => {
  logger.error({ err }, "Redis client error");
  // Don't exit the process, just log the error
});

client.on("connect", () => {
  logger.info("Redis client connected");
});

client.on("ready", () => {
  logger.info("Redis client ready");
});

client.on("reconnecting", () => {
  logger.info("Redis client reconnecting");
});

client.on("end", () => {
  logger.info("Redis client connection ended");
});

async function connectRedis() {
  try {
    if (!client.isOpen) {
      await client.connect();
      logger.info("Redis connected successfully");
    } else {
      logger.info("Redis already connected");
    }
  } catch (err) {
    logger.error({ err }, "Failed to connect to Redis");
    // Don't exit the process, let the application continue without Redis
  }
}

export { client, connectRedis };