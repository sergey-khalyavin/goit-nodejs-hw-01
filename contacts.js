const fs = require("fs");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { promises: fsPromise } = fs;

async function listContacts() {
  try {
    const contacts = await fsPromise.readFile(contactsPath);
    const contactsList = JSON.parse(contacts.toString());
    console.table(contactsList);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fsPromise.readFile(contactsPath);
    const contactsList = JSON.parse(contacts.toString());
    const contactWithId = contactsList.filter(({ id }) => id == contactId);
    console.log(contactWithId);
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fsPromise.readFile(contactsPath);
    const contactsList = JSON.parse(contacts.toString());
    const contactWithoutId = contactsList.filter(({ id }) => id !== contactId);
    await fsPromise.writeFile(contactsPath, JSON.stringify(contactWithoutId));
    console.table(contactWithoutId);
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fsPromise.readFile(contactsPath);
    const contactsList = JSON.parse(contacts.toString());
    let id = contactsList.length + 1;
    const newContact = {
      id: id,
      name: name,
      email: email,
      phone: phone,
    };
    contactsList.push(newContact);
    await fsPromise.writeFile(contactsPath, JSON.stringify(contactsList));
    console.table(contactsList);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
