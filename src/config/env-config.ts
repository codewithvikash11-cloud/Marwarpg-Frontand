export const envConfig = {
  get MONGODB_URI() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env");
    }
    return uri;
  },
  get JWT_SECRET() {
    return process.env.JWT_SECRET || "";
  },
  get JWT_REFRESH_SECRET() {
    return process.env.JWT_REFRESH_SECRET || "";
  }
};
