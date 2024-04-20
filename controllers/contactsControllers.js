import {
  listContacts,
  getContactByFilter,
  removeContact,
  addContact,
  updateContactByFilter,
  updateFavoriteByFilter,
  countDocuments,
} from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  let filter = { owner };

  if (favorite) {
    filter = { owner, favorite };
  }

  const response = await listContacts(filter, { skip, limit });
  const total = await countDocuments(filter);
  res.json({ response, total });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const response = await getContactByFilter({ _id: id, owner });
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.json(response);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const response = await removeContact({ _id: id, owner });
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.json(response);
};

export const createContact = async (req, res) => {
  const { _id: owner } = req.user;

  const response = await addContact({ ...req.body, owner });
  res.status(201).json(response);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const response = await updateContactByFilter({ _id: id, owner }, req.body);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(response);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const status = req.body.favorite;
  const response = await updateFavoriteByFilter({ _id: id, owner }, status);
  if (!response) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(response);
};
