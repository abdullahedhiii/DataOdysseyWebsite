const express = require('express');
const app = express();
const cors = require('cors');
const authentication = require('./middlewares/authenticate');
const userRoutes = require('./routes/user.routes');
const competitionRoutes = require('./routes/competition.routes')
const PORT = process.env.PORT || 3000;

app.use(express.json());
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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
