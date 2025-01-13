const express = require('express');
const cors = require('cors');
const authentication = require('./middlewares/authenticate');
const userRoutes = require('./routes/user.routes');
const competitionRoutes = require('./routes/competition.routes');
const cookieParser = require("cookie-parser");
const http = require('http');
const socket = require('./socket'); 
const PORT = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);
const io = socket.init(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(authentication);

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
    credentials: true,
  }));

app.use('/',userRoutes);
app.use('/',competitionRoutes);

app.get('/', (req, res) => {
    res.send('Hunt Data with data dungeon!');
});


io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
    
  
    socket.on('updateFileStatus', (email, newStatus) => {
      console.log(`Team email: ${email}, New file Status: ${newStatus}`);
      io.emit('statusUpdated', { email, newStatus });
    });
  
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
});
  
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
    } else {
        console.error('Server error:', err);
    }
});
