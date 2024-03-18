import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const response = await listContacts();
  res.json(response);
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const response = await getContactById(id);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.json(response);
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const response = await removeContact(id);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.json(response);
};

export const createContact = async (req, res) => {
  const response = await addContact(req.body);
  res.status(201).json(response);
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const response = await updateContactById(id, req.body);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(response);
};
