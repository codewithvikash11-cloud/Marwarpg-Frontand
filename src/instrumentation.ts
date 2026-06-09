export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Only connect on the Node.js runtime since Mongoose is primarily designed for Node.
    // If you need Edge runtime DB access, consider using Edge-compatible drivers or REST APIs.
    try {
      console.log('Next.js server starting up... Initializing MongoDB connection.');
      const { connectToDatabase } = await import('./config/database');
      await connectToDatabase();
    } catch (err) {
      console.error('Failed to initialize MongoDB connection during server startup:', err);
    }
  }
}
