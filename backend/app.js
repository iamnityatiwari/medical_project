// Load environment variables
require('dotenv').config(); // This automatically loads from `.env`

// External Modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Local Modules
const errorController = require("./controllers/errorController");
const doctorRoutes = require("./routers/doctorRoutes");
const appointmentRoutes = require("./routers/appointmentRoutes");
const userRoutes = require("./routers/userRoutes");
const chatRoutes = require("./routers/chatRoutes");

// MongoDB Connection String
 
const MONGO_DB_URL=  `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@sumantacoding.i9m25.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=SumantaCoding`;

// App Setup
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use("/api/doctor", doctorRoutes);
// Use the appointment routes
app.use("/api/appointments", appointmentRoutes);


app.use("/api/users", userRoutes);

app.use('/api/chat', chatRoutes);


// 404 Handler
app.use(errorController.get404);

// Start Server
const PORT = process.env.PORT || 3000;
mongoose.connect(MONGO_DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
