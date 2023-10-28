// Import necessary modules
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv').config();

// Create an Express application
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.io instance attached to the HTTP server
const io = socketIO(server);

// Enable Cross-Origin Resource Sharing (CORS) for the specified origin
app.use(cors());

// Define a connection event handler for Socket.io
io.on('connection', (socket) => {
    // This function is called when a user connects to the server
    console.log("User is connected", socket.id);

    // Listen for 'draw' events sent by clients
    socket.on('draw', (data) => {
        // Send back the 'copy-draw' event to all connected clients
        socket.broadcast.emit('copy-draw', data);
    });

    // Listen for 'disconnect' events (when a user disconnects)
    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});

// Define the port to run the server on (use process.env.PORT if available, or 3000 by default)
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
