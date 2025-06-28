// Load environment variables
require('dotenv').config();

const app = require('./app');
const mongoose = require('mongoose');

// Server port
const PORT = process.env.PORT || 5000;

// Optional: Log the Mongo URI for debugging (REMOVE in production!)
console.log('Connecting to MongoDB at:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  
  // Start the server only after DB is connected
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
