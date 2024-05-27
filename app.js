require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
// rest of the packages
const morgan = require('morgan');
// security
const cors = require('cors');
// database
const connectDB = require('./db/connect');
// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// routes
const shippersRouter = require('./routes/shipper');
const ordersRouter = require('./routes/order');

app.use(cors());

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.send('<h1> Hkaya API </h1>');
});

app.use('/api/v1/shippers', shippersRouter);
app.use('/api/v1/orders', ordersRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(
        `Server is running on port ${port}\nhttp://localhost:${port}`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

start();
