import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { validateId } from "../helpers/isValidId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", validateId, ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", validateId, ctrlWrapper(deleteContact));

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);

contactsRouter.put(
  "/:id",
  validateId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  validateId,
  validateBody(updateStatusSchema),
  ctrlWrapper(updateStatusContact)
);

export default contactsRouter;
