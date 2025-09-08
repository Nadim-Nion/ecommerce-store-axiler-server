import { NextFunction, Request, Response } from 'express';
import status from "http-status";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "API endpoint doesn't exist",
    error: '',
  });
};

export default notFound;