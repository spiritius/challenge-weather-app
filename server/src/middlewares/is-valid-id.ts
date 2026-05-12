import { Request, Response, NextFunction } from "express";
import { badRequestError } from "../errors";

export const isValidId = (req: Request, res: Response, next: NextFunction) => {
  if (Number.isNaN(+req.params.id)) {
    throw badRequestError("BAD_REQUEST", "Invalid Id");
  }
  next();
};
