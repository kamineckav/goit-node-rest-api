import "dotenv/config";
import jwt from "jsonwebtoken";

import { createUser, findUser, updateUser } from "../services/authService.js";
import { createHash, compareHash } from "../helpers/passwordHash.js";

import HttpError from "../helpers/HttpError.js";

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRES_TIME = process.env.EXPIRES_TIME;

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await findUser(email);
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPwd = await createHash(password);
  const response = await createUser({ ...req.body, password: hashPwd });

  res.status(201).json({ user: response });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await findUser(email);

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const isValidPwd = await compareHash(password, user.password);

  if (!isValidPwd) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: EXPIRES_TIME,
  });

  const response = await updateUser(user._id, { token });

  res.json({ token, user: response });
};

export const logout = async (req, res) => {
  const { _id: id } = req.user;

  await updateUser(id, { token: null });

  res.status(204).json();
};

export const current = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({ email, subscription });
};

export const updateSubscription = async (req, res) => {
  const response = await updateUser(req.user._id, req.body);

  res.json(response);
};
