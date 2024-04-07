import mongoose from "mongoose";
import HttpError from "./HttpError.js";

const { isValid } = mongoose.Types.ObjectId;

export const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isValid(id)) {
    next(HttpError(400, `ID ${id} is not valid`));
  }
  next();
};
