import bcrypt from "bcrypt";

export const createHash = async (password) => bcrypt.hash(password, 10);

export const compareHash = async (password, passwordHash) =>
  bcrypt.compare(password, passwordHash);
