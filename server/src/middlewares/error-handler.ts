import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      code: err.code,
      ...err.serializeErrors(),
    });
  }

  res.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Internal server error",
  });
};
