const express = require("express");
const {
  createContact,
  getContacts,
  editContact,
  deleteContact,
  getContactById,
} = require("../controllers/contactControllers");
const router = express.Router();

router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/create", createContact);
router.put("/edit/:id", editContact);
router.delete("/delete/:id", deleteContact);

module.exports = router;
