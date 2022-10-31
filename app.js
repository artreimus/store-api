require('dotenv').config();
require('express-async-errors');

const port = process.env.PORT || 3000;
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
// async errors

const express = require('express');
const app = express();

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

// middlewares
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send(`<h1>Store API </h1><a href="/api/v1/products">products</a>`);
});

app.use('/api/v1/products', productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on Port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
