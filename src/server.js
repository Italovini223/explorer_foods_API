require('express-async-errors');

const database = require('./database/sqlite');

const express = require('express');


const AppError = require('./utils/appError')
const routes = require('./routes')

const app = express();
app.use(express.json());
app.use(routes);

database();

app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "bead request",
      message: error.message
    })
  }

  console.log(error.message)

  return response.status(500).json({
    status: "server error",
    message: "internal server error"

  });
})

const PORT = 3333;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));