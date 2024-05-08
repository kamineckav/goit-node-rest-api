import express from "express";
import {
  signup,
  signin,
  logout,
  current,
  updateSubscription,
  avatars,
} from "../controllers/authControllers.js";
import {
  authUserSchema,
  subscriptionUserSchema,
} from "../schemas/usersSchemas.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";

import validateBody from "../midllewares/validateBody.js";
import { validateToken } from "../midllewares/validateToken.js";

import upload from "../midllewares/upload.js";

const authRouter = express.Router();

authRouter.patch(
  "/",
  validateToken,
  validateBody(subscriptionUserSchema),
  ctrlWrapper(updateSubscription)
);

authRouter.post("/register", validateBody(authUserSchema), ctrlWrapper(signup));

authRouter.post("/login", validateBody(authUserSchema), ctrlWrapper(signin));

authRouter.post("/logout", validateToken, ctrlWrapper(logout));

authRouter.get("/current", validateToken, ctrlWrapper(current));

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  validateToken,
  ctrlWrapper(avatars)
);

export default authRouter;
