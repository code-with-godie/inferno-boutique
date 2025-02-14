import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
const errorHandler = err => {
  console.log('error handler called');

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map(item => item.message)
      .join(',');
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = ` ${Object.keys(err.keyValue)} is already used!!!`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }
  return NextResponse.json(
    { success: false, message: customError.msg },
    { status: customError.statusCode }
  );
};

export default errorHandler;
