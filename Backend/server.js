require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const redisClient = require('./config/redis');
const rateLimiter = require('./middleware/rateLimiter');
const authRoutes = require('./routes/authRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "Analytics API", version: "1.0.0" },
    },
    apis: ["./routes/*.js"], // Path to your route files
  };

  const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

app.use(rateLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
