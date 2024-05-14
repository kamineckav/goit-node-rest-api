import { User } from "../models/userModels.js";

async function createUser(body) {
  const res = await User.create(body);
  return { email: res.email, subscription: res.subscription };
}

async function findUser(userEmail) {
  return User.find({ email: userEmail });
}

async function findUserById(id) {
  return User.findById(id);
}

async function updateUser(userId, updateData) {
  return User.findByIdAndUpdate(userId, updateData, {
    returnDocument: "after",
  }).select("email subscription -_id");
}

async function updateAvatar(userId, updateData) {
  return User.findByIdAndUpdate(userId, updateData, {
    returnDocument: "after",
  }).select("avatarURL -_id");
}

export { createUser, findUser, updateUser, findUserById, updateAvatar };
