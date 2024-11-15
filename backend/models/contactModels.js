const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  contactId: {
    type: Number,
    unique: true, // Ensure this is unique across contacts
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  company: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
});

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
