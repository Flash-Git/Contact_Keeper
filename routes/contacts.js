const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const Contact = require("../models/Contact");
const HandleErrors = require("./HandleErrors");

// @route   GET api/contacts
// @desc    Get all user's contacts
// @access  PRIVATE
router.get("/", auth, async (req, res) => {
  try {
    //Get contacts by most recent
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  PRIVATE
router.post(
  "/",
  [
    auth,
    [
      check("name", "Please enter a name")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    HandleErrors(req, res);

    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (e) {
      console.error(e.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  PRIVATE
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  PRIVATE
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
