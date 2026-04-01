const express = require('express');
const app = express();

app.use(express.json());

// DB
const sequelize = require('./config/db');

// Models
const User = require('./models/user');
const Record = require('./models/task');

// Relationships
User.hasMany(Record);
Record.belongsTo(User);

// Routes
const authRoutes = require('./routes/authroutes');
const recordRoutes = require('./routes/taskroutes');

app.use('/auth', authRoutes);
app.use('/records', recordRoutes);

app.get('/', (req, res) => {
  res.send("Backend Running");
});

// DB connect + sync
sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

sequelize.sync()
  .then(() => console.log("Tables synced"));

// Global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});