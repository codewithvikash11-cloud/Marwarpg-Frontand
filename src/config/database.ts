import mongoose from "mongoose";
import { envConfig } from "./env-config";

/**
 * Global caching for development hot-reloads
 */
declare global {
  var mongooseConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      // Automatic reconnection options
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const MONGODB_URI = envConfig.MONGODB_URI;

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB Connected Successfully");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB Connection Failed:", err.message);
      cached.promise = null; // Reset promise so we can try again on next request
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Global error handlers for connection after established (handles auto-reconnect logs)
if (mongoose.connection) {
  mongoose.connection.on("error", (err) => {
    console.error("MongoDB encountered an runtime error:", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected. Mongoose will automatically try to reconnect.");
  });
  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB connection automatically reconnected.");
  });
}
