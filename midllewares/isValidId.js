import mongoose from "mongoose";
import HttpError from "../helpers/HttpError.js";

const { isValid } = mongoose.Types.ObjectId;

export const validateId = (req, _, next) => {
  const { id } = req.params;
  if (!isValid(id)) {
    next(HttpError(400, `ID ${id} is not valid`));
  }
  next();
};
