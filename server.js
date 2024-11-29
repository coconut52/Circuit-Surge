const app = require('./app'); // Import the app from app.js

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the server for testing
module.exports = server;
