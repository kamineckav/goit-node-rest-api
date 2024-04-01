import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const addContact = (data) => Contact.create(data);

export const getContactById = async (id) => {
  const data = await Contact.findById(id);
  return data;
};

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const removeContact = (id) => Contact.findByIdAndDelete(id);

export const updateFavoriteById = (id, data) => {
  const status = { favorite: data };
  Contact.findByIdAndUpdate(id, status, { new: true });
};
