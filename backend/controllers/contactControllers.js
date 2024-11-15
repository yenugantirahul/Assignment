const Contact = require("../models/contactModels");

// Get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new contact
const createContact = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    company,
    phoneNumber,
    jobTitle,
    contactId, // Use contactId here
  } = req.body;

  try {
    // Create and save the contact in the database
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      company,
      phoneNumber,
      jobTitle,
      contactId, // Use contactId as the unique identifier
    });

    // Retrieve all contacts (optional)
    const contacts = await Contact.find();

    // Send response with the list of contacts and a success message
    res.status(201).json({ contacts, message: "Contact created successfully" });
  } catch (error) {
    // Handle errors by sending an appropriate response
    res.status(500).json({ message: error.message });
  }
};

// Edit a contact
const editContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      company,
      phoneNumber,
      jobTitle,
      contactId,
    } = req.body;

    // Update the contact by contactId
    const updateContact = await Contact.findOneAndUpdate(
      { contactId }, // Use contactId as the identifier
      { firstName, lastName, email, company, phoneNumber, jobTitle },
      { new: true } // The `new` option ensures the updated document is returned
    );

    if (!updateContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Fetch all contacts
    const contacts = await Contact.find();

    // Send success response
    res.json({
      contacts,
      message: "Contact edited successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  const { id } = req.params; // Using id from params (contactId)

  try {
    // Delete the contact by contactId
    const deletedContact = await Contact.findOneAndDelete({ contactId: id });

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Fetch all remaining contacts
    const contacts = await Contact.find();

    // Send success response
    res.json({
      contacts,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Get a contact by contactId
const getContactById = async (req, res) => {
  try {
    const { id } = req.params; // Using id from params (contactId)

    // Fetch the contact by contactId
    const contact = await Contact.findOne({ contactId: id });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Send the contact in the response
    res.json(contact);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = {
  createContact,
  getContacts,
  editContact,
  deleteContact,
  getContactById,
};
