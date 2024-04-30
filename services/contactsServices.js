import { Contact } from "../models/contactModel.js";

async function listContacts(filter = {}, settings = {}) {
  return Contact.find(filter, "-createdAt -updatedAt", settings).populate(
    "owner",
    "email subscription"
  );
}

async function countDocuments(filter) {
  return Contact.countDocuments(filter);
}

async function getContactByFilter(filter) {
  return Contact.findOne(filter);
}

async function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}

async function addContact(body) {
  return Contact.create(body);
}

async function updateContactByFilter(filter, body) {
  return Contact.findOneAndUpdate(filter, body, {
    returnDocument: "after",
  });
}

async function updateFavoriteByFilter(filter, status) {
  const contactStatus = { favorite: status };
return Contact.findOneAndUpdate(filter, contactStatus, {
  returnDocument: "after",
});
}

export {
  listContacts,
  getContactByFilter,
  removeContact,
  addContact,
  updateContactByFilter,
  updateFavoriteByFilter,
  countDocuments,
};
