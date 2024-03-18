import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const filePath = "./db/contacts.json";
const contactsPath = path.resolve(filePath);

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactList = JSON.parse(data);
  return contactList;
}

async function getContactById(contactId) {
  const data = await listContacts();
  const foundData = data.find((el) => el.id === contactId);
  return foundData || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const idx = data?.findIndex((el) => el.id === contactId);
  if (idx === -1 || !idx) {
    return null;
  }
  const [deletedContact] = data.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
}

async function updateContactById(contactId, body) {
  const data = await listContacts();
  const idx = data?.findIndex((el) => el.id === contactId);
  if (idx === -1 || !idx) {
    return null;
  }
  data[idx] = { ...data[idx], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[idx];
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
