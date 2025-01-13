let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server, {
      cors: {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],  
        methods: ["GET", "POST"],
        credentials: true,  
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};